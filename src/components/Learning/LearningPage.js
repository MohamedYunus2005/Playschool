import React, { useState, useEffect } from 'react';

// Functions moved outside the component to prevent re-creation on re-render
const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const speakCaptcha = (text) => {
    const utterance = new SpeechSynthesisUtterance(text.split('').join(' '));
    window.speechSynthesis.speak(utterance);
};

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
                    x
                </button>
            </div>
        </div>
    );
};

// Animated Background Component
const AnimatedBackground = ({ isUnicornTheme }) => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {isUnicornTheme ? (
                <>
                    {/* Floating Emojis and Graphics for Unicorn Theme */}
                    <span className="absolute text-4xl opacity-80 animate-float-slow" style={{ top: '10%', left: '15%' }}>🦄</span>
                    <span className="absolute text-3xl opacity-70 animate-float-medium" style={{ top: '25%', left: '80%' }}>🌈</span>
                    <span className="absolute text-2xl opacity-60 animate-float-fast" style={{ top: '60%', left: '40%' }}>✨</span>
                    <span className="absolute text-5xl opacity-80 animate-float-slow" style={{ top: '80%', left: '10%' }}>💖</span>
                    <span className="absolute text-3xl opacity-70 animate-float-medium" style={{ top: '45%', left: '60%' }}>🍬</span>
                    <span className="absolute text-4xl opacity-90 animate-float-fast" style={{ top: '5%', left: '50%' }}>🌟</span>
                    <span className="absolute text-3xl opacity-80 animate-float-slow" style={{ top: '70%', left: '75%' }}>🎈</span>
                    <span className="absolute text-xl opacity-60 animate-float-medium" style={{ top: '15%', left: '65%' }}>💖</span>
                    <span className="absolute text-2xl opacity-70 animate-float-fast" style={{ top: '35%', left: '25%' }}>🌈</span>
                    <span className="absolute text-3xl opacity-80 animate-float-slow" style={{ top: '55%', left: '85%' }}>✨</span>
                    <span className="absolute text-4xl opacity-70 animate-float-medium" style={{ top: '88%', left: '45%' }}>🦄</span>
                    {/* New emojis and animations added here */}
                    <span className="absolute text-3xl opacity-75 animate-float-fast animation-delay-1000" style={{ top: '10%', right: '10%' }}>🍭</span>
                    <span className="absolute text-2xl opacity-65 animate-float-slow animation-delay-2000" style={{ top: '30%', right: '25%' }}>🍬</span>
                    <span className="absolute text-4xl opacity-85 animate-float-medium animation-delay-3000" style={{ top: '50%', left: '10%' }}>🍨</span>
                    <span className="absolute text-xl opacity-70 animate-float-slow animation-delay-4000" style={{ top: '70%', right: '5%' }}>🍧</span>
                    <span className="absolute text-5xl opacity-90 animate-float-fast animation-delay-5000" style={{ top: '90%', left: '20%' }}>🍡</span>
                    <span className="absolute text-3xl opacity-80 animate-float-medium animation-delay-6000" style={{ top: '20%', left: '5%' }}>🎂</span>
                    <span className="absolute text-4xl opacity-75 animate-float-slow animation-delay-7000" style={{ top: '40%', right: '15%' }}>🍰</span>
                    <span className="absolute text-2xl opacity-65 animate-float-fast animation-delay-8000" style={{ top: '5%', left: '85%' }}>🧁</span>
                    <span className="absolute text-5xl opacity-85 animate-float-medium animation-delay-9000" style={{ top: '65%', left: '70%' }}>🍫</span>
                    <span className="absolute text-3xl opacity-90 animate-float-slow animation-delay-10000" style={{ top: '80%', right: '35%' }}>💗</span>
                    <span className="absolute text-2xl opacity-85 animate-float-fast animation-delay-11000" style={{ top: '5%', left: '5%' }}>💓</span>
                    <span className="absolute text-3xl opacity-70 animate-float-medium animation-delay-12000" style={{ top: '90%', left: '90%' }}>💖</span>
                    <span className="absolute text-xl opacity-60 animate-float-slow animation-delay-13000" style={{ top: '75%', right: '80%' }}>🌈</span>
                    <span className="absolute text-4xl opacity-80 animate-float-fast animation-delay-14000" style={{ top: '40%', left: '50%' }}>🌟</span>
                    <span className="absolute text-xl opacity-90 animate-float-medium animation-delay-15000" style={{ top: '20%', right: '50%' }}>❄</span>
                </>
            ) : (
                <>
                    {/* Floating Emojis and Graphics for Moon Theme */}
                    <span className="absolute text-3xl opacity-80 animate-float-slow" style={{ top: '15%', left: '30%' }}>🌌</span>
                    <span className="absolute text-4xl opacity-70 animate-float-medium" style={{ top: '40%', left: '10%' }}>🚀</span>
                    <span className="absolute text-2xl opacity-60 animate-float-fast" style={{ top: '50%', left: '80%' }}>🪐</span>
                    <span className="absolute text-5xl opacity-80 animate-float-slow" style={{ top: '85%', left: '60%' }}>⭐</span>
                    <span className="absolute text-3xl opacity-70 animate-float-medium" style={{ top: '20%', left: '70%' }}>🌠</span>
                    <span className="absolute text-4xl opacity-90 animate-float-fast" style={{ top: '75%', left: '30%' }}>🔭</span>
                    <span className="absolute text-3xl opacity-80 animate-float-medium" style={{ top: '60%', left: '5%' }}>👾</span>
                    <span className="absolute text-xl opacity-60 animate-float-slow" style={{ top: '30%', left: '55%' }}>🚀</span>
                    <span className="absolute text-2xl opacity-70 animate-float-medium" style={{ top: '70%', left: '20%' }}>🪐</span>
                    <span className="absolute text-3xl opacity-80 animate-float-fast" style={{ top: '95%', left: '75%' }}>⭐</span>
                    <span className="absolute text-4xl opacity-70 animate-float-slow" style={{ top: '5%', left: '5%' }}>🌌</span>
                    {/* New emojis and animations added here */}
                    <span className="absolute text-5xl opacity-90 animate-float-medium animation-delay-1000" style={{ top: '10%', right: '10%' }}>☄</span>
                    <span className="absolute text-4xl opacity-85 animate-float-slow animation-delay-2000" style={{ top: '30%', right: '25%' }}>🌠</span>
                    <span className="absolute text-3xl opacity-80 animate-float-fast animation-delay-3000" style={{ top: '50%', left: '15%' }}>🌜</span>
                    <span className="absolute text-2xl opacity-70 animate-float-medium animation-delay-4000" style={{ top: '70%', right: '5%' }}>✨</span>
                    <span className="absolute text-xl opacity-60 animate-float-slow animation-delay-5000" style={{ top: '90%', left: '20%' }}>🌟</span>
                    <span className="absolute text-5xl opacity-90 animate-float-fast animation-delay-6000" style={{ top: '20%', left: '5%' }}>💖</span>
                    <span className="absolute text-3xl opacity-85 animate-float-medium animation-delay-7000" style={{ top: '40%', right: '15%' }}>💗</span>
                    <span className="absolute text-4xl opacity-80 animate-float-slow animation-delay-8000" style={{ top: '5%', left: '85%' }}>💓</span>
                    <span className="absolute text-2xl opacity-75 animate-float-fast animation-delay-9000" style={{ top: '65%', left: '70%' }}>🌌</span>
                    <span className="absolute text-xl opacity-65 animate-float-medium animation-delay-10000" style={{ top: '80%', right: '35%' }}>🚀</span>
                    <span className="absolute text-3xl opacity-90 animate-float-slow animation-delay-11000" style={{ top: '5%', left: '5%' }}>🪐</span>
                    <span className="absolute text-4xl opacity-80 animate-float-fast animation-delay-12000" style={{ top: '90%', left: '90%' }}>☄</span>
                    <span className="absolute text-5xl opacity-70 animate-float-medium animation-delay-13000" style={{ top: '75%', right: '80%' }}>🌠</span>
                    <span className="absolute text-3xl opacity-95 animate-float-slow animation-delay-14000" style={{ top: '40%', left: '50%' }}>🌜</span>
                    <span className="absolute text-2xl opacity-85 animate-float-fast animation-delay-15000" style={{ top: '20%', right: '50%' }}>✨</span>
                </>
            )}
            {/* Themed background blobs for both light and dark modes */}
            {isUnicornTheme ? (
                <>
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </>
            ) : (
                <>
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob"></div>
                    <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
                </>
            )}
        </div>
    );
};

const LearningActivities = ({ theme }) => {
    const [selectedChild, setSelectedChild] = useState('Kavya M.');
    const [activeSubject, setActiveSubject] = useState('english');
    const [newActivity, setNewActivity] = useState({
        date: new Date().toISOString().split('T')[0],
        topic: '',
        notes: '',
        completed: true
    });
    const [alertMessage, setAlertMessage] = useState('');

    const isUnicornTheme = theme === 'unicorn';
    const bgColor = isUnicornTheme ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100' : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';

    const cardClasses = `p-6 rounded-3xl shadow-lg transition-all duration-500`;
    const cardBgColor = isUnicornTheme ? 'bg-white/50 backdrop-blur-sm' : 'bg-gray-800/50 backdrop-blur-sm text-white';
    const textColor = isUnicornTheme ? 'text-gray-700' : 'text-gray-300';
    const headerColor = isUnicornTheme ? 'text-purple-800' : 'text-yellow-200';
    const subHeadingColor = isUnicornTheme ? 'text-green-700' : 'text-green-300';
    const buttonBaseClasses = `px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105`;

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
        setAlertMessage('');

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

        setAlertMessage('Learning activity added successfully!');
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

    const subjectColors = {
        english: { light: 'blue', dark: 'blue' },
        tamil: { light: 'red', dark: 'pink' },
        maths: { light: 'green', dark: 'green' },
    };

    return (
        <div className={`min-h-screen p-8 transition-all duration-1000 ${bgColor}`}>
            <AnimatedBackground isUnicornTheme={isUnicornTheme} />
            <div className="relative z-10 container mx-auto px-4 py-8">
                <h2 className={`text-4xl font-extrabold text-center mb-6 drop-shadow-md transition-colors duration-500 ${headerColor}`}>
                    📚 Learning Activities
                </h2>

                {/* Child Selection and Progress Summary */}
                <div className={`${cardClasses} ${cardBgColor}`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                            <label className={`block text-sm font-medium mb-1 ${textColor}`}>Select Child:</label>
                            <select
                                value={selectedChild}
                                onChange={(e) => setSelectedChild(e.target.value)}
                                className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'bg-white border-gray-300 text-gray-700 focus:ring-green-300' : 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500'}`}
                            >
                                {children.map(child => (
                                    <option key={child} value={child} className={isUnicornTheme ? 'text-gray-700' : 'text-white'}>
                                        {child}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className={`text-lg font-bold transition-colors duration-500 ${isUnicornTheme ? 'text-blue-600' : 'text-blue-400'}`}>
                                    {getProgressPercentage(selectedChild, 'english')}%
                                </div>
                                <div className={`text-sm transition-colors duration-500 ${textColor}`}>English</div>
                            </div>
                            <div>
                                <div className={`text-lg font-bold transition-colors duration-500 ${isUnicornTheme ? 'text-red-600' : 'text-pink-400'}`}>
                                    {getProgressPercentage(selectedChild, 'tamil')}%
                                </div>
                                <div className={`text-sm transition-colors duration-500 ${textColor}`}>Tamil</div>
                            </div>
                            <div>
                                <div className={`text-lg font-bold transition-colors duration-500 ${isUnicornTheme ? 'text-green-600' : 'text-green-400'}`}>
                                    {getProgressPercentage(selectedChild, 'maths')}%
                                </div>
                                <div className={`text-sm transition-colors duration-500 ${textColor}`}>Maths</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subject Navigation */}
                <div className={`${cardClasses} ${cardBgColor} p-4 mt-6`}>
                    <div className="flex space-x-1">
                        {[
                            { id: 'english', label: 'English', color: 'blue' },
                            { id: 'tamil', label: 'Tamil', color: 'red' },
                            { id: 'maths', label: 'Mathematics', color: 'green' }
                        ].map(subject => (
                            <button
                                key={subject.id}
                                onClick={() => setActiveSubject(subject.id)}
                                className={`flex-1 py-2 px-4 rounded-full font-medium transition-colors ${activeSubject === subject.id
                                    ? `text-white shadow-md ${isUnicornTheme ? `bg-gradient-to-r from-${subject.color}-500 to-${subject.color}-600` : `bg-gradient-to-r from-gray-700 to-gray-900`}`
                                    : `hover:bg-opacity-80 ${isUnicornTheme ? `bg-${subject.color}-100 text-${subject.color}-800 hover:bg-${subject.color}-200` : `bg-gray-700 text-white hover:bg-gray-600`}`
                                    }`}
                            >
                                {subject.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Activity List */}
                    <div className={`${cardClasses} ${cardBgColor}`}>
                        <h3 className={`text-lg font-semibold mb-4 transition-colors duration-500 ${subHeadingColor}`}>
                            {activeSubject.toUpperCase()} Activities for {selectedChild}
                        </h3>

                        {currentActivities.length === 0 ? (
                            <div className={`text-center py-8 transition-colors duration-500 ${textColor}`}>
                                <div className="text-4xl mb-2">📝</div>
                                <p>No activities recorded yet.</p>
                                <p className="text-sm">Add the first activity using the form!</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {currentActivities.map((activity, index) => (
                                    <div key={index} className={`p-3 rounded-lg transition-all duration-300 ${activity.completed
                                        ? isUnicornTheme ? 'border-green-200 bg-green-50' : 'border-green-900 bg-green-800'
                                        : isUnicornTheme ? 'border-yellow-200 bg-yellow-50' : 'border-yellow-900 bg-yellow-800'
                                        }`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={activity.completed}
                                                        onChange={() => toggleActivityCompletion(selectedChild, activeSubject, index)}
                                                        className={`mr-2 h-4 w-4 rounded-full transition-all duration-300 ${isUnicornTheme ? 'text-green-600 focus:ring-green-500' : 'text-green-400 focus:ring-green-400'}`}
                                                    />
                                                    <span className={`font-medium transition-colors duration-500 ${activity.completed
                                                        ? isUnicornTheme ? 'line-through text-green-700' : 'line-through text-green-300'
                                                        : isUnicornTheme ? 'text-gray-700' : 'text-gray-200'
                                                        }`}>
                                                        {activity.topic}
                                                    </span>
                                                </div>
                                                <p className={`text-sm mb-1 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-400'}`}>{activity.notes}</p>
                                                <span className={`text-xs transition-colors duration-500 ${isUnicornTheme ? 'text-gray-500' : 'text-gray-500'}`}>{activity.date}</span>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-500 ${activity.completed
                                                ? isUnicornTheme ? 'bg-green-200 text-green-800' : 'bg-green-700 text-white'
                                                : isUnicornTheme ? 'bg-yellow-200 text-yellow-800' : 'bg-yellow-700 text-white'
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
                    <div className={`${cardClasses} ${cardBgColor}`}>
                        <h3 className={`text-lg font-semibold mb-4 transition-colors duration-500 ${subHeadingColor}`}>Add New Activity</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Date:</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={newActivity.date}
                                    onChange={handleInputChange}
                                    className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'bg-white border-gray-300 text-gray-700 focus:ring-green-300' : 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Topic/Activity:</label>
                                <input
                                    type="text"
                                    name="topic"
                                    value={newActivity.topic}
                                    onChange={handleInputChange}
                                    className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'bg-white border-gray-300 text-gray-700 focus:ring-green-300' : 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500'}`}
                                    placeholder="e.g., Alphabet A-D, Numbers 1-10"
                                    required
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Notes/Observations:</label>
                                <textarea
                                    name="notes"
                                    value={newActivity.notes}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'bg-white border-gray-300 text-gray-700 focus:ring-green-300' : 'bg-gray-700 border-gray-600 text-white focus:ring-purple-500'}`}
                                    placeholder="How did the child perform? What needs improvement?"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="completed"
                                    checked={newActivity.completed}
                                    onChange={handleCheckboxChange}
                                    className={`h-4 w-4 rounded-full transition-all duration-300 ${isUnicornTheme ? 'text-green-600 focus:ring-green-500' : 'text-green-400 focus:ring-green-400'}`}
                                />
                                <label className={`ml-2 text-sm ${textColor}`}>Mark as completed</label>
                            </div>

                            <button
                                type="submit"
                                className={`w-full ${buttonBaseClasses} bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 shadow-lg`}
                            >
                                Add Activity
                            </button>
                        </form>
                    </div>
                </div>

                {/* Learning Guidelines */}
                <div className={`mt-8 p-6 rounded-lg shadow-md border transition-all duration-500 ${isUnicornTheme ? 'bg-blue-50 border-blue-200' : 'bg-blue-900 border-blue-800'}`}>
                    <h4 className={`font-semibold mb-3 transition-colors duration-500 ${isUnicornTheme ? 'text-blue-800' : 'text-blue-300'}`}>🎯 Early Learning Guidelines (3-6 years)</h4>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 text-sm transition-colors duration-500 ${isUnicornTheme ? 'text-blue-600' : 'text-blue-400'}`}>
                        <div>
                            <h5 className={`font-medium mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-blue-700' : 'text-blue-300'}`}>English Foundation:</h5>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Letter recognition (A-Z)</li>
                                <li>Phonics sounds</li>
                                <li>Simple word formation</li>
                                <li>Basic vocabulary building</li>
                                <li>Listening comprehension</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className={`font-medium mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-blue-700' : 'text-blue-300'}`}>Tamil Foundation:</h5>
                            <ul className="list-disc list-inside space-y-1">
                                <li>உயிர் எழுத்துக்கள்</li>
                                <li>மெய் எழுத்துக்கள்</li>
                                <li>உயிர்மெய் எழுத்துக்கள்</li>
                                <li>Basic word recognition</li>
                                <li>Cultural stories & rhymes</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className={`font-medium mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-blue-700' : 'text-blue-300'}`}>Mathematics Foundation:</h5>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Number recognition 1-50</li>
                                <li>Counting objects</li>
                                <li>Basic shapes & patterns</li>
                                <li>Size comparison</li>
                                <li>Simple addition concepts</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <AlertMessage message={alertMessage} onClose={() => setAlertMessage('')} isUnicornTheme={isUnicornTheme} />
            </div>
        </div>
    );
};

export default LearningActivities;
