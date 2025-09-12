import React, { useState } from 'react';

const ParentAwareness = () => {
    const [activeTab, setActiveTab] = useState('messages');
    const [selectedParents, setSelectedParents] = useState([]);
    const [newMessage, setNewMessage] = useState({
        title: '',
        content: '',
        category: 'reminder',
        urgency: 'normal'
    });

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

        alert('Message sent successfully!');
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'high': return 'bg-red-100 text-red-800 border-red-300';
            case 'normal': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'low': return 'bg-gray-100 text-gray-800 border-gray-300';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'vaccination': return 'bg-orange-100 text-orange-800';
            case 'nutrition': return 'bg-green-100 text-green-800';
            case 'education': return 'bg-blue-100 text-blue-800';
            case 'reminder': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6">📢 Parent Awareness & Communication</h2>

            {/* Navigation Tabs */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex space-x-1">
                    {[
                        { id: 'messages', label: 'Messages', icon: '✉️' },
                        { id: 'parents', label: 'Parent Contacts', icon: '👨‍👩‍👧' },
                        { id: 'templates', label: 'Templates', icon: '📋' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${activeTab === tab.id
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'messages' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Message List */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Sent Messages</h3>
                        <div className="space-y-4">
                            {messages.map(message => (
                                <div key={message.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-lg">{message.title}</h4>
                                        <span className={`px-2 py-1 rounded text-xs ${getUrgencyColor(message.urgency)}`}>
                                            {message.urgency}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-3">{message.content}</p>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(message.category)}`}>
                                            {message.category}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Sent on: {message.date} • To: {message.sentTo.join(', ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* New Message Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Send New Message</h3>
                        <form onSubmit={handleSendMessage} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newMessage.title}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Important announcement..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message:</label>
                                <textarea
                                    name="content"
                                    value={newMessage.content}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Type your message here..."
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                                    <select
                                        name="category"
                                        value={newMessage.category}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="reminder">Reminder</option>
                                        <option value="vaccination">Vaccination</option>
                                        <option value="nutrition">Nutrition</option>
                                        <option value="education">Education</option>
                                        <option value="event">Event</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Urgency:</label>
                                    <select
                                        name="urgency"
                                        value={newMessage.urgency}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="normal">Normal</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Send To:</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {parentGroups.map(group => (
                                        <button
                                            key={group.id}
                                            type="button"
                                            onClick={() => handleGroupSelect(group.id)}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200"
                                        >
                                            {group.name} ({group.count})
                                        </button>
                                    ))}
                                </div>

                                <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                                    {parents.map(parent => (
                                        <div key={parent.id} className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedParents.includes(parent.id)}
                                                onChange={() => handleParentSelect(parent.id)}
                                                className="mr-2 h-4 w-4 text-green-600"
                                            />
                                            <span className="text-sm">
                                                {parent.name} ({parent.child})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline w-full"
                            >
                                📤 Send Message
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === 'parents' && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Parent Contact Directory</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 text-left">Parent Name</th>
                                    <th className="px-4 py-2 text-left">Child Name</th>
                                    <th className="px-4 py-2 text-left">Phone Number</th>
                                    <th className="px-4 py-2 text-left">Last Contact</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parents.map(parent => (
                                    <tr key={parent.id} className="border-b">
                                        <td className="px-4 py-2">{parent.name}</td>
                                        <td className="px-4 py-2">{parent.child}</td>
                                        <td className="px-4 py-2">{parent.phone}</td>
                                        <td className="px-4 py-2">{parent.lastContact}</td>
                                        <td className="px-4 py-2">
                                            <button className="text-blue-600 hover:text-blue-800 mr-3">📞 Call</button>
                                            <button className="text-green-600 hover:text-green-800">💬 Message</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'templates' && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Message Templates</h3>
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
                            <div key={index} className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                                <h4 className="font-semibold mb-2">{template.title}</h4>
                                <p className="text-sm text-gray-600 mb-3">{template.content}</p>
                                <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(template.category)}`}>
                                    {template.category}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Communication Tips */}
            <div className="mt-8 bg-pink-50 p-6 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-pink-800 mb-3">💡 Effective Communication Tips</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <h5 className="font-medium mb-2 text-pink-700">Best Practices:</h5>
                        <ul className="list-disc list-inside space-y-1 text-pink-600">
                            <li>Use simple, clear language that parents can understand</li>
                            <li>Send reminders 2-3 days before important events</li>
                            <li>Use local language (Tamil) for better comprehension</li>
                            <li>Include specific dates and times</li>
                            <li>Personalize messages when possible</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-medium mb-2 text-pink-700">Communication Channels:</h5>
                        <ul className="list-disc list-inside space-y-1 text-pink-600">
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
    );
};

export default ParentAwareness;