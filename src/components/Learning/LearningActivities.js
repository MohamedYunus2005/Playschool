import React, { useState } from 'react';

const LearningActivities = () => {
    const [selectedChild, setSelectedChild] = useState('Kavya M.');
    const [activeSubject, setActiveSubject] = useState('english');
    const [newActivity, setNewActivity] = useState({
        date: new Date().toISOString().split('T')[0],
        topic: '',
        notes: '',
        completed: true
    });

    // Sample learning data - will come from API later
    const [learningData, setLearningData] = useState({
        'Kavya M.': {
            english: [
                { date: '2024-05-01', topic: 'Alphabet A-D', notes: 'Recognizes letters A, B, C, D', completed: true },
                { date: '2024-05-08', topic: 'Alphabet E-H', notes: 'Learning to write E, F, G', completed: true },
                { date: '2024-05-15', topic: 'Simple Words', notes: 'Cat, Bat, Mat recognition', completed: false }
            ],
            tamil: [
                { date: '2024-05-02', topic: 'உயிர் எழுத்துக்கள்', notes: 'அ, ஆ, இ, ஈ recognition', completed: true },
                { date: '2024-05-09', topic: 'மெய் எழுத்துக்கள்', notes: 'க், ங், ச் practice', completed: true }
            ],
            maths: [
                { date: '2024-05-03', topic: 'Numbers 1-10', notes: 'Counting objects 1-10', completed: true },
                { date: '2024-05-10', topic: 'Shapes', notes: 'Circle, Square, Triangle identification', completed: true },
                { date: '2024-05-17', topic: 'Counting 11-20', notes: 'Number writing practice', completed: false }
            ]
        },
        'Arjun S.': {
            english: [
                { date: '2024-05-01', topic: 'Alphabet Recognition', notes: 'A-Z capital letters', completed: true }
            ],
            tamil: [
                { date: '2024-05-02', topic: 'Basic Tamil Letters', notes: 'அ to ஔ introduction', completed: true }
            ],
            maths: [
                { date: '2024-05-03', topic: 'Numbers 1-5', notes: 'Counting fingers', completed: true }
            ]
        }
    });

    const children = ['Kavya M.', 'Arjun S.', 'Divya P.', 'Siddharth R.', 'Priya K.'];

    const handleInputChange = (e) => {
        setNewActivity({
            ...newActivity,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = (e) => {
        setNewActivity({
            ...newActivity,
            [e.target.name]: e.target.checked
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newActivity.topic.trim()) return;

        const updatedData = { ...learningData };
        if (!updatedData[selectedChild]) {
            updatedData[selectedChild] = { english: [], tamil: [], maths: [] };
        }
        if (!updatedData[selectedChild][activeSubject]) {
            updatedData[selectedChild][activeSubject] = [];
        }

        updatedData[selectedChild][activeSubject].unshift({
            ...newActivity,
            id: Date.now()
        });

        setLearningData(updatedData);
        setNewActivity({
            date: new Date().toISOString().split('T')[0],
            topic: '',
            notes: '',
            completed: true
        });

        alert('Learning activity added successfully!');
    };

    const toggleActivityCompletion = (child, subject, index) => {
        const updatedData = { ...learningData };
        updatedData[child][subject][index].completed =
            !updatedData[child][subject][index].completed;
        setLearningData(updatedData);
    };

    const getProgressPercentage = (child, subject) => {
        const activities = learningData[child]?.[subject] || [];
        if (activities.length === 0) return 0;
        const completed = activities.filter(a => a.completed).length;
        return Math.round((completed / activities.length) * 100);
    };

    const currentActivities = learningData[selectedChild]?.[activeSubject] || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6">📚 Learning Activities</h2>

            {/* Child Selection and Progress Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Child:</label>
                        <select
                            value={selectedChild}
                            onChange={(e) => setSelectedChild(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            {children.map(child => (
                                <option key={child} value={child}>{child}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-lg font-bold text-blue-600">{getProgressPercentage(selectedChild, 'english')}%</div>
                            <div className="text-sm text-gray-600">English</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-red-600">{getProgressPercentage(selectedChild, 'tamil')}%</div>
                            <div className="text-sm text-gray-600">Tamil</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-green-600">{getProgressPercentage(selectedChild, 'maths')}%</div>
                            <div className="text-sm text-gray-600">Maths</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subject Navigation */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex space-x-1">
                    {[
                        { id: 'english', label: 'English', color: 'blue' },
                        { id: 'tamil', label: 'Tamil', color: 'red' },
                        { id: 'maths', label: 'Mathematics', color: 'green' }
                    ].map(subject => (
                        <button
                            key={subject.id}
                            onClick={() => setActiveSubject(subject.id)}
                            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${activeSubject === subject.id
                                    ? `bg-${subject.color}-600 text-white`
                                    : `bg-${subject.color}-100 text-${subject.color}-800 hover:bg-${subject.color}-200`
                                }`}
                        >
                            {subject.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">
                        {activeSubject.toUpperCase()} Activities for {selectedChild}
                    </h3>

                    {currentActivities.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-2">📝</div>
                            <p>No activities recorded yet.</p>
                            <p className="text-sm">Add the first activity using the form!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {currentActivities.map((activity, index) => (
                                <div key={index} className={`p-3 border rounded-lg ${activity.completed ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'
                                    }`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center mb-1">
                                                <input
                                                    type="checkbox"
                                                    checked={activity.completed}
                                                    onChange={() => toggleActivityCompletion(selectedChild, activeSubject, index)}
                                                    className="mr-2 h-4 w-4 text-green-600"
                                                />
                                                <span className={`font-medium ${activity.completed ? 'line-through text-green-700' : 'text-gray-700'}`}>
                                                    {activity.topic}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">{activity.notes}</p>
                                            <span className="text-xs text-gray-500">{activity.date}</span>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${activity.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {activity.completed ? 'Completed' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add New Activity Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Add New Activity</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={newActivity.date}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Topic/Activity:</label>
                            <input
                                type="text"
                                name="topic"
                                value={newActivity.topic}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="e.g., Alphabet A-D, Numbers 1-10"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes/Observations:</label>
                            <textarea
                                name="notes"
                                value={newActivity.notes}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="How did the child perform? What needs improvement?"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="completed"
                                checked={newActivity.completed}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500"
                            />
                            <label className="ml-2 text-sm text-gray-700">Mark as completed</label>
                        </div>

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline w-full"
                        >
                            Add Activity
                        </button>
                    </form>
                </div>
            </div>

            {/* Learning Guidelines */}
            <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">🎯 Early Learning Guidelines (3-6 years)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <h5 className="font-medium mb-2 text-blue-700">English Foundation:</h5>
                        <ul className="list-disc list-inside space-y-1 text-blue-600">
                            <li>Letter recognition (A-Z)</li>
                            <li>Phonics sounds</li>
                            <li>Simple word formation</li>
                            <li>Basic vocabulary building</li>
                            <li>Listening comprehension</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-medium mb-2 text-blue-700">Tamil Foundation:</h5>
                        <ul className="list-disc list-inside space-y-1 text-blue-600">
                            <li>உயிர் எழுத்துக்கள்</li>
                            <li>மெய் எழுத்துக்கள்</li>
                            <li>உயிர்மெய் எழுத்துக்கள்</li>
                            <li>Basic word recognition</li>
                            <li>Cultural stories & rhymes</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-medium mb-2 text-blue-700">Mathematics Foundation:</h5>
                        <ul className="list-disc list-inside space-y-1 text-blue-600">
                            <li>Number recognition 1-50</li>
                            <li>Counting objects</li>
                            <li>Basic shapes & patterns</li>
                            <li>Size comparison</li>
                            <li>Simple addition concepts</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningActivities;