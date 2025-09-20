import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ParentDashboard = ({ theme }) => {
    const [students, setStudents] = useState([]);
    const [selectedChild, setSelectedChild] = useState('');
    const [attendance, setAttendance] = useState({});
    const [growthRecords, setGrowthRecords] = useState({});
    const [nutritionRecords, setNutritionRecords] = useState({});

    // Load all data from localStorage
    useEffect(() => {
        const savedStudents = JSON.parse(localStorage.getItem('playschoolStudents')) || [];
        const savedAttendance = JSON.parse(localStorage.getItem('playschoolAttendance')) || {};
        const savedGrowth = JSON.parse(localStorage.getItem('playschoolGrowthRecords')) || {};
        const savedNutrition = JSON.parse(localStorage.getItem('playschoolNutritionRecords')) || {};

        setStudents(savedStudents);
        setAttendance(savedAttendance);
        setGrowthRecords(savedGrowth);
        setNutritionRecords(savedNutrition);

        // Auto-select first child if available
        if (savedStudents.length > 0 && !selectedChild) {
            setSelectedChild(savedStudents[0].id);
        }
    }, [selectedChild]);

    const isUnicornTheme = theme === 'unicorn';
    const bgColor = isUnicornTheme ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100' : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';

    // Get selected child data
    const selectedChildData = students.find(student => student.id === selectedChild);

    // Calculate attendance percentage
    const calculateAttendance = () => {
        if (!selectedChild) return { percentage: 0, present: 0, total: 0 };

        const childRecords = Object.entries(attendance).filter(([date, records]) =>
            records[selectedChild] !== undefined
        );

        const presentDays = childRecords.filter(([date, records]) =>
            records[selectedChild] === true
        ).length;

        const percentage = childRecords.length > 0 ? (presentDays / childRecords.length) * 100 : 0;

        return {
            percentage: Math.round(percentage),
            present: presentDays,
            total: childRecords.length
        };
    };

    const attendanceData = calculateAttendance();

    // Get growth chart data
    const getGrowthChartData = () => {
        if (!selectedChild || !growthRecords[selectedChild]) return null;

        const records = growthRecords[selectedChild];

        const data = {
            labels: records.map(record => new Date(record.date).toLocaleDateString('en-IN')),
            datasets: [
                {
                    label: 'Height (cm)',
                    data: records.map(record => record.height),
                    borderColor: isUnicornTheme ? 'rgb(75, 192, 192)' : 'rgb(129, 230, 217)',
                    backgroundColor: isUnicornTheme ? 'rgba(75, 192, 192, 0.2)' : 'rgba(129, 230, 217, 0.2)',
                    yAxisID: 'y',
                },
                {
                    label: 'Weight (kg)',
                    data: records.map(record => record.weight),
                    borderColor: isUnicornTheme ? 'rgb(255, 99, 132)' : 'rgb(255, 179, 196)',
                    backgroundColor: isUnicornTheme ? 'rgba(255, 99, 132, 0.2)' : 'rgba(255, 179, 196, 0.2)',
                    yAxisID: 'y1',
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Growth Progress',
                    color: isUnicornTheme ? '#4B5563' : '#E5E7EB'
                },
                legend: {
                    labels: {
                        color: isUnicornTheme ? '#4B5563' : '#D1D5DB'
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Height (cm)',
                        color: isUnicornTheme ? '#4B5563' : '#D1D5DB'
                    },
                    ticks: { color: isUnicornTheme ? '#4B5563' : '#9CA3AF' },
                    grid: { color: isUnicornTheme ? 'rgba(209, 213, 219, 0.5)' : 'rgba(107, 114, 128, 0.5)' }
                },
                y1: {
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Weight (kg)',
                        color: isUnicornTheme ? '#4B5563' : '#D1D5DB'
                    },
                    ticks: { color: isUnicornTheme ? '#4B5563' : '#9CA3AF' },
                    grid: {
                        drawOnChartArea: false,
                        color: isUnicornTheme ? 'rgba(209, 213, 219, 0.5)' : 'rgba(107, 114, 128, 0.5)'
                    }
                },
                x: {
                    ticks: { color: isUnicornTheme ? '#4B5563' : '#9CA3AF' },
                    grid: { color: isUnicornTheme ? 'rgba(209, 213, 219, 0.5)' : 'rgba(107, 114, 128, 0.5)' }
                }
            }
        };

        return { data, options };
    };

    // Get recent meals
    const getRecentMeals = () => {
        if (!selectedChild) return [];
        return (nutritionRecords[selectedChild] || [])
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
    };

    const recentMeals = getRecentMeals();
    const growthChartData = getGrowthChartData();

    // Theming for cards and text
    const cardClasses = `p-6 rounded-3xl shadow-lg transition-all duration-500 transform hover:scale-105`;
    const cardBgColor = isUnicornTheme ? 'bg-white/70' : 'bg-gray-800/70 text-white';
    const textColor = isUnicornTheme ? 'text-gray-800' : 'text-gray-200';
    const headingColor = isUnicornTheme ? 'text-purple-800' : 'text-yellow-200';
    const subHeadingColor = isUnicornTheme ? 'text-blue-700' : 'text-purple-300';
    const notificationColor = isUnicornTheme ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-yellow-900 border-yellow-700 text-yellow-200';

    return (
        <div className={`min-h-screen p-4 sm:p-8 transition-all duration-1000 ${bgColor}`}>
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
            <div className="relative z-10 container mx-auto">
                <h1 className={`text-4xl font-extrabold text-center mb-6 drop-shadow-md transition-colors duration-500 ${headingColor}`}>
                    Parent Dashboard
                </h1>

                {/* Child Selection */}
                <div className={`${cardClasses} ${cardBgColor}`}>
                    <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>My Child</h2>
                    <select
                        value={selectedChild}
                        onChange={(e) => setSelectedChild(e.target.value)}
                        className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                    >
                        <option value="" className={isUnicornTheme ? 'text-gray-400' : 'text-gray-400'}>Select your child</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id} className={textColor}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedChildData && (
                    <>
                        {/* Welcome Message */}
                        <div className={`p-6 rounded-3xl shadow-lg mb-6 transition-all duration-500 ${isUnicornTheme ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'bg-gradient-to-r from-blue-800 to-blue-900 text-white'}`}>
                            <h2 className="text-2xl font-bold mb-2">Welcome, Parent!</h2>
                            <p>Viewing progress for <strong>{selectedChildData.name}</strong></p>
                        </div>

                        {/* Attendance Summary */}
                        <div className={`${cardClasses} ${cardBgColor} backdrop-blur-sm`}>
                            <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>📊 Attendance Summary</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className={`text-center p-4 rounded-lg transition-all duration-500 ${isUnicornTheme ? 'bg-blue-50' : 'bg-gray-700'}`}>
                                    <div className={`text-3xl font-bold transition-colors duration-500 ${isUnicornTheme ? 'text-blue-600' : 'text-blue-400'}`}>{attendanceData.percentage}%</div>
                                    <p className="text-sm">Attendance Rate</p>
                                </div>
                                <div className={`text-center p-4 rounded-lg transition-all duration-500 ${isUnicornTheme ? 'bg-green-50' : 'bg-gray-700'}`}>
                                    <div className={`text-3xl font-bold transition-colors duration-500 ${isUnicornTheme ? 'text-green-600' : 'text-green-400'}`}>{attendanceData.present}</div>
                                    <p className="text-sm">Days Present</p>
                                </div>
                                <div className={`text-center p-4 rounded-lg transition-all duration-500 ${isUnicornTheme ? 'bg-gray-50' : 'bg-gray-700'}`}>
                                    <div className={`text-3xl font-bold transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-400'}`}>{attendanceData.total}</div>
                                    <p className="text-sm">Days Recorded</p>
                                </div>
                            </div>
                            <p className={`mt-4 text-sm ${textColor}`}>
                                Regular attendance ensures your child receives continuous education, nutrition, and healthcare.
                            </p>
                        </div>

                        {/* Growth Progress */}
                        {growthChartData && (
                            <div className={`${cardClasses} ${cardBgColor} backdrop-blur-sm`}>
                                <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>📈 Growth Progress</h2>
                                <div className="h-64">
                                    <Line data={growthChartData.data} options={growthChartData.options} />
                                </div>
                            </div>
                        )}

                        {/* Recent Meals */}
                        <div className={`${cardClasses} ${cardBgColor} backdrop-blur-sm`}>
                            <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>🍎 Recent Meals</h2>
                            {recentMeals.length === 0 ? (
                                <p className={textColor}>No meal records available.</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentMeals.map((meal, index) => (
                                        <div key={index} className={`p-3 rounded-lg transition-colors duration-500 ${isUnicornTheme ? 'border border-gray-200 bg-white/50' : 'border border-gray-600 bg-gray-700'}`}>
                                            <h4 className={`font-semibold ${isUnicornTheme ? 'text-green-700' : 'text-green-300'}`}>
                                                {new Date(meal.date).toLocaleDateString('en-IN')}
                                            </h4>
                                            <p className={textColor}><strong>Breakfast:</strong> {meal.mealType === 'Breakfast' ? meal.mealDetails : 'Not specified'}</p>
                                            <p className={textColor}><strong>Lunch:</strong> {meal.mealType === 'Lunch' ? meal.mealDetails : 'Not specified'}</p>
                                            <p className={textColor}><strong>Snacks:</strong> {meal.mealType === 'Snack' ? meal.mealDetails : 'Not specified'}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Important Notice */}
                        <div className={`p-6 rounded-lg shadow-md transition-all duration-500 ${notificationColor}`}>
                            <h2 className="text-xl font-semibold mb-3">📢 Important Notice</h2>
                            <ul className="space-y-2">
                                <li>• Please ensure your child attends regularly for continuous learning</li>
                                <li>• Vaccinations are essential for your child's health and development</li>
                                <li>• Balanced nutrition at the playschool supports your child's growth</li>
                                <li>• Regular health check-ups help detect issues early</li>
                            </ul>
                        </div>
                    </>
                )}

                {/* No child data message */}
                {!selectedChildData && (
                    <div className={`${cardClasses} ${cardBgColor} backdrop-blur-sm text-center`}>
                        <h2 className={`text-xl font-semibold mb-3 ${subHeadingColor}`}>Welcome to Playschool Services!</h2>
                        <p className={textColor}>
                            Your child's data will appear here once they are registered by the playschool admin.
                            Please ensure regular attendance for complete benefits.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParentDashboard;