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

const GrowthTracker = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [growthRecords, setGrowthRecords] = useState({});
    const [newRecord, setNewRecord] = useState({
        date: new Date().toISOString().split('T')[0],
        height: '',
        weight: ''
    });

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
        const student = students.find(s => s.id === parseInt(selectedStudent)); // FIXED: Changed == to ===

        const data = {
            labels: records.map(record => new Date(record.date).toLocaleDateString('en-IN')),
            datasets: [
                {
                    label: 'Height (cm)',
                    data: records.map(record => record.height),
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    yAxisID: 'y',
                },
                {
                    label: 'Weight (kg)',
                    data: records.map(record => record.weight),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'y1',
                },
            ],
        };

        const options = {
            responsive: true,
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
                        text: 'Height (cm)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Weight (kg)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: `Growth Chart for ${student?.name || 'Selected Child'}`
                }
            }
        };

        return { data, options };
    };

    const chartData = getChartData();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Growth Tracker</h1>

            {/* Student Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Select Child</h2>
                <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                >
                    <option value="">Choose a child</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Add New Record Form */}
            {selectedStudent && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">Add New Measurement</h2>
                    <form onSubmit={handleSubmitRecord} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={newRecord.date}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Height (cm)</label>
                            <input
                                type="number"
                                name="height"
                                value={newRecord.height}
                                onChange={handleInputChange}
                                step="0.1"
                                min="0"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="e.g., 85.5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={newRecord.weight}
                                onChange={handleInputChange}
                                step="0.1"
                                min="0"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="e.g., 12.3"
                                required
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full"
                            >
                                Add Record
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Growth Chart */}
            {chartData && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">Growth Progress</h2>
                    <div className="h-96">
                        <Line data={chartData.data} options={chartData.options} />
                    </div>
                </div>
            )}

            {/* Growth Records Table */}
            {selectedStudent && growthRecords[selectedStudent] && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Measurement History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Height (cm)</th>
                                    <th className="px-4 py-2 text-left">Weight (kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {growthRecords[selectedStudent].map((record, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2">{new Date(record.date).toLocaleDateString('en-IN')}</td>
                                        <td className="px-4 py-2">{record.height}</td>
                                        <td className="px-4 py-2">{record.weight}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GrowthTracker;