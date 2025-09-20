import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ theme, setTheme }) => {
    const isUnicornTheme = theme === 'unicorn';
    const bgColor = isUnicornTheme ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100' : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';
    const cardBaseClasses = `p-6 rounded-[2rem] shadow-lg border-l-4 transition-all duration-300 transform hover:scale-105 cursor-pointer`;

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
                <h1 className={`text-4xl font-extrabold text-center mb-12 drop-shadow-md transition-colors duration-500 ${isUnicornTheme ? 'text-purple-800' : 'text-yellow-200'}`}>
                    Playschool Admin Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Attendance Card with Link */}
                    <Link to="/attendance">
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-white border-purple-500 hover:bg-gray-50' : 'bg-gray-800 border-purple-400 hover:bg-gray-700'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-blue-700' : 'text-purple-300'}`}>
                                📅 Attendance Tracker
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                                Mark daily attendance and manage student records.
                            </p>
                        </div>
                    </Link>

                    {/* Growth Tracker Card */}
                    <Link to="/growth-tracker">
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-white border-pink-500 hover:bg-gray-50' : 'bg-gray-800 border-pink-400 hover:bg-gray-700'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-blue-700' : 'text-pink-300'}`}>
                                📈 Growth Monitor
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                                Track child's physical development and milestones.
                            </p>
                        </div>
                    </Link>

                    {/* Nutrition Tracker Card */}
                    <Link to="/nutrition-tracker">
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-white border-green-500 hover:bg-gray-50' : 'bg-gray-800 border-green-400 hover:bg-gray-700'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-blue-700' : 'text-green-300'}`}>
                                🍎 Nutrition Tracker
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                                Log meals and manage dietary plans for each child.
                            </p>
                        </div>
                    </Link>

                    {/* Daily Activities Card */}
                    <Link to="/daily-activities">
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-white border-yellow-500 hover:bg-gray-50' : 'bg-gray-800 border-yellow-400 hover:bg-gray-700'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-blue-700' : 'text-yellow-300'}`}>
                                🎨 Daily Activities
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                                Plan and record creative and physical activities.
                            </p>
                        </div>
                    </Link>

                    {/* Learning Page Card */}
                    <Link to="/learning">
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-white border-blue-500 hover:bg-gray-50' : 'bg-gray-800 border-blue-400 hover:bg-gray-700'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-blue-700' : 'text-blue-300'}`}>
                                📚 Learning Progress
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                                Monitor academic and foundational learning progress.
                            </p>
                        </div>
                    </Link>

                    {/* Notification Card */}
                    <Link to="/notifications">
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-white border-orange-500 hover:bg-gray-50' : 'bg-gray-800 border-orange-400 hover:bg-gray-700'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-blue-700' : 'text-orange-300'}`}>
                                🔔 Notifications
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                                Send important alerts and messages to parents.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;