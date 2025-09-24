import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Added for navigation, though not directly used in this component

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
    const bgColor = isUnicornTheme
        ? 'bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200'
        : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';
    
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
    
    // Updated card styles to match the Landing page
    const cardBaseClasses = `p-6 rounded-3xl shadow-xl border-4 border-white border-opacity-60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 relative z-10`;
    const cardBgColor = isUnicornTheme ? 'bg-white bg-opacity-30' : 'bg-gray-800 bg-opacity-50';
    const headerColor = isUnicornTheme ? 'text-purple-800 animate-text-gradient-unicorn' : 'text-yellow-200 animate-text-gradient-dark';
    const subHeadingColor = isUnicornTheme ? 'text-purple-700' : 'text-blue-300';
    const textColor = isUnicornTheme ? 'text-gray-800' : 'text-gray-200';
    const buttonBaseClasses = `px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-110 shadow-lg`;

    return (
        <div className={`font-sans overflow-hidden min-h-screen p-8 relative transition-all duration-1000 ${bgColor}`}>
            {/* Animated Background Emojis - Copied from Landing page */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Unicorn Emojis */}
                {isUnicornTheme && Array.from({ length: 40 }).map((_, index) => (
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
                        {['🦄', '🌈', '🌟', '☁️', '🎈', '🍭', '🎀', '💖', '✨', '🌸'][Math.floor(Math.random() * 10)]}
                    </div>
                ))}
                {/* Dark Theme Emojis */}
                {!isUnicornTheme && Array.from({ length: 40 }).map((_, index) => (
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
                        {['🌙', '✨', '🪐', '💫', '🚀', '⭐', '☄️', '🔮', '👽', '🌌'][Math.floor(Math.random() * 10)]}
                    </div>
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                <h1 className={`text-6xl font-extrabold text-center mb-10 md:text-7xl lg:text-8xl drop-shadow-lg transition-colors duration-1000 ${headerColor}`}>
                    🍎 Magical Nutrition Tracker
                </h1>

                {/* Student Selection */}
                <div className={`${cardBaseClasses} ${cardBgColor} mb-8`}>
                    <h2 className={`text-2xl font-semibold mb-4 ${subHeadingColor}`}>Select Child</h2>
                    <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border-2 border-pink-300 text-gray-700 focus:ring-purple-400' : 'bg-gray-700 border-2 border-purple-500 text-white focus:ring-blue-400'}`}
                    >
                        <option value="" className={textColor}>Choose a child</option>
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
                        <div className={`${cardBaseClasses} ${cardBgColor} mt-8`}>
                            <h2 className={`text-2xl font-semibold mb-4 ${subHeadingColor}`}>Log a New Meal for {getStudentName(selectedStudent)}</h2>
                            <form onSubmit={recordMeal} className="space-y-6">
                                <div>
                                    <label htmlFor="mealType" className={`block font-medium mb-1 ${textColor}`}>Meal Type</label>
                                    <select
                                        id="mealType"
                                        value={mealType}
                                        onChange={(e) => setMealType(e.target.value)}
                                        className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border-2 border-pink-300 text-gray-700 focus:ring-purple-400' : 'bg-gray-700 border-2 border-purple-500 text-white focus:ring-blue-400'}`}
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
                                        className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border-2 border-pink-300 text-gray-700 focus:ring-purple-400' : 'bg-gray-700 border-2 border-purple-500 text-white focus:ring-blue-400'}`}
                                        required
                                    />
                                </div>
                                <button type="submit" className={`w-full ${buttonBaseClasses} ${isUnicornTheme ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'}`}>
                                    Record Meal
                                </button>
                            </form>
                        </div>
                    </>
                )}

                {/* Meal History */}
                <div className={`${cardBaseClasses} ${cardBgColor} mt-8`}>
                    <h2 className={`text-2xl font-semibold mb-4 ${subHeadingColor}`}>Meal History for {getStudentName(selectedStudent)}</h2>
                    {studentRecords.length === 0 ? (
                        <p className={textColor}>No meal records found for this child.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className={`border-b-2 transition-colors duration-500 ${isUnicornTheme ? 'border-gray-300' : 'border-gray-700'}`}>
                                        <th className={`px-4 py-2 text-left font-bold ${subHeadingColor}`}>Date</th>
                                        <th className={`px-4 py-2 text-left font-bold ${subHeadingColor}`}>Meal Type</th>
                                        <th className={`px-4 py-2 text-left font-bold ${subHeadingColor}`}>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentRecords.map((record, index) => (
                                        <tr key={index} className={`border-b transition-colors duration-500 ${isUnicornTheme ? 'border-gray-100' : 'border-gray-800'}`}>
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
            {/* Added custom animation styles from the Landing page */}
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
                @keyframes text-gradient-unicorn {
                    0% { color: #f472b6; }
                    50% { color: #8b5cf6; }
                    100% { color: #3b82f6; }
                }
                @keyframes text-gradient-dark {
                    0% { color: #fde047; }
                    50% { color: #a78bfa; }
                    100% { color: #60a5fa; }
                }
                .animate-text-gradient-unicorn {
                    animation: text-gradient-unicorn 4s ease-in-out infinite alternate;
                }
                .animate-text-gradient-dark {
                    animation: text-gradient-dark 4s ease-in-out infinite alternate;
                }
                `}
            </style>
        </div>
    );
};

export default NutritionTracker;
