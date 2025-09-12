import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [selectedRole, setSelectedRole] = useState('anganwadi');
    const navigate = useNavigate();

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
        speechSynthesis.speak(utterance);
    };

    const anganwadiWorkerData = {
        username: 'worker123',
        aadhaarNumber: '123456789012',
        password: 'Password@123',
    };
    const parentData = {
        studentName: 'Ramu',
        aadhaarNumber: '987654321098',
        password: 'Password@123',
    };

    const WorkerLogin = () => {
        const [username, setUsername] = useState('');
        const [aadhaarNumber, setAadhaarNumber] = useState('');
        const [password, setPassword] = useState('');
        const [captcha, setCaptcha] = useState('');
        const [staticCaptcha, setStaticCaptcha] = useState(generateCaptcha());
        const [showAadhaar, setShowAadhaar] = useState(false);
        const [showPassword, setShowPassword] = useState(false);

        const handleCaptchaRefresh = () => {
            setStaticCaptcha(generateCaptcha());
            setCaptcha('');
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if (captcha !== staticCaptcha) {
                alert("Incorrect Captcha. Please try again.");
                handleCaptchaRefresh();
                return;
            }
            if (username !== anganwadiWorkerData.username || aadhaarNumber !== anganwadiWorkerData.aadhaarNumber || password !== anganwadiWorkerData.password) {
                alert("Invalid username, Aadhaar number, or password. Please check your credentials.");
                return;
            }
            console.log('Worker Login:', { username, aadhaarNumber, password });
            navigate('/admin-dashboard');
        };

        return (
            <div className="max-w-md w-full p-8 rounded-2xl shadow-2xl relative z-10 bg-white transform transition-transform duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center text-green-700 mb-2">Anganwadi Worker</h2>
                <p className="text-center text-gray-500 mb-8">Sign in to your account</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadhaarNumber">Aadhaar Number</label>
                        <div className="relative">
                            <input
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                                id="aadhaarNumber"
                                type={showAadhaar ? "text" : "password"}
                                placeholder="Enter your 12-digit Aadhaar number"
                                value={aadhaarNumber}
                                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowAadhaar(!showAadhaar)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                            >
                                {showAadhaar ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.577 3.01 9.964 7.822a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.577-3.01-9.964-7.822z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5a10.477 10.477 0 01-8.066-3.777M3.98 8.223a10.477 10.477 0 018.066-3.777c4.756 0 8.774 3.162 10.066 7.5-1.292 4.338-5.31 7.5-10.066 7.5a10.477 10.477 0 01-8.066-3.777M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
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
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.577 3.01 9.964 7.822a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.577-3.01-9.964-7.822z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5a10.477 10.477 0 01-8.066-3.777M3.98 8.223a10.477 10.477 0 018.066-3.777c4.756 0 8.774 3.162 10.066 7.5-1.292 4.338-5.31 7.5-10.066 7.5a10.477 10.477 0 01-8.066-3.777M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="captcha">Captcha Code</label>
                        <div className="flex items-center space-x-4 mb-2">
                            <div className="flex-1 bg-gray-200 text-gray-800 font-bold text-lg text-center py-3 rounded-lg border-2 border-gray-300 select-none tracking-widest">
                                {staticCaptcha}
                            </div>
                            <button type="button" onClick={handleCaptchaRefresh} className="p-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356-2A8.001 8.001 0 004 15.54a8.001 8.001 0 0015.356-2m-1.879-6l-2.658 2.658A4 4 0 1114 13.5l1.658-1.658a2 2 0 002.828 0" />
                                </svg>
                            </button>
                            <button type="button" onClick={() => speakCaptcha(staticCaptcha)} className="p-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0a2 2 0 002 2H5a2 2 0 00-2-2m0 0a2 2 0 012-2h12a2 2 0 012 2m0 0v2" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7" />
                                </svg>
                            </button>
                            <input
                                className="flex-1 shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
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
                            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105"
                            type="submit"
                        >
                            Sign In as Anganwadi Worker
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const ParentLogin = () => {
        const [studentName, setStudentName] = useState('');
        const [aadhaarNumber, setAadhaarNumber] = useState('');
        const [password, setPassword] = useState('');
        const [captcha, setCaptcha] = useState('');
        const [staticCaptcha, setStaticCaptcha] = useState(generateCaptcha());
        const [showAadhaar, setShowAadhaar] = useState(false);
        const [showPassword, setShowPassword] = useState(false);

        const handleCaptchaRefresh = () => {
            setStaticCaptcha(generateCaptcha());
            setCaptcha('');
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if (captcha !== staticCaptcha) {
                alert("Incorrect Captcha. Please try again.");
                handleCaptchaRefresh();
                return;
            }
            if (studentName !== parentData.studentName || aadhaarNumber !== parentData.aadhaarNumber || password !== parentData.password) {
                alert("Invalid student name, Aadhaar number, or password. Please check your credentials.");
                return;
            }
            console.log('Parent Login:', { studentName, aadhaarNumber, password });
            navigate('/parent-dashboard');
        };

        return (
            <div className="max-w-md w-full p-8 rounded-2xl shadow-2xl relative z-10 bg-white transform transition-transform duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">Parent</h2>
                <p className="text-center text-gray-500 mb-8">Sign in to your account</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentName">Student Name</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="studentName"
                            type="text"
                            placeholder="Enter your child's name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aadhaarNumber">Aadhaar Number</label>
                        <div className="relative">
                            <input
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                                id="aadhaarNumber"
                                type={showAadhaar ? "text" : "password"}
                                placeholder="Enter your 12-digit Aadhaar number"
                                value={aadhaarNumber}
                                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowAadhaar(!showAadhaar)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                            >
                                {showAadhaar ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.577 3.01 9.964 7.822a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.577-3.01-9.964-7.822z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5a10.477 10.477 0 01-8.066-3.777M3.98 8.223a10.477 10.477 0 018.066-3.777c4.756 0 8.774 3.162 10.066 7.5-1.292 4.338-5.31 7.5-10.066 7.5a10.477 10.477 0 01-8.066-3.777M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.577 3.01 9.964 7.822a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.577-3.01-9.964-7.822z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5a10.477 10.477 0 01-8.066-3.777M3.98 8.223a10.477 10.477 0 018.066-3.777c4.756 0 8.774 3.162 10.066 7.5-1.292 4.338-5.31 7.5-10.066 7.5a10.477 10.477 0 01-8.066-3.777M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="captcha">Captcha Code</label>
                        <div className="flex items-center space-x-4 mb-2">
                            <div className="flex-1 bg-gray-200 text-gray-800 font-bold text-lg text-center py-3 rounded-lg border-2 border-gray-300 select-none tracking-widest">
                                {staticCaptcha}
                            </div>
                            <button type="button" onClick={handleCaptchaRefresh} className="p-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356-2A8.001 8.001 0 004 15.54a8.001 8.001 0 0015.356-2m-1.879-6l-2.658 2.658A4 4 0 1114 13.5l1.658-1.658a2 2 0 002.828 0" />
                                </svg>
                            </button>
                            <button type="button" onClick={() => speakCaptcha(staticCaptcha)} className="p-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2m14 0a2 2 0 002 2H5a2 2 0 00-2-2m0 0a2 2 0 012-2h12a2 2 0 012 2m0 0v2" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7" />
                                </svg>
                            </button>
                            <input
                                className="flex-1 shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105"
                            type="submit"
                        >
                            Sign In as Parent
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 animate-fade-in-down">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
                <div className="max-w-md w-full flex justify-center mb-6 bg-gray-100 rounded-xl p-2 transition-all duration-300">
                    <button
                        className={`flex-1 py-3 px-4 rounded-xl text-lg font-bold transition-all duration-300 transform
                            ${selectedRole === 'anganwadi' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105' : 'text-gray-600 hover:text-green-700 hover:bg-white/50'}`}
                        onClick={() => setSelectedRole('anganwadi')}
                        type="button"
                    >
                        Anganwadi Worker
                    </button>
                    <button
                        className={`flex-1 py-3 px-4 rounded-xl text-lg font-bold transition-all duration-300 transform
                            ${selectedRole === 'parent' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105' : 'text-gray-600 hover:text-blue-700 hover:bg-white/50'}`}
                        onClick={() => setSelectedRole('parent')}
                        type="button"
                    >
                        Parent
                    </button>
                </div>

                {selectedRole === 'anganwadi' ? <WorkerLogin /> : <ParentLogin />}

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600">
                        New User?{' '}
                        <Link to="/register" className="font-bold text-green-600 hover:text-green-800 transition-colors duration-300">
                            Register here
                        </Link>
                    </p>
                </div>

                <div className="mt-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-400 max-w-lg">
                    <p className="text-green-800 text-sm text-center font-medium">
                        <strong className="font-bold">Heads up:</strong> This is a demo. Simply select your role and click 'Sign In' to proceed after filling the details!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;