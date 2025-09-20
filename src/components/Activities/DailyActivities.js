import React, { useState, useEffect } from 'react';

const DailyActivities = () => {
    const [dailyActivities, setDailyActivities] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [todayActivities, setTodayActivities] = useState({
        morning_session: '',
        midday_session: '',
        afternoon_session: '',
        special_event: ''
    });

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
            alert('✅ Today\'s activities saved successfully!');
        } else {
            alert('Please enter at least one activity to save.');
        }
    };

    const isTodayRecorded = dailyActivities[todayString];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Daily Activities</h1>

            {/* Daily Activity Log */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-700">
                    Today's Plan - {currentDate.toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </h2>

                {isTodayRecorded ? (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-400">
                        <p className="text-blue-700 font-semibold">✅ Activities already recorded for today!</p>
                        <div className="mt-2">
                            <p><strong>Morning Session:</strong> {dailyActivities[todayString].morning_session || 'Not specified'}</p>
                            <p><strong>Midday Session:</strong> {dailyActivities[todayString].midday_session || 'Not specified'}</p>
                            <p><strong>Afternoon Session:</strong> {dailyActivities[todayString].afternoon_session || 'Not specified'}</p>
                            <p><strong>Special Event:</strong> {dailyActivities[todayString].special_event || 'None'}</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Morning Session</label>
                            <input
                                type="text"
                                value={todayActivities.morning_session}
                                onChange={(e) => handleActivityChange('morning_session', e.target.value)}
                                placeholder="e.g., Reading time, free play"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Midday Session</label>
                            <input
                                type="text"
                                value={todayActivities.midday_session}
                                onChange={(e) => handleActivityChange('midday_session', e.target.value)}
                                placeholder="e.g., Creative arts, music circle"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Afternoon Session</label>
                            <input
                                type="text"
                                value={todayActivities.afternoon_session}
                                onChange={(e) => handleActivityChange('afternoon_session', e.target.value)}
                                placeholder="e.g., Outdoor play, group games"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Special Event (Optional)</label>
                            <input
                                type="text"
                                value={todayActivities.special_event}
                                onChange={(e) => handleActivityChange('special_event', e.target.value)}
                                placeholder="e.g., Storyteller visit, birthday celebration"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <button
                            onClick={saveTodayActivities}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        >
                            Save Today's Activities
                        </button>
                    </div>
                )}
            </div>

            {/* Activities Reference */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4 text-blue-700">Activity Ideas for Children</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(activityList).map(([category, activities]) => (
                        <div key={category} className="border border-blue-200 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-800 mb-2">{category}</h3>
                            <ul className="list-disc list-inside text-sm space-y-1">
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
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-semibold mb-4 text-blue-700">Recent Activities History</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-blue-100 text-blue-800">
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Morning Session</th>
                                    <th className="px-4 py-2 text-left">Midday Session</th>
                                    <th className="px-4 py-2 text-left">Afternoon Session</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(dailyActivities)
                                    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
                                    .slice(0, 5)
                                    .map(([date, activities]) => (
                                        <tr key={date} className="border-b hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-4 py-2">{new Date(date).toLocaleDateString('en-IN')}</td>
                                            <td className="px-4 py-2">{activities.morning_session || '-'}</td>
                                            <td className="px-4 py-2">{activities.midday_session || '-'}</td>
                                            <td className="px-4 py-2">{activities.afternoon_session || '-'}</td>
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

export default DailyActivities;