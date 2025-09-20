import React, { useState, useEffect } from 'react';

// Component for a custom, state-driven alert message
const AlertMessage = ({ message, type = 'error', onClose, isUnicornTheme }) => {
    if (!message) return null;

    const colors = isUnicornTheme ? {
        error: 'bg-red-100 border-red-400 text-red-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
    } : {
        error: 'bg-red-900 border-red-600 text-red-300',
        info: 'bg-blue-900 border-blue-600 text-blue-300',
    };

    return (
        <div className={`mt-4 p-4 rounded-lg border-l-4 ${colors[type]} transition-all duration-300 transform scale-100 animate-slide-in`}>
            <div className="flex justify-between items-center">
                <p className="text-sm font-medium">{message}</p>
                <button onClick={onClose} className="text-xl leading-none font-bold ml-4">
                    &times;
                </button>
            </div>
        </div>
    );
};

const DailyActivities = ({ theme }) => {
    const [dailyActivities, setDailyActivities] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [todayActivities, setTodayActivities] = useState({
        morning_session: '',
        midday_session: '',
        afternoon_session: '',
        special_event: ''
    });
    const [alertMessage, setAlertMessage] = useState('');

    const isUnicornTheme = theme === 'unicorn';
    const bgColor = isUnicornTheme ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100' : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';

    const cardClasses = `p-6 rounded-3xl shadow-lg transition-all duration-500`;
    const cardBgColor = isUnicornTheme ? 'bg-white/50 backdrop-blur-sm' : 'bg-gray-800/50 backdrop-blur-sm text-white';
    const textColor = isUnicornTheme ? 'text-gray-700' : 'text-gray-300';
    const headerColor = isUnicornTheme ? 'text-purple-800' : 'text-yellow-200';
    const subHeadingColor = isUnicornTheme ? 'text-blue-700' : 'text-purple-300';
    const buttonBaseClasses = `px-6 py-2 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105`;

    // List of recommended activities for different areas of development
    const activityList = {
        'Creative Play': [
            'Painting with watercolors',
            'Play-Doh sculpting',
            'Finger painting',
            'Storytelling with puppets'
        ],
        'Physical Activities': [
            'Outdoor free play',
            'Musical chairs',
            'Jump rope',
            'Follow the leader'
        ],
        'Cognitive & Learning': [
            'Shape and color sorting',
            'Alphabet flashcards',
            'Number puzzles',
            'Reading circle'
        ],
        'Social & Emotional': [
            'Sharing toys exercise',
            'Group singing',
            'Show and tell'
        ]
    };

    // Load data from localStorage
    useEffect(() => {
        const savedActivities = JSON.parse(localStorage.getItem('playschoolDailyActivities')) || {};
        setDailyActivities(savedActivities);
    }, []);

    // Save daily activities to localStorage
    useEffect(() => {
        localStorage.setItem('playschoolDailyActivities', JSON.stringify(dailyActivities));
    }, [dailyActivities]);

    // Get formatted date string
    const getDateString = (date) => {
        return date.toISOString().split('T')[0];
    };

    const todayString = getDateString(currentDate);

    // Handle activity input changes
    const handleActivityChange = (sessionType, value) => {
        setTodayActivities(prev => ({
            ...prev,
            [sessionType]: value
        }));
    };

    // Save today's activities
    const saveTodayActivities = () => {
        if (todayActivities.morning_session.trim() || todayActivities.midday_session.trim() || todayActivities.afternoon_session.trim()) {
            setDailyActivities(prev => ({
                ...prev,
                [todayString]: todayActivities
            }));
            setTodayActivities({
                morning_session: '',
                midday_session: '',
                afternoon_session: '',
                special_event: ''
            });
            setAlertMessage('✅ Today\'s activities saved successfully!');
        } else {
            setAlertMessage('Please enter at least one activity to save.');
        }
    };

    const isTodayRecorded = dailyActivities[todayString];

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
                    🎨 Daily Activities
                </h1>

                {/* Daily Activity Log */}
                <div className={`${cardClasses} ${cardBgColor}`}>
                    <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>
                        Today's Plan - {currentDate.toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </h2>

                    {isTodayRecorded ? (
                        <div className={`p-4 rounded-lg mb-4 border-l-4 transition-all duration-500 ${isUnicornTheme ? 'bg-blue-50 border-blue-400' : 'bg-blue-900 border-blue-700'}`}>
                            <p className={`font-semibold ${isUnicornTheme ? 'text-blue-700' : 'text-blue-300'}`}>✅ Activities already recorded for today!</p>
                            <div className="mt-2 text-sm">
                                <p><strong>Morning Session:</strong> {dailyActivities[todayString].morning_session || 'Not specified'}</p>
                                <p><strong>Midday Session:</strong> {dailyActivities[todayString].midday_session || 'Not specified'}</p>
                                <p><strong>Afternoon Session:</strong> {dailyActivities[todayString].afternoon_session || 'Not specified'}</p>
                                <p><strong>Special Event:</strong> {dailyActivities[todayString].special_event || 'None'}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Morning Session</label>
                                <input
                                    type="text"
                                    value={todayActivities.morning_session}
                                    onChange={(e) => handleActivityChange('morning_session', e.target.value)}
                                    placeholder="e.g., Reading time, free play"
                                    className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Midday Session</label>
                                <input
                                    type="text"
                                    value={todayActivities.midday_session}
                                    onChange={(e) => handleActivityChange('midday_session', e.target.value)}
                                    placeholder="e.g., Creative arts, music circle"
                                    className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Afternoon Session</label>
                                <input
                                    type="text"
                                    value={todayActivities.afternoon_session}
                                    onChange={(e) => handleActivityChange('afternoon_session', e.target.value)}
                                    placeholder="e.g., Outdoor play, group games"
                                    className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Special Event (Optional)</label>
                                <input
                                    type="text"
                                    value={todayActivities.special_event}
                                    onChange={(e) => handleActivityChange('special_event', e.target.value)}
                                    placeholder="e.g., Storyteller visit, birthday celebration"
                                    className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isUnicornTheme ? 'bg-white border border-gray-300 text-gray-700 focus:ring-pink-300' : 'bg-gray-700 border border-gray-600 text-white focus:ring-purple-500'}`}
                                />
                            </div>
                            <button
                                onClick={saveTodayActivities}
                                className={`w-full ${buttonBaseClasses} bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 shadow-lg`}
                            >
                                Save Today's Activities
                            </button>
                        </div>
                    )}
                </div>

                {/* Activities Reference */}
                <div className={`${cardClasses} ${cardBgColor} mt-6`}>
                    <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>Activity Ideas for Children</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(activityList).map(([category, activities]) => (
                            <div key={category} className={`p-4 rounded-lg border transition-all duration-500 ${isUnicornTheme ? 'border-blue-200 bg-white/50' : 'border-blue-700 bg-gray-800'}`}>
                                <h3 className={`font-semibold mb-2 ${isUnicornTheme ? 'text-blue-800' : 'text-blue-300'}`}>{category}</h3>
                                <ul className={`list-disc list-inside text-sm space-y-1 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {activities.map((activity, i) => (
                                        <li key={i}>{activity}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activities History */}
                {Object.keys(dailyActivities).length > 0 && (
                    <div className={`${cardClasses} ${cardBgColor} mt-6`}>
                        <h2 className={`text-xl font-semibold mb-4 ${subHeadingColor}`}>Recent Activities History</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className={`transition-colors duration-500 ${isUnicornTheme ? 'bg-blue-100 text-blue-800' : 'bg-blue-900 text-blue-300'}`}>
                                        <th className={`px-4 py-2 text-left font-bold ${isUnicornTheme ? 'text-blue-800' : 'text-blue-300'}`}>Date</th>
                                        <th className={`px-4 py-2 text-left font-bold ${isUnicornTheme ? 'text-blue-800' : 'text-blue-300'}`}>Morning Session</th>
                                        <th className={`px-4 py-2 text-left font-bold ${isUnicornTheme ? 'text-blue-800' : 'text-blue-300'}`}>Midday Session</th>
                                        <th className={`px-4 py-2 text-left font-bold ${isUnicornTheme ? 'text-blue-800' : 'text-blue-300'}`}>Afternoon Session</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(dailyActivities)
                                        .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
                                        .slice(0, 5)
                                        .map(([date, activities], index) => (
                                            <tr key={date} className={`border-b transition-colors duration-500 ${isUnicornTheme ? 'border-gray-200 hover:bg-gray-50' : 'border-gray-700 hover:bg-gray-700'}`}>
                                                <td className={`px-4 py-2 ${textColor}`}>{new Date(date).toLocaleDateString('en-IN')}</td>
                                                <td className={`px-4 py-2 ${textColor}`}>{activities.morning_session || '-'}</td>
                                                <td className={`px-4 py-2 ${textColor}`}>{activities.midday_session || '-'}</td>
                                                <td className={`px-4 py-2 ${textColor}`}>{activities.afternoon_session || '-'}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <AlertMessage message={alertMessage} onClose={() => setAlertMessage('')} isUnicornTheme={isUnicornTheme} />
            </div>
        </div>
    );
};

export default DailyActivities;