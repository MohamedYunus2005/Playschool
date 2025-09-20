import React, { useState } from 'react';

const ParentAwareness = ({ theme }) => {
    const [activeTab, setActiveTab] = useState('messages');
    const [selectedParents, setSelectedParents] = useState([]);
    const [newMessage, setNewMessage] = useState({
        title: '',
        content: '',
        category: 'reminder',
        urgency: 'normal'
    });

    const isUnicornTheme = theme === 'unicorn';
    const bgColor = isUnicornTheme ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100' : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';

    const cardClasses = `p-6 rounded-3xl shadow-lg transition-all duration-500`;
    const cardBgColor = isUnicornTheme ? 'bg-white/50 backdrop-blur-sm' : 'bg-gray-800/50 backdrop-blur-sm text-white';
    const textColor = isUnicornTheme ? 'text-gray-700' : 'text-gray-300';
    const headerColor = isUnicornTheme ? 'text-purple-800' : 'text-yellow-200';
    const subHeadingColor = isUnicornTheme ? 'text-green-700' : 'text-green-300';
    const buttonBaseClasses = `px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105`;

    // Sample data - will come from API later
    const [messages, setMessages] = useState([
        {
            id: 1,
            title: 'Polio Vaccination Camp',
            content: 'Dear parents, polio vaccination camp will be held on 25th June 2024. Please bring your children.',
            category: 'vaccination',
            urgency: 'high',
            date: '2024-06-15',
            sentTo: ['All Parents']
        },
        {
            id: 2,
            title: 'Importance of Regular Attendance',
            content: 'Regular attendance helps in continuous learning and nutrition. Please ensure your child attends daily.',
            category: 'education',
            urgency: 'normal',
            date: '2024-06-10',
            sentTo: ['Frequently Absent Parents']
        },
        {
            id: 3,
            title: 'Nutrition Week',
            content: 'This week we are focusing on protein-rich foods. Special meals will be served.',
            category: 'nutrition',
            urgency: 'normal',
            date: '2024-06-05',
            sentTo: ['All Parents']
        }
    ]);

    const parents = [
        { id: 1, name: 'Rajesh Kumar', child: 'Kavya M.', phone: '+91 9876543210', lastContact: '2024-06-12' },
        { id: 2, name: 'Sneha Patel', child: 'Arjun S.', phone: '+91 8765432109', lastContact: '2024-06-10' },
        { id: 3, name: 'Mohan Singh', child: 'Divya P.', phone: '+91 7654321098', lastContact: '2024-06-08' },
        { id: 4, name: 'Priya Sharma', child: 'Siddharth R.', phone: '+91 6543210987', lastContact: '2024-06-05' },
        { id: 5, name: 'Ankit Verma', child: 'Priya K.', phone: '+91 5432109876', lastContact: '2024-06-01' }
    ];

    const parentGroups = [
        { id: 'all', name: 'All Parents', count: parents.length },
        { id: 'absent', name: 'Frequently Absent', count: 2 },
        { id: 'new', name: 'New Parents', count: 1 },
        { id: 'vaccination', name: 'Vaccination Due', count: 3 }
    ];

    const handleInputChange = (e) => {
        setNewMessage({
            ...newMessage,
            [e.target.name]: e.target.value
        });
    };

    const handleParentSelect = (parentId) => {
        setSelectedParents(prev =>
            prev.includes(parentId)
                ? prev.filter(id => id !== parentId)
                : [...prev, parentId]
        );
    };

    const handleGroupSelect = (group) => {
        const groupParentIds = parents.map(parent => parent.id);
        setSelectedParents(groupParentIds);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.title || !newMessage.content) return;

        // This is a placeholder for your actual logout logic
        window.alert('Message sent successfully!');

        const sentToNames = selectedParents.length > 0
            ? parents.filter(p => selectedParents.includes(p.id)).map(p => p.name)
            : ['All Parents'];

        const newMessageObj = {
            id: Date.now(),
            ...newMessage,
            date: new Date().toISOString().split('T')[0],
            sentTo: sentToNames
        };

        setMessages([newMessageObj, ...messages]);
        setNewMessage({
            title: '',
            content: '',
            category: 'reminder',
            urgency: 'normal'
        });
        setSelectedParents([]);
    };

    // Updated helper function for urgency colors
    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'high':
                return isUnicornTheme ? 'bg-red-100 text-red-800 border-red-300' : 'bg-red-900 text-red-300 border-red-600';
            case 'normal':
                return isUnicornTheme ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-blue-900 text-blue-300 border-blue-600';
            case 'low':
                return isUnicornTheme ? 'bg-gray-100 text-gray-800 border-gray-300' : 'bg-gray-700 text-gray-200 border-gray-600';
            default:
                return isUnicornTheme ? 'bg-gray-100 text-gray-800' : 'bg-gray-700 text-gray-200';
        }
    };

    // Updated helper function for category colors
    const getCategoryColor = (category) => {
        switch (category) {
            case 'vaccination':
                return isUnicornTheme ? 'bg-orange-100 text-orange-800' : 'bg-orange-900 text-orange-300';
            case 'nutrition':
                return isUnicornTheme ? 'bg-green-100 text-green-800' : 'bg-green-900 text-green-300';
            case 'education':
                return isUnicornTheme ? 'bg-blue-100 text-blue-800' : 'bg-blue-900 text-blue-300';
            case 'reminder':
                return isUnicornTheme ? 'bg-purple-100 text-purple-800' : 'bg-purple-900 text-purple-300';
            case 'event':
                return isUnicornTheme ? 'bg-pink-100 text-pink-800' : 'bg-pink-900 text-pink-300';
            default:
                return isUnicornTheme ? 'bg-gray-100 text-gray-800' : 'bg-gray-700 text-gray-200';
        }
    };

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
                <h2 className={`text-4xl font-extrabold text-center mb-6 drop-shadow-md transition-colors duration-500 ${headerColor}`}>
                    📢 Parent Communication
                </h2>

                {/* Navigation Tabs */}
                <div className={`${cardClasses} ${cardBgColor}`}>
                    <div className="flex space-x-1">
                        {[
                            { id: 'messages', label: 'Messages', icon: '✉️' },
                            { id: 'parents', label: 'Parent Contacts', icon: '👨‍👩‍👧' },
                            { id: 'templates', label: 'Templates', icon: '📋' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-2 px-4 rounded-full font-medium transition-colors ${activeTab === tab.id
                                    ? `text-white shadow-md ${isUnicornTheme ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-green-700 to-green-800'}`
                                    : `hover:bg-opacity-80 ${isUnicornTheme ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === 'messages' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        {/* Message List */}
                        <div className={`${cardClasses} ${cardBgColor}`}>
                            <h3 className={`text-lg font-semibold mb-4 transition-colors duration-500 ${subHeadingColor}`}>Sent Messages</h3>
                            <div className="space-y-4">
                                {messages.map(message => (
                                    <div key={message.id} className={`border rounded-lg p-4 transition-colors duration-500 ${isUnicornTheme ? 'border-gray-200 hover:bg-gray-50' : 'border-gray-700 hover:bg-gray-700'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className={`font-semibold text-lg transition-colors duration-500 ${isUnicornTheme ? 'text-gray-800' : 'text-gray-100'}`}>{message.title}</h4>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(message.urgency)}`}>
                                                {message.urgency}
                                            </span>
                                        </div>
                                        <p className={`mb-3 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-400'}`}>{message.content}</p>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(message.category)}`}>
                                                {message.category}
                                            </span>
                                        </div>
                                        <div className={`text-xs transition-colors duration-500 ${isUnicornTheme ? 'text-gray-500' : 'text-gray-500'}`}>
                                            Sent on: {message.date} • To: {message.sentTo.join(', ')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* New Message Form */}
                        <div className={`${cardClasses} ${cardBgColor}`}>
                            <h3 className={`text-lg font-semibold mb-4 transition-colors duration-500 ${subHeadingColor}`}>Send New Message</h3>
                            <form onSubmit={handleSendMessage} className="space-y-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-1 transition-colors duration-500 ${textColor}`}>Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newMessage.title}
                                        onChange={handleInputChange}
                                        className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'bg-white border-gray-300 text-gray-700 focus:ring-green-300' : 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500'}`}
                                        placeholder="Important announcement..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-1 transition-colors duration-500 ${textColor}`}>Message:</label>
                                    <textarea
                                        name="content"
                                        value={newMessage.content}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'bg-white border-gray-300 text-gray-700 focus:ring-green-300' : 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500'}`}
                                        placeholder="Type your message here..."
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 transition-colors duration-500 ${textColor}`}>Category:</label>
                                        <select
                                            name="category"
                                            value={newMessage.category}
                                            onChange={handleInputChange}
                                            className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'bg-white border-gray-300 text-gray-700 focus:ring-green-300' : 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500'}`}
                                        >
                                            <option value="reminder">Reminder</option>
                                            <option value="vaccination">Vaccination</option>
                                            <option value="nutrition">Nutrition</option>
                                            <option value="education">Education</option>
                                            <option value="event">Event</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-1 transition-colors duration-500 ${textColor}`}>Urgency:</label>
                                        <select
                                            name="urgency"
                                            value={newMessage.urgency}
                                            onChange={handleInputChange}
                                            className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'bg-white border-gray-300 text-gray-700 focus:ring-green-300' : 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500'}`}
                                        >
                                            <option value="low">Low</option>
                                            <option value="normal">Normal</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${textColor}`}>Send To:</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {parentGroups.map(group => (
                                            <button
                                                key={group.id}
                                                type="button"
                                                onClick={() => handleGroupSelect(group.id)}
                                                className={`px-3 py-1 rounded-full text-sm hover:bg-opacity-80 transition-colors ${isUnicornTheme ? 'bg-blue-100 text-blue-800' : 'bg-blue-900 text-blue-300'}`}
                                            >
                                                {group.name} ({group.count})
                                            </button>
                                        ))}
                                    </div>

                                    <div className={`border rounded-lg p-3 max-h-40 overflow-y-auto transition-colors duration-500 ${isUnicornTheme ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700'}`}>
                                        {parents.map(parent => (
                                            <div key={parent.id} className="flex items-center mb-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedParents.includes(parent.id)}
                                                    onChange={() => handleParentSelect(parent.id)}
                                                    className={`mr-2 h-4 w-4 transition-colors duration-500 ${isUnicornTheme ? 'text-green-600 focus:ring-green-500' : 'text-green-400 focus:ring-green-400'}`}
                                                />
                                                <span className={`text-sm ${textColor}`}>
                                                    {parent.name} ({parent.child})
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${isUnicornTheme ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:from-pink-500 hover:via-purple-500 hover:to-blue-500' : 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white hover:from-blue-600 hover:via-purple-700 hover:to-pink-600'}`}
                                >
                                    📤 Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'parents' && (
                    <div className={`${cardClasses} ${cardBgColor}`}>
                        <h3 className={`text-lg font-semibold mb-4 transition-colors duration-500 ${subHeadingColor}`}>Parent Contact Directory</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className={`border-b-2 transition-colors duration-500 ${isUnicornTheme ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-700'}`}>
                                        <th className={`px-4 py-2 text-left ${isUnicornTheme ? 'text-gray-800' : 'text-gray-100'}`}>Parent Name</th>
                                        <th className={`px-4 py-2 text-left ${isUnicornTheme ? 'text-gray-800' : 'text-gray-100'}`}>Child Name</th>
                                        <th className={`px-4 py-2 text-left ${isUnicornTheme ? 'text-gray-800' : 'text-gray-100'}`}>Phone Number</th>
                                        <th className={`px-4 py-2 text-left ${isUnicornTheme ? 'text-gray-800' : 'text-gray-100'}`}>Last Contact</th>
                                        <th className={`px-4 py-2 text-left ${isUnicornTheme ? 'text-gray-800' : 'text-gray-100'}`}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parents.map(parent => (
                                        <tr key={parent.id} className={`border-b transition-colors duration-500 ${isUnicornTheme ? 'border-gray-100 hover:bg-gray-50' : 'border-gray-800 hover:bg-gray-700'}`}>
                                            <td className={`px-4 py-2 ${textColor}`}>{parent.name}</td>
                                            <td className={`px-4 py-2 ${textColor}`}>{parent.child}</td>
                                            <td className={`px-4 py-2 ${textColor}`}>{parent.phone}</td>
                                            <td className={`px-4 py-2 ${textColor}`}>{parent.lastContact}</td>
                                            <td className="px-4 py-2">
                                                <button className={`mr-3 transition-colors duration-500 ${isUnicornTheme ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-200'}`}>📞 Call</button>
                                                <button className={`transition-colors duration-500 ${isUnicornTheme ? 'text-green-600 hover:text-green-800' : 'text-green-400 hover:text-green-200'}`}>💬 Message</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'templates' && (
                    <div className={`${cardClasses} ${cardBgColor}`}>
                        <h3 className={`text-lg font-semibold mb-4 transition-colors duration-500 ${subHeadingColor}`}>Message Templates</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                {
                                    title: 'Attendance Reminder',
                                    content: 'Dear parent, please ensure your child attends Anganwadi regularly for continuous learning and nutrition.',
                                    category: 'reminder'
                                },
                                {
                                    title: 'Vaccination Due',
                                    content: 'Reminder: Your child is due for vaccination. Please visit the Anganwadi center this week.',
                                    category: 'vaccination'
                                },
                                {
                                    title: 'Parent-Teacher Meeting',
                                    content: 'We are conducting a parent-teacher meeting on [date]. Please attend to discuss your child progress.',
                                    category: 'event'
                                },
                                {
                                    title: 'Nutrition Tips',
                                    content: 'Tip: Include more green vegetables and fruits in your child diet for better growth and immunity.',
                                    category: 'nutrition'
                                }
                            ].map((template, index) => (
                                <div key={index} className={`border rounded-lg p-4 cursor-pointer transition-colors duration-500 ${isUnicornTheme ? 'border-gray-200 hover:bg-gray-50' : 'border-gray-700 hover:bg-gray-700'}`}>
                                    <h4 className={`font-semibold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-800' : 'text-gray-100'}`}>{template.title}</h4>
                                    <p className={`text-sm mb-3 ${textColor}`}>{template.content}</p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(template.category)}`}>
                                        {template.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Communication Tips */}
                <div className={`mt-8 p-6 rounded-lg shadow-md border transition-all duration-500 ${isUnicornTheme ? 'bg-pink-50 border-pink-200' : 'bg-pink-900 border-pink-800'}`}>
                    <h4 className={`font-semibold mb-3 transition-colors duration-500 ${isUnicornTheme ? 'text-pink-800' : 'text-pink-300'}`}>💡 Effective Communication Tips</h4>
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm transition-colors duration-500 ${isUnicornTheme ? 'text-pink-600' : 'text-pink-400'}`}>
                        <div>
                            <h5 className={`font-medium mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-pink-700' : 'text-pink-300'}`}>Best Practices:</h5>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Use simple, clear language that parents can understand</li>
                                <li>Send reminders 2-3 days before important events</li>
                                <li>Use local language (Tamil) for better comprehension</li>
                                <li>Include specific dates and times</li>
                                <li>Personalize messages when possible</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className={`font-medium mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-pink-700' : 'text-pink-300'}`}>Communication Channels:</h5>
                            <ul className="list-disc list-inside space-y-1">
                                <li>SMS messages for quick reminders</li>
                                <li>WhatsApp for group announcements</li>
                                <li>Phone calls for urgent matters</li>
                                <li>In-person meetings for detailed discussions</li>
                                <li>Notice board for general information</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentAwareness;