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
    const bgColor = isUnicornTheme ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100' : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';

    const cardClasses = `p-6 rounded-3xl shadow-lg transition-all duration-500 transform hover:scale-105`;
    const cardBgColor = isUnicornTheme ? 'bg-white/50 backdrop-blur-sm' : 'bg-gray-800/50 backdrop-blur-sm text-white';
    const textColor = isUnicornTheme ? 'text-gray-700' : 'text-gray-300';
    const headerColor = isUnicornTheme ? 'text-purple-800' : 'text-yellow-200';
    const subHeadingColor = isUnicornTheme ? 'text-blue-700' : 'text-purple-300';
    const buttonBaseClasses = `px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105`;

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
                        color: isUnicornTheme ? '#4B5563' : '#E5E7EB'
                    },
                    ticks: { color: isUnicornTheme ? '#4B5563' : '#9CA3AF' },
                    grid: { color: isUnicornTheme ? 'rgba(209, 213, 219, 0.5)' : 'rgba(107, 114, 128, 0.5)' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Weight (kg)',
                        color: isUnicornTheme ? '#4B5563' : '#E5E7EB'
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
            },
            plugins: {
                title: {
                    display: true,
                    text: `Growth Chart for ${student?.name || 'Selected Child'}`,
                    color: isUnicornTheme ? '#4B5563' : '#E5E7EB'
                },
                legend: {
                    labels: {
                        color: isUnicornTheme ? '#4B5563' : '#D1D5DB'
                    }
                }
            }
        };

        return { data, options };
    };

    const chartData = getChartData();

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
                    📈 Growth Tracker
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

                {/* Add New Record Form */}
                {selectedStudent && (
                    <div className={`${cardClasses} ${cardBgColor} mt-6`}>
                        <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>Add New Measurement</h2>
                        <form onSubmit={handleSubmitRecord} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={newRecord.date}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                    required
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Height (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={newRecord.height}
                                    onChange={handleInputChange}
                                    step="0.1"
                                    min="0"
                                    className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                    placeholder="e.g., 85.5"
                                    required
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={newRecord.weight}
                                    onChange={handleInputChange}
                                    step="0.1"
                                    min="0"
                                    className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                    placeholder="e.g., 12.3"
                                    required
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className={`w-full font-bold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${isUnicornTheme ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:from-pink-500 hover:via-purple-500 hover:to-blue-500' : 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white hover:from-blue-600 hover:via-purple-700 hover:to-pink-600'}`}
                                >
                                    Add Record
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Growth Chart */}
                {chartData && (
                    <div className={`${cardClasses} ${cardBgColor} mt-6`}>
                        <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>Growth Progress</h2>
                        <div className="h-96">
                            <Line data={chartData.data} options={chartData.options} />
                        </div>
                    </div>
                )}

                {/* Growth Records Table */}
                {selectedStudent && growthRecords[selectedStudent] && (
                    <div className={`${cardClasses} ${cardBgColor} mt-6`}>
                        <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>Measurement History</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className={`border-b-2 transition-colors duration-500 ${isUnicornTheme ? 'border-gray-200' : 'border-gray-700'}`}>
                                        <th className={`px-4 py-2 text-left font-bold ${textColor}`}>Date</th>
                                        <th className={`px-4 py-2 text-left font-bold ${textColor}`}>Height (cm)</th>
                                        <th className={`px-4 py-2 text-left font-bold ${textColor}`}>Weight (kg)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {growthRecords[selectedStudent].map((record, index) => (
                                        <tr key={index} className={`border-b transition-colors duration-500 ${isUnicornTheme ? 'border-gray-100' : 'border-gray-800'}`}>
                                            <td className={`px-4 py-2 ${textColor}`}>{new Date(record.date).toLocaleDateString('en-IN')}</td>
                                            <td className={`px-4 py-2 ${textColor}`}>{record.height}</td>
                                            <td className={`px-4 py-2 ${textColor}`}>{record.weight}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GrowthTracker;