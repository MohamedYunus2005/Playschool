import React, { useState, useEffect } from 'react';

const AttendanceTracker = () => {
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceRecords, setAttendanceRecords] = useState({});
    const [newStudent, setNewStudent] = useState({ name: '', age: '', gender: '' });
    const [showAddForm, setShowAddForm] = useState(false);

    // Load data from localStorage
    useEffect(() => {
        const savedStudents = JSON.parse(localStorage.getItem('anganwadiStudents')) || [];
        const savedAttendance = JSON.parse(localStorage.getItem('anganwadiAttendance')) || {};
        setStudents(savedStudents);
        setAttendanceRecords(savedAttendance);
    }, []);

    // Save data to localStorage
    useEffect(() => {
        localStorage.setItem('anganwadiStudents', JSON.stringify(students));
    }, [students]);

    useEffect(() => {
        localStorage.setItem('anganwadiAttendance', JSON.stringify(attendanceRecords));
    }, [attendanceRecords]);

    // Add new student
    const addStudent = (e) => {
        e.preventDefault();
        if (!newStudent.name.trim()) return;

        const student = {
            id: Date.now(),
            name: newStudent.name,
            age: newStudent.age,
            gender: newStudent.gender,
            joinDate: new Date().toISOString().split('T')[0]
        };

        setStudents([...students, student]);
        setNewStudent({ name: '', age: '', gender: '' });
        setShowAddForm(false);
    };

    // Remove student
    const removeStudent = (studentId) => {
        if (window.confirm('Are you sure you want to remove this student?')) {
            setStudents(students.filter(student => student.id !== studentId));

            // Also remove attendance records for this student
            const updatedRecords = { ...attendanceRecords };
            Object.keys(updatedRecords).forEach(date => {
                if (updatedRecords[date][studentId]) {
                    delete updatedRecords[date][studentId];
                }
            });
            setAttendanceRecords(updatedRecords);
        }
    };

    // Mark attendance
    const markAttendance = (studentId, status) => {
        const dateKey = selectedDate;
        setAttendanceRecords(prev => ({
            ...prev,
            [dateKey]: {
                ...prev[dateKey],
                [studentId]: status
            }
        }));
    };

    // Get attendance status for a student on selected date
    const getAttendanceStatus = (studentId) => {
        return attendanceRecords[selectedDate]?.[studentId] || 'absent';
    };

    // Calculate daily attendance stats
    const getDailyStats = () => {
        const dailyRecords = attendanceRecords[selectedDate] || {};
        const presentCount = Object.values(dailyRecords).filter(status => status === 'present').length;
        const totalCount = students.length;

        return {
            present: presentCount,
            absent: totalCount - presentCount,
            total: totalCount,
            percentage: totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0
        };
    };

    // Get monthly attendance report
    const getMonthlyReport = () => {
        const currentMonth = selectedDate.substring(0, 7); // YYYY-MM
        const monthRecords = Object.entries(attendanceRecords)
            .filter(([date]) => date.startsWith(currentMonth))
            .reduce((acc, [date, records]) => {
                Object.entries(records).forEach(([studentId, status]) => {
                    if (!acc[studentId]) {
                        acc[studentId] = { present: 0, total: 0 };
                    }
                    acc[studentId].total++;
                    if (status === 'present') {
                        acc[studentId].present++;
                    }
                });
                return acc;
            }, {});

        return monthRecords;
    };

    const stats = getDailyStats();
    const monthlyReport = getMonthlyReport();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6">📅 Attendance Tracker</h1>

            {/* Date Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Date:
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                    >
                        {showAddForm ? 'Cancel' : '+ Add Student'}
                    </button>
                </div>
            </div>

            {/* Add Student Form */}
            {showAddForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
                    <form onSubmit={addStudent} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                            <input
                                type="text"
                                value={newStudent.name}
                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Child's name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <input
                                type="number"
                                value={newStudent.age}
                                onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Age in years"
                                min="0"
                                max="6"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                value={newStudent.gender}
                                onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="md:col-span-3">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                            >
                                Add Student
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Attendance Stats */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Daily Attendance - {selectedDate}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-green-100 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-800">{stats.present}</div>
                        <div className="text-sm text-green-600">Present</div>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-red-800">{stats.absent}</div>
                        <div className="text-sm text-red-600">Absent</div>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-800">{stats.total}</div>
                        <div className="text-sm text-blue-600">Total Students</div>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-800">{stats.percentage}%</div>
                        <div className="text-sm text-purple-600">Attendance Rate</div>
                    </div>
                </div>
            </div>

            {/* Student Attendance List */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Mark Attendance</h2>
                    <span className="text-sm text-gray-600">{students.length} students</span>
                </div>

                {students.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">👶</div>
                        <p>No students added yet.</p>
                        <p className="text-sm">Click "Add Student" to get started.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {students.map(student => {
                            const status = getAttendanceStatus(student.id);
                            const monthlyStats = monthlyReport[student.id] || { present: 0, total: 0 };
                            const monthlyPercentage = monthlyStats.total > 0
                                ? Math.round((monthlyStats.present / monthlyStats.total) * 100)
                                : 0;

                            return (
                                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                    <div className="flex-1">
                                        <div className="font-medium">{student.name}</div>
                                        <div className="text-sm text-gray-600">
                                            {student.age && `${student.age} years • `}{student.gender}
                                            {monthlyStats.total > 0 && ` • Monthly: ${monthlyPercentage}%`}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => markAttendance(student.id, 'present')}
                                                className={`px-4 py-2 rounded-md text-sm font-medium ${status === 'present'
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    }`}
                                            >
                                                ✅ Present
                                            </button>
                                            <button
                                                onClick={() => markAttendance(student.id, 'absent')}
                                                className={`px-4 py-2 rounded-md text-sm font-medium ${status === 'absent'
                                                        ? 'bg-red-600 text-white'
                                                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                    }`}
                                            >
                                                ❌ Absent
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeStudent(student.id)}
                                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md"
                                            title="Remove student"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3">💡 Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => {
                            students.forEach(student => markAttendance(student.id, 'present'));
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Mark All Present
                    </button>
                    <button
                        onClick={() => {
                            students.forEach(student => markAttendance(student.id, 'absent'));
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Mark All Absent
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Clear all attendance for today?')) {
                                const updatedRecords = { ...attendanceRecords };
                                delete updatedRecords[selectedDate];
                                setAttendanceRecords(updatedRecords);
                            }
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Clear Today's Attendance
                    </button>
                </div>
            </div>

            {/* Attendance Tips */}
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">📋 Attendance Best Practices</h4>
                <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
                    <li>Mark attendance at the start of each day</li>
                    <li>Follow up with parents of frequently absent children</li>
                    <li>Regular attendance is crucial for nutrition and learning</li>
                    <li>Use the monthly reports to identify patterns</li>
                </ul>
            </div>
        </div>
    );
};

export default AttendanceTracker;