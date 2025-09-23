import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ theme, setTheme }) => {
    const isUnicornTheme = theme === 'unicorn';
    const bgColor = isUnicornTheme
        ? 'bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200'
        : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';
    const cardBaseClasses = `p-8 rounded-[40px] shadow-2xl text-center transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-4 border-white border-opacity-60 relative overflow-hidden group`;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const floatingEmojis = isUnicornTheme
        ? ['🦄', '🌈', '🌟', '☁️', '🎈', '🍭', '🎀', '💖', '✨', '🌸']
        : ['🌙', '✨', '🪐', '💫', '🚀', '⭐', '☄️', '🔮', '👽', '🌌'];

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

            <div className={`relative z-10 container mx-auto px-4 py-8 transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className={`text-4xl font-extrabold text-center mb-12 drop-shadow-md transition-colors duration-500 ${isUnicornTheme ? 'text-purple-800' : 'text-yellow-200'}`}>
                    Playschool Admin Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Attendance Card with Link */}
                    <Link to="/attendance" className={`animate-fade-in`}>
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-gradient-to-br from-pink-300 to-purple-300' : 'bg-gradient-to-br from-gray-800 to-purple-800'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-purple-800' : 'text-pink-300'}`}>
                                📅 Attendance Tracker
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                                Mark daily attendance and manage student records.
                            </p>
                        </div>
                    </Link>

                    {/* Growth Tracker Card */}
                    <Link to="/growth-tracker" className={`animate-fade-in delay-1`}>
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-gradient-to-br from-blue-300 to-green-300' : 'bg-gradient-to-br from-purple-800 to-blue-800'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-purple-800' : 'text-yellow-300'}`}>
                                📈 Growth Monitor
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                                Track child's physical development and milestones.
                            </p>
                        </div>
                    </Link>

                    {/* Nutrition Tracker Card */}
                    <Link to="/nutrition-tracker" className={`animate-fade-in delay-2`}>
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-gradient-to-br from-yellow-300 to-pink-300' : 'bg-gradient-to-br from-blue-800 to-pink-800'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-purple-800' : 'text-blue-300'}`}>
                                🍎 Nutrition Tracker
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                                Log meals and manage dietary plans for each child.
                            </p>
                        </div>
                    </Link>

                    {/* Daily Activities Card */}
                    <Link to="/daily-activities" className={`animate-fade-in delay-1`}>
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-gradient-to-br from-pink-300 to-blue-300' : 'bg-gradient-to-br from-gray-800 to-blue-800'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-purple-800' : 'text-pink-300'}`}>
                                🎨 Daily Activities
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                                Plan and record creative and physical activities.
                            </p>
                        </div>
                    </Link>

                    {/* Learning Page Card */}
                    <Link to="/learning" className={`animate-fade-in delay-2`}>
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-gradient-to-br from-blue-300 to-purple-300' : 'bg-gradient-to-br from-purple-800 to-pink-800'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-purple-800' : 'text-yellow-300'}`}>
                                📚 Learning Progress
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                                Monitor academic and foundational learning progress.
                            </p>
                        </div>
                    </Link>

                    {/* Notification Card */}
                    <Link to="/notifications" className={`animate-fade-in delay-3`}>
                        <div className={`${cardBaseClasses} ${isUnicornTheme ? 'bg-gradient-to-br from-yellow-300 to-pink-300' : 'bg-gradient-to-br from-blue-800 to-pink-800'}`}>
                            <h3 className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-purple-800' : 'text-blue-300'}`}>
                                🔔 Notifications
                            </h3>
                            <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                                Send important alerts and messages to parents.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Add custom animation styles */}
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
                @keyframes fade-in {
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                    opacity: 0;
                }
                .delay-1 {
                    animation-delay: 0.5s;
                }
                .delay-2 {
                    animation-delay: 1s;
                }
                .delay-3 {
                    animation-delay: 1.5s;
                }
                `}
            </style>
        </div>
    );
};

export default AdminDashboard;
