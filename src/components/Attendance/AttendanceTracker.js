import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

// Component for a custom, state-driven alert message
const AlertMessage = ({ message, type = 'error', onClose, isUnicornTheme }) => {
    if (!message) return null;

    const colors = isUnicornTheme ? {
        error: 'bg-red-100 border-red-400 text-red-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
    } : {
        error: 'bg-red-900 border-red-600 text-red-300',
        info: 'bg-blue-900 border-blue-600 text-blue-300',
    };

    return (
        <div className={`mt-4 p-4 rounded-lg border-l-4 ${colors[type]} transition-all duration-300 transform scale-100 animate-slide-in`}>
            <div className="flex justify-between items-center">
                <p className="text-sm font-medium">{message}</p>
                <button onClick={onClose} className="text-xl leading-none font-bold ml-4">
                    &times;
                </button>
            </div>
        </div>
    );
};

const AttendanceTracker = ({ theme }) => {
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceRecords, setAttendanceRecords] = useState({});
    const [newStudent, setNewStudent] = useState({ name: '', age: '', gender: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const isUnicornTheme = theme === 'unicorn';
    const bgColor = isUnicornTheme
        ? 'bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-purple-800'
        : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';

    const cardClasses = `p-6 rounded-3xl shadow-xl transition-all duration-500 border-4 border-white border-opacity-60`;
    const cardBgColor = isUnicornTheme ? 'bg-white bg-opacity-30' : 'bg-gray-800 bg-opacity-50 text-white';
    const headerColor = isUnicornTheme ? 'text-purple-800' : 'text-yellow-200';
    const buttonBaseClasses = `px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105`;

    const floatingEmojis = isUnicornTheme
        ? ['🦄', '🌈', '🌟', '☁️', '🎈', '🍭', '🎀', '💖', '✨', '🌸']
        : ['🌙', '✨', '🪐', '💫', '🚀', '⭐', '☄️', '🔮', '👽', '🌌'];

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
        setAlertMessage('');
        if (!newStudent.name.trim()) {
            setAlertMessage('Student name is required.');
            return;
        }

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
        setAlertMessage('Student added successfully!');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    };

    // Remove student
    const removeStudent = (studentId) => {
        if (window.confirm('Are you sure you want to remove this student? This action cannot be undone.')) {
            setStudents(students.filter(student => student.id !== studentId));
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
        <div className={`font-sans min-h-screen overflow-hidden relative transition-all duration-1000 ${bgColor}`}>
            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

            {/* Animated Background Emojis */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 40 }).map((_, index) => (
                    <div
                        key={index}
                        className={`absolute text-4xl opacity-70 animate-float-spin`}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${Math.random() * 5 + 5}s`
                        }}
                    >
                        {floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)]}
                    </div>
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                <h1 className={`text-4xl font-extrabold text-center mb-6 drop-shadow-md transition-colors duration-500 ${headerColor}`}>
                    📅 Magical Attendance Tracker
                </h1>

                {/* Date Selection & Add Student Button */}
                <div className={`${cardClasses} ${cardBgColor} mb-6`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                            <label className={`block text-sm font-medium mb-2 ${isUnicornTheme ? 'text-purple-700' : 'text-blue-300'}`}>
                                Select Date:
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                            />
                        </div>
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className={`${buttonBaseClasses} ${isUnicornTheme ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'}`}
                        >
                            {showAddForm ? 'Hide Form' : '+ Add Little Star'}
                        </button>
                    </div>
                </div>

                {/* Add Student Form */}
                {showAddForm && (
                    <div className={`${cardClasses} ${cardBgColor} mt-6`} style={{ animation: 'pop-in 0.5s ease-out' }}>
                        <h2 className={`text-xl font-semibold mb-4 ${headerColor}`}>Enroll a New Friend ✨</h2>
                        <form onSubmit={addStudent} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${isUnicornTheme ? 'text-purple-700' : 'text-blue-300'}`}>Name *</label>
                                <input
                                    type="text"
                                    value={newStudent.name}
                                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                    className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                    placeholder="Child's full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${isUnicornTheme ? 'text-purple-700' : 'text-blue-300'}`}>Age</label>
                                <input
                                    type="number"
                                    value={newStudent.age}
                                    onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                                    className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                    placeholder="Age in years"
                                    min="0"
                                    max="6"
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${isUnicornTheme ? 'text-purple-700' : 'text-blue-300'}`}>Gender</label>
                                <select
                                    value={newStudent.gender}
                                    onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                                    className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                >
                                    <option value="" className={isUnicornTheme ? 'text-gray-400' : 'text-gray-400'}>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="md:col-span-3 text-center md:text-left">
                                <button
                                    type="submit"
                                    className={`${buttonBaseClasses} bg-gradient-to-r from-pink-400 to-purple-400 text-white`}
                                >
                                    Add Student
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Attendance Stats */}
                <div className={`${cardClasses} ${cardBgColor} mt-6`}>
                    <h2 className={`text-xl font-semibold mb-4 ${headerColor}`}>Daily Sparkle Count - {selectedDate}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className={`p-4 rounded-lg shadow-inner transition-all duration-500 ${isUnicornTheme ? 'bg-green-100' : 'bg-green-900'}`}>
                            <div className={`text-2xl font-bold transition-colors duration-500 ${isUnicornTheme ? 'text-green-800' : 'text-green-300'}`}>{stats.present}</div>
                            <div className={`text-sm transition-colors duration-500 ${isUnicornTheme ? 'text-green-600' : 'text-green-400'}`}>Present</div>
                        </div>
                        <div className={`p-4 rounded-lg shadow-inner transition-all duration-500 ${isUnicornTheme ? 'bg-red-100' : 'bg-red-900'}`}>
                            <div className={`text-2xl font-bold transition-colors duration-500 ${isUnicornTheme ? 'text-red-800' : 'text-red-300'}`}>{stats.absent}</div>
                            <div className={`text-sm transition-colors duration-500 ${isUnicornTheme ? 'text-red-600' : 'text-red-400'}`}>Absent</div>
                        </div>
                        <div className={`p-4 rounded-lg shadow-inner transition-all duration-500 ${isUnicornTheme ? 'bg-blue-100' : 'bg-blue-900'}`}>
                            <div className={`text-2xl font-bold transition-colors duration-500 ${isUnicornTheme ? 'text-blue-800' : 'text-blue-300'}`}>{stats.total}</div>
                            <div className={`text-sm transition-colors duration-500 ${isUnicornTheme ? 'text-blue-600' : 'text-blue-400'}`}>Total Friends</div>
                        </div>
                        <div className={`p-4 rounded-lg shadow-inner transition-all duration-500 ${isUnicornTheme ? 'bg-purple-100' : 'bg-purple-900'}`}>
                            <div className={`text-2xl font-bold transition-colors duration-500 ${isUnicornTheme ? 'text-purple-800' : 'text-purple-300'}`}>{stats.percentage}%</div>
                            <div className={`text-sm transition-colors duration-500 ${isUnicornTheme ? 'text-purple-600' : 'text-purple-400'}`}>Sparkle Rate</div>
                        </div>
                    </div>
                </div>

                {/* Student Attendance List */}
                <div className={`${cardClasses} ${cardBgColor} mt-6`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={`text-xl font-semibold ${headerColor}`}>Mark Today's Magic</h2>
                        <span className={`text-sm transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-400'}`}>{students.length} little stars</span>
                    </div>

                    {students.length === 0 ? (
                        <div className={`text-center py-8 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-500' : 'text-gray-400'}`}>
                            <div className="text-4xl mb-2">👶</div>
                            <p>No students enrolled in the kingdom yet.</p>
                            <p className="text-sm">Click "Add Little Star" to begin the adventure!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {students.map(student => {
                                const status = getAttendanceStatus(student.id);
                                const monthlyStats = monthlyReport[student.id] || { present: 0, total: 0 };
                                const monthlyPercentage = monthlyStats.total > 0 ? Math.round((monthlyStats.present / monthlyStats.total) * 100) : 0;

                                const studentCardClasses = `flex items-center justify-between p-4 rounded-lg border transition-all duration-300 transform hover:scale-[1.02] ${isUnicornTheme ? 'border-purple-300 hover:bg-pink-100' : 'border-purple-800 hover:bg-purple-900'}`;
                                const textMainColor = isUnicornTheme ? 'text-purple-900' : 'text-gray-100';
                                const textSubColor = isUnicornTheme ? 'text-purple-600' : 'text-gray-400';

                                return (
                                    <div key={student.id} className={studentCardClasses}>
                                        <div className="flex-1">
                                            <div className={`font-medium text-lg ${textMainColor}`}>{student.name}</div>
                                            <div className={`text-sm ${textSubColor}`}>
                                                {student.age && `${student.age} years • `}{student.gender}
                                                {monthlyStats.total > 0 && ` • Monthly: ${monthlyPercentage}%`}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => markAttendance(student.id, 'present')}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium ${status === 'present'
                                                        ? isUnicornTheme ? 'bg-green-600 text-white shadow-md' : 'bg-green-700 text-white shadow-md'
                                                        : isUnicornTheme ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-green-900 text-green-300 hover:bg-green-800'
                                                        }`}
                                                >
                                                    ✅ Present
                                                </button>
                                                <button
                                                    onClick={() => markAttendance(student.id, 'absent')}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium ${status === 'absent'
                                                        ? isUnicornTheme ? 'bg-red-600 text-white shadow-md' : 'bg-red-700 text-white shadow-md'
                                                        : isUnicornTheme ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-red-900 text-red-800 hover:bg-red-800'
                                                        }`}
                                                >
                                                    ❌ Absent
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeStudent(student.id)}
                                                className={`p-2 transition-colors duration-300 ${isUnicornTheme ? 'text-red-600 hover:bg-red-100' : 'text-red-400 hover:bg-red-900'} rounded-full`}
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
                <div className={`${cardClasses} ${isUnicornTheme ? 'bg-blue-50 border border-blue-200' : 'bg-blue-900 border border-blue-800'} mt-6`}>
                    <h3 className={`font-semibold mb-3 ${isUnicornTheme ? 'text-blue-800' : 'text-blue-300'}`}>💡 Magical Shortcuts</h3>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => {
                                students.forEach(student => markAttendance(student.id, 'present'));
                            }}
                            className={`${buttonBaseClasses} text-sm ${isUnicornTheme ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-700 hover:bg-green-800 text-white'}`}
                        >
                            Mark All Present
                        </button>
                        <button
                            onClick={() => {
                                students.forEach(student => markAttendance(student.id, 'absent'));
                            }}
                            className={`${buttonBaseClasses} text-sm ${isUnicornTheme ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-700 hover:bg-red-800 text-white'}`}
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
                            className={`${buttonBaseClasses} text-sm ${isUnicornTheme ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-700 hover:bg-gray-800 text-white'}`}
                        >
                            Clear Today's Attendance
                        </button>
                    </div>
                </div>

                <AlertMessage message={alertMessage} onClose={() => setAlertMessage('')} isUnicornTheme={isUnicornTheme} />
            </div>

            {/* Add custom animation styles */}
            <style>
                {`
                @keyframes float-spin {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(360deg); }
                    100% { transform: translateY(0px) rotate(720deg); }
                }
                .animate-float-spin {
                    animation: float-spin var(--animation-duration, 8s) ease-in-out infinite;
                }
                @keyframes pop-in {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                `}
            </style>
        </div>
    );
};

export default AttendanceTracker;
