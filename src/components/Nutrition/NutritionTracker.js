import React, { useState, useEffect } from 'react';

const NutritionTracker = ({ theme }) => {
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

    const isUnicornTheme = theme === 'unicorn';
    const bgColor = isUnicornTheme ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100' : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';

    const cardClasses = `p-6 rounded-3xl shadow-lg transition-all duration-500 transform hover:scale-105`;
    const cardBgColor = isUnicornTheme ? 'bg-white/50 backdrop-blur-sm' : 'bg-gray-800/50 backdrop-blur-sm text-white';
    const textColor = isUnicornTheme ? 'text-gray-700' : 'text-gray-300';
    const headerColor = isUnicornTheme ? 'text-purple-800' : 'text-yellow-200';
    const subHeadingColor = isUnicornTheme ? 'text-blue-700' : 'text-purple-300';
    const buttonBaseClasses = `px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105`;

    // Load students and nutrition data from localStorage
    useEffect(() => {
        const savedStudents = JSON.parse(localStorage.getItem('playschoolStudents')) || [];
        const savedMeals = JSON.parse(localStorage.getItem('playschoolNutritionRecords')) || {};

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
        <div className={`min-h-screen p-8 transition-all duration-1000 ${bgColor}`}>
            {/* Themed background blobs for both light and dark modes */}
            {isUnicornTheme ? (
                <>
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-0"></div>
                    <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 z-0"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 z-0"></div>
                </>
            ) : (
                <>
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob z-0"></div>
                    <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob animation-delay-2000 z-0"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob animation-delay-4000 z-0"></div>
                </>
            )}

            <div className="relative z-10 container mx-auto px-4 py-8">
                <h1 className={`text-4xl font-extrabold text-center mb-6 drop-shadow-md transition-colors duration-500 ${headerColor}`}>
                    🍎 Nutrition Tracker
                </h1>

                {/* Student Selection */}
                <div className={`${cardClasses} ${cardBgColor}`}>
                    <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>Select Child</h2>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                    >
                        <option value="" className={isUnicornTheme ? 'text-gray-400' : 'text-gray-400'}>Choose a child</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id} className={textColor}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedStudent && (
                    <>
                        {/* Log New Meal Form */}
                        <div className={`${cardClasses} ${cardBgColor} mt-6`}>
                            <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>Log a New Meal for {getStudentName(selectedStudent)}</h2>
                            <form onSubmit={recordMeal} className="space-y-4">
                                <div>
                                    <label htmlFor="mealType" className={`block font-medium mb-1 ${textColor}`}>Meal Type</label>
                                    <select
                                        id="mealType"
                                        value={mealType}
                                        onChange={(e) => setMealType(e.target.value)}
                                        className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                    >
                                        <option className={textColor}>Breakfast</option>
                                        <option className={textColor}>Lunch</option>
                                        <option className={textColor}>Snack</option>
                                        <option className={textColor}>Dinner</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="mealDetails" className={`block font-medium mb-1 ${textColor}`}>Meal Details</label>
                                    <textarea
                                        id="mealDetails"
                                        value={mealDetails}
                                        onChange={(e) => setMealDetails(e.target.value)}
                                        placeholder="e.g., Apple slices, milk, and a cheese sandwich."
                                        rows="3"
                                        className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                        required
                                    />
                                </div>
                                <button type="submit" className={`w-full ${buttonBaseClasses} bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 shadow-lg`}>
                                    Record Meal
                                </button>
                            </form>
                        </div>
                    </>
                )}

                {/* Meal History */}
                <div className={`${cardClasses} ${cardBgColor} mt-6`}>
                    <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>Meal History for {getStudentName(selectedStudent)}</h2>
                    {studentRecords.length === 0 ? (
                        <p className={textColor}>No meal records found for this child.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className={`border-b-2 transition-colors duration-500 ${isUnicornTheme ? 'border-gray-200' : 'border-gray-700'}`}>
                                        <th className={`px-4 py-2 text-left font-bold ${subHeadingColor}`}>Date</th>
                                        <th className={`px-4 py-2 text-left font-bold ${subHeadingColor}`}>Meal Type</th>
                                        <th className={`px-4 py-2 text-left font-bold ${subHeadingColor}`}>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentRecords.map((record, index) => (
                                        <tr key={index} className={`border-b transition-colors duration-500 ${isUnicornTheme ? 'border-gray-100 hover:bg-gray-50' : 'border-gray-800 hover:bg-gray-700'}`}>
                                            <td className={`px-4 py-2 ${textColor}`}>{new Date(record.date).toLocaleDateString('en-IN')}</td>
                                            <td className={`px-4 py-2 ${textColor}`}>{record.mealType}</td>
                                            <td className={`px-4 py-2 ${textColor}`}>{record.mealDetails}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NutritionTracker;