import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-green-700 mb-8">Anganwadi Worker Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Attendance Card with Link */}
                <Link to="/attendance">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">📅 Attendance Tracker</h3>
                        <p className="text-gray-600">Mark daily attendance for children.</p>
                    </div>
                </Link>

                {/* Growth Tracker Card */}
                <Link to="/growth-tracker">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">📈 Growth Monitor</h3>
                        <p className="text-gray-600">Record height and weight measurements.</p>
                    </div>
                </Link>

                {/* Vaccination Card */}
                {/* Vaccination Card with Link */}
                <Link to="/vaccination-tracker">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">💉 Vaccination Records</h3>
                        <p className="text-gray-600">Manage polio drops and immunization schedules.</p>
                    </div>
                </Link>

                {/* Nutrition Card */}
                <Link to="/nutrition-advisor">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">🍎 Nutrition Advice</h3>
                        <p className="text-gray-600">Provide food guidance and track meals.</p>
                    </div>
                </Link>

                {/* Education Card */}
                <Link to="/learning-activities">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">📚 Learning Activities</h3>
                        <p className="text-gray-600">Track English, Tamil, and Math progress.</p>
                    </div>
                </Link>
                {/* Awareness Card with Link */}
                <Link to="/parent-awareness">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500 hover:bg-gray-50 transition cursor-pointer">
                        <h3 className="text-xl font-semibold mb-2">📢 Parent Awareness</h3>
                        <p className="text-gray-600">Send reminders and educational content to parents.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;