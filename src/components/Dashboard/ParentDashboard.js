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

const ParentDashboard = () => {
    const [students, setStudents] = useState([]);
    const [selectedChild, setSelectedChild] = useState('');
    const [attendance, setAttendance] = useState({});
    const [growthRecords, setGrowthRecords] = useState({});
    const [vaccinationRecords, setVaccinationRecords] = useState({});
    const [mealRecords, setMealRecords] = useState({});

    // Load all data from localStorage
    useEffect(() => {
        const savedStudents = JSON.parse(localStorage.getItem('anganwadiStudents')) || [];
        const savedAttendance = JSON.parse(localStorage.getItem('anganwadiAttendance')) || {};
        const savedGrowth = JSON.parse(localStorage.getItem('anganwadiGrowth')) || {};
        const savedVaccinations = JSON.parse(localStorage.getItem('anganwadiVaccinations')) || {};
        const savedMeals = JSON.parse(localStorage.getItem('anganwadiMeals')) || {};

        setStudents(savedStudents);
        setAttendance(savedAttendance);
        setGrowthRecords(savedGrowth);
        setVaccinationRecords(savedVaccinations);
        setMealRecords(savedMeals);

        // Auto-select first child if available
        if (savedStudents.length > 0 && !selectedChild) {
            setSelectedChild(savedStudents[0].id);
        }
    }, []);

    // Get selected child data
    const selectedChildData = students.find(student => student.id === parseInt(selectedChild));

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
            plugins: {
                title: {
                    display: true,
                    text: 'Growth Progress'
                }
            },
            scales: {
                y: {
                    title: { display: true, text: 'Height (cm)' }
                },
                y1: {
                    position: 'right',
                    title: { display: true, text: 'Weight (kg)' },
                    grid: { drawOnChartArea: false }
                }
            }
        };

        return { data, options };
    };

    // Get due vaccinations
    const getDueVaccinations = () => {
        if (!selectedChild) return [];

        const vaccineSchedule = [
            { id: 1, name: 'BCG', recommendedAge: 'At birth' },
            { id: 2, name: 'Hepatitis B', recommendedAge: 'At birth' },
            { id: 3, name: 'OPV', recommendedAge: '6, 10 & 14 weeks' },
            { id: 4, name: 'IPV', recommendedAge: '6 & 14 weeks' },
            { id: 5, name: 'Pentavalent', recommendedAge: '6, 10 & 14 weeks' },
            { id: 6, name: 'Rotavirus', recommendedAge: '6, 10 & 14 weeks' },
            { id: 7, name: 'Measles-Rubella', recommendedAge: '9-12 months' },
            { id: 8, name: 'JE', recommendedAge: '9-12 months' },
            { id: 9, name: 'DPT booster', recommendedAge: '16-24 months' },
            { id: 10, name: 'Polio Booster', recommendedAge: '16-24 months' }
        ];

        const childRecords = vaccinationRecords[selectedChild] || [];
        const dueVaccines = [];

        vaccineSchedule.forEach(vaccine => {
            const isAdministered = childRecords.some(record => record.vaccineId === vaccine.id);
            if (!isAdministered) {
                dueVaccines.push(vaccine);
            }
        });

        return dueVaccines.slice(0, 3); // Show only next 3 due vaccinations
    };

    const dueVaccinations = getDueVaccinations();
    const growthChartData = getGrowthChartData();

    // Get recent meals
    const getRecentMeals = () => {
        return Object.entries(mealRecords)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
            .slice(0, 3)
            .map(([date, meals]) => ({
                date,
                breakfast: meals.breakfast,
                lunch: meals.lunch,
                snacks: meals.snacks
            }));
    };

    const recentMeals = getRecentMeals();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Parent Dashboard</h1>

            {/* Child Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">My Child</h2>
                <select
                    value={selectedChild}
                    onChange={(e) => setSelectedChild(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                >
                    <option value="">Select your child</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedChildData && (
                <>
                    {/* Welcome Message */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl font-bold mb-2">Welcome, Parent!</h2>
                        <p>Viewing progress for <strong>{selectedChildData.name}</strong></p>
                    </div>

                    {/* Attendance Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">📊 Attendance Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-3xl font-bold text-blue-600">{attendanceData.percentage}%</div>
                                <p className="text-sm">Attendance Rate</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-3xl font-bold text-green-600">{attendanceData.present}</div>
                                <p className="text-sm">Days Present</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-3xl font-bold text-gray-600">{attendanceData.total}</div>
                                <p className="text-sm">Days Recorded</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                            Regular attendance ensures your child receives continuous education, nutrition, and healthcare.
                        </p>
                    </div>

                    {/* Growth Progress */}
                    {growthChartData && (
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-semibold mb-4">📈 Growth Progress</h2>
                            <div className="h-64">
                                <Line data={growthChartData.data} options={growthChartData.options} />
                            </div>
                        </div>
                    )}

                    {/* Vaccination Status */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">💉 Vaccination Status</h2>
                        {dueVaccinations.length === 0 ? (
                            <p className="text-green-600">✅ All vaccinations are up to date!</p>
                        ) : (
                            <div>
                                <p className="text-orange-600 mb-3">Next due vaccinations:</p>
                                <ul className="space-y-2">
                                    {dueVaccinations.map(vaccine => (
                                        <li key={vaccine.id} className="flex items-center">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                            <span>{vaccine.name} - Recommended at {vaccine.recommendedAge}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Recent Meals */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">🍎 Recent Meals</h2>
                        {recentMeals.length === 0 ? (
                            <p className="text-gray-600">No meal records available.</p>
                        ) : (
                            <div className="space-y-3">
                                {recentMeals.map((meal, index) => (
                                    <div key={index} className="border border-gray-200 p-3 rounded-lg">
                                        <h4 className="font-semibold text-green-700">
                                            {new Date(meal.date).toLocaleDateString('en-IN')}
                                        </h4>
                                        <p><strong>Breakfast:</strong> {meal.breakfast || 'Not specified'}</p>
                                        <p><strong>Lunch:</strong> {meal.lunch || 'Not specified'}</p>
                                        <p><strong>Snacks:</strong> {meal.snacks || 'Not specified'}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Important Notice */}
                    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-3 text-yellow-800">📢 Important Notice</h2>
                        <ul className="space-y-2 text-yellow-700">
                            <li>• Please ensure your child attends regularly for continuous learning</li>
                            <li>• Vaccinations are essential for your child's health and development</li>
                            <li>• Balanced nutrition at Anganwadi supports your child's growth</li>
                            <li>• Regular health check-ups help detect issues early</li>
                        </ul>
                    </div>
                </>
            )}

            {!selectedChild && students.length === 0 && (
                <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold mb-3">Welcome to Anganwadi Services!</h2>
                    <p className="text-gray-600">
                        Your child's data will appear here once they are registered by the Anganwadi worker.
                        Please ensure regular attendance for complete benefits.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ParentDashboard;