import React, { useState, useEffect } from 'react';
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
import { Line } from 'react-chartjs-2';

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

const GrowthTracker = ({ theme }) => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [growthRecords, setGrowthRecords] = useState({});
    const [newRecord, setNewRecord] = useState({
        date: new Date().toISOString().split('T')[0],
        height: '',
        weight: ''
    });

    const isUnicornTheme = theme === 'unicorn';
    const bgColor = isUnicornTheme
        ? 'bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200'
        : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';

    const cardClasses = `p-8 rounded-[40px] shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border-4 border-white border-opacity-60 backdrop-blur-sm`;
    const cardBgColor = isUnicornTheme
        ? 'bg-white/30'
        : 'bg-gray-800/50 text-white';
    const headerColor = isUnicornTheme ? 'text-purple-800' : 'text-yellow-200';
    const subHeadingColor = isUnicornTheme ? 'text-pink-600' : 'text-blue-300';
    const inputClasses = `w-full p-4 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-4`;

    const floatingEmojis = isUnicornTheme
        ? ['🦄', '🌈', '🌟', '☁️', '🎈', '🍭', '🎀', '💖', '✨', '🌸']
        : ['🌙', '✨', '🪐', '💫', '🚀', '⭐', '☄️', '🔮', '👽', '🌌'];

    // Load data from localStorage
    useEffect(() => {
        const savedStudents = JSON.parse(localStorage.getItem('anganwadiStudents')) || [];
        const savedGrowth = JSON.parse(localStorage.getItem('anganwadiGrowth')) || {};
        setStudents(savedStudents);
        setGrowthRecords(savedGrowth);
    }, []);

    // Save growth records to localStorage
    useEffect(() => {
        localStorage.setItem('anganwadiGrowth', JSON.stringify(growthRecords));
    }, [growthRecords]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit new growth record
    const handleSubmitRecord = (e) => {
        e.preventDefault();
        if (!selectedStudent || !newRecord.height || !newRecord.weight) return;

        const studentId = selectedStudent;
        const record = {
            date: newRecord.date,
            height: parseFloat(newRecord.height),
            weight: parseFloat(newRecord.weight)
        };

        setGrowthRecords(prev => {
            const newRecords = { ...prev };
            if (!newRecords[studentId]) {
                newRecords[studentId] = [];
            }
            newRecords[studentId].push(record);
            // Sort records by date
            newRecords[studentId].sort((a, b) => new Date(a.date) - new Date(b.date));
            return newRecords;
        });

        // Reset form
        setNewRecord({
            date: new Date().toISOString().split('T')[0],
            height: '',
            weight: ''
        });
    };

    // Get growth data for selected student for chart
    const getChartData = () => {
        if (!selectedStudent || !growthRecords[selectedStudent]) return null;

        const records = growthRecords[selectedStudent];
        const student = students.find(s => s.id === parseInt(selectedStudent));

        const data = {
            labels: records.map(record => new Date(record.date).toLocaleDateString('en-IN')),
            datasets: [
                {
                    label: 'Height (cm)',
                    data: records.map(record => record.height),
                    borderColor: isUnicornTheme ? '#f472b6' : '#a855f7',
                    backgroundColor: isUnicornTheme ? 'rgba(244, 114, 182, 0.4)' : 'rgba(168, 85, 247, 0.4)',
                    tension: 0.4,
                    yAxisID: 'y',
                },
                {
                    label: 'Weight (kg)',
                    data: records.map(record => record.weight),
                    borderColor: isUnicornTheme ? '#8b5cf6' : '#ec4899',
                    backgroundColor: isUnicornTheme ? 'rgba(139, 92, 246, 0.4)' : 'rgba(236, 72, 153, 0.4)',
                    tension: 0.4,
                    yAxisID: 'y1',
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Height (cm)',
                        color: isUnicornTheme ? '#3b0764' : '#d1d5db'
                    },
                    ticks: { color: isUnicornTheme ? '#3b0764' : '#9ca3af' },
                    grid: { color: isUnicornTheme ? 'rgba(209, 213, 219, 0.5)' : 'rgba(55, 65, 81, 0.5)' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Weight (kg)',
                        color: isUnicornTheme ? '#3b0764' : '#d1d5db'
                    },
                    ticks: { color: isUnicornTheme ? '#3b0764' : '#9ca3af' },
                    grid: {
                        drawOnChartArea: false,
                        color: isUnicornTheme ? 'rgba(209, 213, 219, 0.5)' : 'rgba(55, 65, 81, 0.5)'
                    }
                },
                x: {
                    ticks: { color: isUnicornTheme ? '#3b0764' : '#9ca3af' },
                    grid: { color: isUnicornTheme ? 'rgba(209, 213, 219, 0.5)' : 'rgba(55, 65, 81, 0.5)' }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Growth Chart for ${student?.name || 'Selected Child'}`,
                    color: isUnicornTheme ? '#3b0764' : '#e5e7eb',
                    font: { size: 18, weight: 'bold' }
                },
                legend: {
                    labels: {
                        color: isUnicornTheme ? '#3b0764' : '#d1d5db'
                    }
                }
            }
        };

        return { data, options };
    };

    const chartData = getChartData();

    return (
        <div className={`font-sans overflow-hidden transition-all duration-1000 ${bgColor} min-h-screen relative`}>
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
                <h1 className={`text-5xl font-extrabold text-center mb-10 drop-shadow-lg transition-colors duration-500 ${headerColor}`}>
                    Child Growth Tracker 🚀
                </h1>
                <div className="flex flex-col space-y-8">
                    {/* Student Selection */}
                    <div className={`${cardClasses} ${cardBgColor}`}>
                        <h2 className={`text-3xl font-bold mb-4 ${subHeadingColor}`}>Select a Child</h2>
                        <select
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            className={`${inputClasses} ${isUnicornTheme ? 'bg-white/50 border-pink-300 text-purple-800 focus:ring-pink-300' : 'bg-gray-700/50 border-purple-500 text-white focus:ring-purple-500'}`}
                        >
                            <option value="" className={isUnicornTheme ? 'text-gray-400' : 'text-gray-400'}>Choose a child...</option>
                            {students.map(student => (
                                <option key={student.id} value={student.id} className={isUnicornTheme ? 'text-gray-800' : 'text-white'}>
                                    {student.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Add New Record Form */}
                    {selectedStudent && (
                        <div className={`${cardClasses} ${cardBgColor}`}>
                            <h2 className={`text-3xl font-bold mb-6 ${subHeadingColor}`}>Add New Measurement</h2>
                            <form onSubmit={handleSubmitRecord} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                                <div>
                                    <label className={`block text-lg font-medium mb-2 ${subHeadingColor}`}>Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={newRecord.date}
                                        onChange={handleInputChange}
                                        className={`${inputClasses} ${isUnicornTheme ? 'bg-white/50 border-pink-300 text-purple-800 focus:ring-pink-300' : 'bg-gray-700/50 border-purple-500 text-white focus:ring-purple-500'}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={`block text-lg font-medium mb-2 ${subHeadingColor}`}>Height (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={newRecord.height}
                                        onChange={handleInputChange}
                                        step="0.1"
                                        min="0"
                                        className={`${inputClasses} ${isUnicornTheme ? 'bg-white/50 border-pink-300 text-purple-800 focus:ring-pink-300' : 'bg-gray-700/50 border-purple-500 text-white focus:ring-purple-500'}`}
                                        placeholder="e.g., 85.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={`block text-lg font-medium mb-2 ${subHeadingColor}`}>Weight (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={newRecord.weight}
                                        onChange={handleInputChange}
                                        step="0.1"
                                        min="0"
                                        className={`${inputClasses} ${isUnicornTheme ? 'bg-white/50 border-pink-300 text-purple-800 focus:ring-pink-300' : 'bg-gray-700/50 border-purple-500 text-white focus:ring-purple-500'}`}
                                        placeholder="e.g., 12.3"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <button
                                        type="submit"
                                        className={`w-full font-bold px-8 py-4 rounded-full text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ${isUnicornTheme ? 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'}`}
                                    >
                                        Add Record
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Growth Chart */}
                    {chartData && (
                        <div className={`${cardClasses} ${cardBgColor}`}>
                            <h2 className={`text-3xl font-bold mb-4 ${subHeadingColor}`}>Growth Progress</h2>
                            <div className="h-96 w-full">
                                <Line data={chartData.data} options={chartData.options} />
                            </div>
                        </div>
                    )}

                    {/* Growth Records Table */}
                    {selectedStudent && growthRecords[selectedStudent] && (
                        <div className={`${cardClasses} ${cardBgColor}`}>
                            <h2 className={`text-3xl font-bold mb-4 ${subHeadingColor}`}>Measurement History</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full table-auto border-collapse">
                                    <thead>
                                        <tr className={`border-b-4 transition-colors duration-500 ${isUnicornTheme ? 'border-pink-300/60' : 'border-purple-600/60'}`}>
                                            <th className={`px-4 py-4 text-left font-extrabold ${subHeadingColor}`}>Date</th>
                                            <th className={`px-4 py-4 text-left font-extrabold ${subHeadingColor}`}>Height (cm)</th>
                                            <th className={`px-4 py-4 text-left font-extrabold ${subHeadingColor}`}>Weight (kg)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {growthRecords[selectedStudent].map((record, index) => (
                                            <tr key={index} className={`border-b-2 transition-colors duration-500 ${isUnicornTheme ? 'border-pink-200/50' : 'border-gray-700/50'}`}>
                                                <td className={`px-4 py-3 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-300'}`}>{new Date(record.date).toLocaleDateString('en-IN')}</td>
                                                <td className={`px-4 py-3 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-300'}`}>{record.height}</td>
                                                <td className={`px-4 py-3 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-300'}`}>{record.weight}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom CSS for animations */}
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
                .animate-pulse-sparkle {
                    animation: pulse-sparkle 2s ease-in-out infinite alternate;
                }
                @keyframes pulse-sparkle {
                    from { transform: scale(1); opacity: 0.7; }
                    to { transform: scale(1.1); opacity: 1; }
                }
                `}
            </style>
        </div>
    );
};

export default GrowthTracker;
