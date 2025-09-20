import React, { useState, useEffect } from 'react';

const NutritionTracker = () => {
    // Sample student data for testing, will be overwritten by localStorage
    const sampleStudents = [
        { id: '1', name: 'Ramu' },
        { id: '2', name: 'Priya' },
        { id: '3', name: 'Kumar' },
    ];

    const [students, setStudents] = useState(sampleStudents);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [mealRecords, setMealRecords] = useState({});
    const [mealType, setMealType] = useState('Breakfast');
    const [mealDetails, setMealDetails] = useState('');

    // Load students and nutrition data from localStorage
    useEffect(() => {
        const savedStudents = JSON.parse(localStorage.getItem('playschoolStudents')) || [];
        const savedMeals = JSON.parse(localStorage.getItem('playschoolNutritionRecords')) || {};

        // If there are saved students, use them. Otherwise, use the sample data.
        if (savedStudents.length > 0) {
            setStudents(savedStudents);
        }

        setMealRecords(savedMeals);
    }, []);

    // Save meal records to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('playschoolNutritionRecords', JSON.stringify(mealRecords));
    }, [mealRecords]);

    // Record a meal for the selected student
    const recordMeal = (e) => {
        e.preventDefault();
        if (!selectedStudent || !mealDetails) return;

        const record = {
            mealType,
            mealDetails,
            date: new Date().toISOString().split('T')[0],
        };

        setMealRecords(prev => {
            const newRecords = { ...prev };
            if (!newRecords[selectedStudent]) {
                newRecords[selectedStudent] = [];
            }
            newRecords[selectedStudent].push(record);
            return newRecords;
        });

        // Reset form fields
        setMealDetails('');
    };

    // Helper function to get the student name from their ID
    const getStudentName = (studentId) => {
        const student = students.find(s => s.id === studentId);
        return student ? student.name : 'Unknown Student';
    };

    const studentRecords = selectedStudent ? mealRecords[selectedStudent] || [] : [];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Nutrition Tracker</h1>

            {/* Student Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-700">Select Child</h2>
                <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="">Choose a child</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedStudent && (
                <>
                    {/* Log New Meal Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4 text-blue-700">Log a New Meal for {getStudentName(selectedStudent)}</h2>
                        <form onSubmit={recordMeal} className="space-y-4">
                            <div>
                                <label htmlFor="mealType" className="block text-gray-700 font-medium mb-1">Meal Type</label>
                                <select
                                    id="mealType"
                                    value={mealType}
                                    onChange={(e) => setMealType(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Snack</option>
                                    <option>Dinner</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="mealDetails" className="block text-gray-700 font-medium mb-1">Meal Details</label>
                                <textarea
                                    id="mealDetails"
                                    value={mealDetails}
                                    onChange={(e) => setMealDetails(e.target.value)}
                                    placeholder="e.g., Apple slices, milk, and a cheese sandwich."
                                    rows="3"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                                Record Meal
                            </button>
                        </form>
                    </div>
                </>
            )}

            {/* Meal History */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-blue-700">Meal History for {getStudentName(selectedStudent)}</h2>
                {studentRecords.length === 0 ? (
                    <p className="text-gray-600">No meal records found for this child.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-blue-100 text-blue-800">
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Meal Type</th>
                                    <th className="px-4 py-2 text-left">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentRecords.map((record, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-4 py-2">{new Date(record.date).toLocaleDateString('en-IN')}</td>
                                        <td className="px-4 py-2">{record.mealType}</td>
                                        <td className="px-4 py-2">{record.mealDetails}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NutritionTracker;