import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Functions and data moved outside the component to prevent re-creation on re-render
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

const playschoolAdminData = {
    username: 'admin123',
    employeeId: '00001',
    password: 'Password@123',
};
const parentData = {
    studentName: 'Ramu',
    dob: '2020-01-15',
    password: 'Password@123',
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

// Sub-component for Admin Login form
const AdminLogin = ({ setIsLoggedIn, isUnicornTheme }) => {
    const [username, setUsername] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [staticCaptcha, setStaticCaptcha] = useState(generateCaptcha());
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleCaptchaRefresh = () => {
        setStaticCaptcha(generateCaptcha());
        setCaptcha('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!/^\d{5}$/.test(employeeId)) {
            setErrorMessage("Employee ID must be a 5-digit number.");
            return;
        }

        if (captcha.toLowerCase() !== staticCaptcha.toLowerCase()) {
            setErrorMessage("Incorrect Captcha. Please try again.");
            handleCaptchaRefresh();
            return;
        }

        if (username !== playschoolAdminData.username || employeeId !== playschoolAdminData.employeeId || password !== playschoolAdminData.password) {
            setErrorMessage("Invalid username, employee ID, or password. Please check your credentials.");
            return;
        }

        setIsLoggedIn(true);
        navigate('/admin-dashboard');
    };

    return (
        <div className={`max-w-md w-full p-8 rounded-3xl shadow-2xl relative z-10 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 ${isUnicornTheme ? 'bg-white/50' : 'bg-gray-800/50 text-white'}`}>
            <h2 className={`text-3xl font-extrabold text-center mb-2 drop-shadow-md transition-colors duration-500 ${isUnicornTheme ? 'text-purple-800' : 'text-yellow-200'}`}>Playschool Admin</h2>
            <p className={`text-center mb-8 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-300'}`}>Sign in to your account</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-200'}`} htmlFor="username">Username</label>
                    <input
                        className={`shadow-inner appearance-none border-2 border-transparent rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'text-gray-700 bg-white focus:ring-pink-300' : 'text-white bg-gray-700 focus:ring-purple-500'}`}
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-200'}`} htmlFor="employeeId">Employee ID</label>
                    <input
                        className={`shadow-inner appearance-none border-2 border-transparent rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'text-gray-700 bg-white focus:ring-pink-300' : 'text-white bg-gray-700 focus:ring-purple-500'}`}
                        id="employeeId"
                        type="tel"
                        placeholder="Enter your 5-digit employee ID"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value.replace(/\D/g, '').slice(0, 5))}
                        required
                    />
                </div>
                <div>
                    <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-200'}`} htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            className={`shadow-inner appearance-none border-2 border-transparent rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'text-gray-700 bg-white focus:ring-pink-300' : 'text-white bg-gray-700 focus:ring-purple-500'}`}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-gray-100'}`}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.577 3.01 9.964 7.822a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.577-3.01-9.964-7.822z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div>
                    <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-200'}`} htmlFor="captcha">Captcha Code</label>
                    <div className="flex items-center space-x-4 mb-2">
                        <div className={`flex-1 font-extrabold text-lg text-center py-3 rounded-lg border-2 select-none tracking-widest drop-shadow-sm transition-colors duration-500 ${isUnicornTheme ? 'bg-white/50 text-purple-800 border-purple-200' : 'bg-gray-700/50 text-yellow-200 border-purple-800'}`}>
                            {staticCaptcha}
                        </div>
                        <button type="button" onClick={handleCaptchaRefresh} className={`p-3 rounded-lg transition-colors duration-500 ${isUnicornTheme ? 'bg-white/50 hover:bg-white/70 text-purple-700' : 'bg-gray-700/50 hover:bg-gray-700/70 text-yellow-300'}`} aria-label="Refresh Captcha">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356-2A8.001 8.001 0 004 15.54a8.001 8.001 0 0015.356-2m-1.879-6l-2.658 2.658A4 4 0 1114 13.5l1.658-1.658a2 2 0 002.828 0" />
                            </svg>
                        </button>
                        <button type="button" onClick={() => speakCaptcha(staticCaptcha)} className={`p-3 rounded-lg transition-colors duration-500 ${isUnicornTheme ? 'bg-white/50 hover:bg-white/70 text-purple-700' : 'bg-gray-700/50 hover:bg-gray-700/70 text-yellow-300'}`} aria-label="Speak Captcha">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0a2 2 0 002 2H5a2 2 0 00-2-2m0 0a2 2 0 012-2h12a2 2 0 012 2m0 0v2" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7" />
                            </svg>
                        </button>
                        <input
                            className={`flex-1 shadow-inner appearance-none border-2 border-transparent rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'text-gray-700 bg-white focus:ring-pink-300' : 'text-white bg-gray-700 focus:ring-purple-500'}`}
                            id="captcha"
                            type="text"
                            placeholder="Enter Captcha"
                            value={captcha}
                            onChange={(e) => setCaptcha(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className={`w-full font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105 shadow-lg ${isUnicornTheme ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:from-pink-500 hover:via-purple-500 hover:to-blue-500' : 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white hover:from-blue-600 hover:via-purple-700 hover:to-pink-600'}`}
                        type="submit"
                    >
                        Sign In as Admin
                    </button>
                </div>
            </form>
            <AlertMessage message={errorMessage} onClose={() => setErrorMessage('')} isUnicornTheme={isUnicornTheme} />
        </div>
    );
};

// Sub-component for Parent Login form
const ParentLogin = ({ setIsLoggedIn, isUnicornTheme }) => {
    const [studentName, setStudentName] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [staticCaptcha, setStaticCaptcha] = useState(generateCaptcha());
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleCaptchaRefresh = () => {
        setStaticCaptcha(generateCaptcha());
        setCaptcha('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (captcha.toLowerCase() !== staticCaptcha.toLowerCase()) {
            setErrorMessage("Incorrect Captcha. Please try again.");
            handleCaptchaRefresh();
            return;
        }

        if (studentName !== parentData.studentName || dob !== parentData.dob || password !== parentData.password) {
            setErrorMessage("Invalid student name, DOB, or password. Please check your credentials.");
            return;
        }

        setIsLoggedIn(true);
        navigate('/parent-dashboard');
    };

    return (
        <div className={`max-w-md w-full p-8 rounded-3xl shadow-2xl relative z-10 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 ${isUnicornTheme ? 'bg-white/50' : 'bg-gray-800/50 text-white'}`}>
            <h2 className={`text-3xl font-extrabold text-center mb-2 drop-shadow-md transition-colors duration-500 ${isUnicornTheme ? 'text-purple-800' : 'text-yellow-200'}`}>Parent</h2>
            <p className={`text-center mb-8 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-300'}`}>Sign in to your account</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-200'}`} htmlFor="studentName">Student Name</label>
                    <input
                        className={`shadow-inner appearance-none border-2 border-transparent rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'text-gray-700 bg-white focus:ring-pink-300' : 'text-white bg-gray-700 focus:ring-purple-500'}`}
                        id="studentName"
                        type="text"
                        placeholder="Enter your child's name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-200'}`} htmlFor="dob">Date of Birth (Student)</label>
                    <input
                        className={`shadow-inner appearance-none border-2 border-transparent rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'text-gray-700 bg-white focus:ring-pink-300' : 'text-white bg-gray-700 focus:ring-purple-500'}`}
                        id="dob"
                        type="date"
                        placeholder="Enter child's DOB"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-200'}`} htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            className={`shadow-inner appearance-none border-2 border-transparent rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'text-gray-700 bg-white focus:ring-pink-300' : 'text-white bg-gray-700 focus:ring-purple-500'}`}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-gray-100'}`}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.577 3.01 9.964 7.822a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.577-3.01-9.964-7.822z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div>
                    <label className={`block text-sm font-bold mb-2 transition-colors duration-500 ${isUnicornTheme ? 'text-gray-700' : 'text-gray-200'}`} htmlFor="captcha">Captcha Code</label>
                    <div className="flex items-center space-x-4 mb-2">
                        <div className={`flex-1 font-extrabold text-lg text-center py-3 rounded-lg border-2 select-none tracking-widest drop-shadow-sm transition-colors duration-500 ${isUnicornTheme ? 'bg-white/50 text-purple-800 border-purple-200' : 'bg-gray-700/50 text-yellow-200 border-purple-800'}`}>
                            {staticCaptcha}
                        </div>
                        <button type="button" onClick={handleCaptchaRefresh} className={`p-3 rounded-lg transition-colors duration-500 ${isUnicornTheme ? 'bg-white/50 hover:bg-white/70 text-purple-700' : 'bg-gray-700/50 hover:bg-gray-700/70 text-yellow-300'}`} aria-label="Refresh Captcha">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356-2A8.001 8.001 0 004 15.54a8.001 8.001 0 0015.356-2m-1.879-6l-2.658 2.658A4 4 0 1114 13.5l1.658-1.658a2 2 0 002.828 0" />
                            </svg>
                        </button>
                        <button type="button" onClick={() => speakCaptcha(staticCaptcha)} className={`p-3 rounded-lg transition-colors duration-500 ${isUnicornTheme ? 'bg-white/50 hover:bg-white/70 text-purple-700' : 'bg-gray-700/50 hover:bg-gray-700/70 text-yellow-300'}`} aria-label="Speak Captcha">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0a2 2 0 002 2H5a2 2 0 00-2-2m0 0a2 2 0 012-2h12a2 2 0 012 2m0 0v2" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7" />
                            </svg>
                        </button>
                        <input
                            className={`flex-1 shadow-inner appearance-none border-2 border-transparent rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-4 transition-all duration-300 ${isUnicornTheme ? 'text-gray-700 bg-white focus:ring-pink-300' : 'text-white bg-gray-700 focus:ring-purple-500'}`}
                            id="captcha"
                            type="text"
                            placeholder="Enter Captcha"
                            value={captcha}
                            onChange={(e) => setCaptcha(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className={`w-full font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105 shadow-lg ${isUnicornTheme ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:from-pink-500 hover:via-purple-500 hover:to-blue-500' : 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white hover:from-blue-600 hover:via-purple-700 hover:to-pink-600'}`}
                        type="submit"
                    >
                        Sign In as Parent
                    </button>
                </div>
            </form>
            <AlertMessage message={errorMessage} onClose={() => setErrorMessage('')} isUnicornTheme={isUnicornTheme} />
        </div>
    );
};

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

// Main Login Component
const Login = ({ setIsLoggedIn, theme }) => {
    const [selectedRole, setSelectedRole] = useState('admin');
    const isUnicornTheme = theme === 'unicorn';
    const bgColor = isUnicornTheme ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100' : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-1000 ${bgColor}`}>
            <AnimatedBackground isUnicornTheme={isUnicornTheme} />
            
            <div className="relative z-10 w-full flex flex-col items-center">
                {/* Role Switcher with Themed Styling */}
                <div className={`max-w-md w-full flex justify-center mb-6 backdrop-blur-sm rounded-3xl p-2 shadow-inner transition-all duration-300 ${isUnicornTheme ? 'bg-white/50' : 'bg-gray-800/50'}`}>
                    <button
                        className={`flex-1 py-3 px-4 rounded-2xl text-lg font-bold transition-all duration-300 transform drop-shadow-sm ${selectedRole === 'admin' ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg scale-105' : `hover:bg-white/50 ${isUnicornTheme ? 'text-gray-600 hover:text-purple-700' : 'text-gray-200 hover:text-purple-300'}`}`}
                        onClick={() => setSelectedRole('admin')}
                        type="button"
                    >
                        Playschool Admin
                    </button>
                    <button
                        className={`flex-1 py-3 px-4 rounded-2xl text-lg font-bold transition-all duration-300 transform drop-shadow-sm ${selectedRole === 'parent' ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg scale-105' : `hover:bg-white/50 ${isUnicornTheme ? 'text-gray-600 hover:text-purple-700' : 'text-gray-200 hover:text-purple-300'}`}`}
                        onClick={() => setSelectedRole('parent')}
                        type="button"
                    >
                        Parent
                    </button>
                </div>

                {selectedRole === 'admin' ? <AdminLogin setIsLoggedIn={setIsLoggedIn} isUnicornTheme={isUnicornTheme} /> : <ParentLogin setIsLoggedIn={setIsLoggedIn} isUnicornTheme={isUnicornTheme} />}

                <div className="mt-6 text-center text-sm">
                    <p className={`transition-colors duration-500 ${isUnicornTheme ? 'text-gray-600' : 'text-gray-300'}`}>
                        New User?{' '}
                        <Link to="/register" className={`font-bold transition-colors duration-500 ${isUnicornTheme ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-200'}`}>
                            Register here
                        </Link>
                    </p>
                </div>

                <div className={`mt-8 p-6 rounded-lg border-l-4 max-w-lg shadow-md transition-all duration-500 ${isUnicornTheme ? 'bg-blue-50 border-blue-400' : 'bg-gray-800 border-gray-700'}`}>
                    <p className={`text-sm text-center font-medium transition-colors duration-500 ${isUnicornTheme ? 'text-blue-800' : 'text-gray-300'}`}>
                        <strong className="font-bold">Heads up:</strong> This is a demo. Simply fill in the details and click 'Sign In' to proceed!
                    </p>
                </div>
            </div>
            
            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .animate-float-slow {
                    animation: float 8s ease-in-out infinite;
                }
                .animate-float-medium {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-fast {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes bounce-message {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-message {
                    animation: bounce-message 3s ease-in-out infinite;
                }
                `}
            </style>
        </div>
    );
};

export default Login;
