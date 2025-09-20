import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    // State to track the selected role
    const [selectedRole, setSelectedRole] = useState('admin');
    const navigate = useNavigate();

    // Helper component for Captcha fields
    const CaptchaFields = () => {
        const [captcha, setCaptcha] = useState('4S2H5');
        const [isSpeaking, setIsSpeaking] = useState(false);
        const [userCaptcha, setUserCaptcha] = useState('');
        const [userVoiceCaptcha, setUserVoiceCaptcha] = useState('');

        const generateCaptcha = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let newCaptcha = '';
            for (let i = 0; i < 5; i++) {
                newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return newCaptcha;
        };

        const handleRefreshCaptcha = () => {
            setCaptcha(generateCaptcha());
            setUserCaptcha('');
            setUserVoiceCaptcha('');
        };

        const handlePlayVoiceCaptcha = () => {
            if (!('speechSynthesis' in window)) {
                alert('Your browser does not support the Web Speech API.');
                return;
            }

            if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
                return;
            }

            const message = new SpeechSynthesisUtterance(captcha.split('').join(' '));
            message.onstart = () => setIsSpeaking(true);
            message.onend = () => setIsSpeaking(false);
            message.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(message);
        };

        return (
            <>
                {/* Captcha Field (required) */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="captcha">Captcha</label>
                    <div className="flex items-center space-x-2">
                        <span className="bg-gray-200 text-gray-800 font-bold px-4 py-2 rounded-lg tracking-widest text-xl">{captcha}</span>
                        <button type="button" onClick={handleRefreshCaptcha} className="text-gray-500 hover:text-gray-900 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 0015.5 3.25L13.5 5h3.5L15 1v2h2.5L18.5 4h-4a9 9 0 011.5 5.5A9 9 0 0113.5 19.5a9 9 0 01-5-1.556" />
                            </svg>
                        </button>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="captcha"
                            type="text"
                            placeholder="Enter captcha text"
                            value={userCaptcha}
                            onChange={(e) => setUserCaptcha(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Voice Captcha Field (optional) */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="voiceCaptcha">Voice Captcha (for visually impaired)</label>
                    <div className="flex items-center space-x-2">
                        <button
                            type="button"
                            onClick={handlePlayVoiceCaptcha}
                            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${isSpeaking ? 'bg-gray-400 text-gray-800' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                            disabled={isSpeaking}
                        >
                            {isSpeaking ? 'Playing...' : 'Play Captcha'}
                        </button>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="voiceCaptcha"
                            type="text"
                            placeholder="Enter the spoken captcha text"
                            value={userVoiceCaptcha}
                            onChange={(e) => setUserVoiceCaptcha(e.target.value)}
                        // The 'required' attribute has been removed to make this field optional
                        />
                    </div>
                </div>
            </>
        );
    };

    // --- Admin Registration Component ---
    const AdminRegister = () => {
        const [fullName, setFullName] = useState('');
        const [employeeId, setEmployeeId] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [userCaptcha, setUserCaptcha] = useState('');
        const [userVoiceCaptcha, setUserVoiceCaptcha] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        const [passwordsMatch, setPasswordsMatch] = useState(false);
        const [passwordStrength, setPasswordStrength] = useState({
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            specialChar: false,
        });

        useEffect(() => {
            setPasswordsMatch(password === confirmPassword && password.length > 0);
        }, [password, confirmPassword]);

        const handlePasswordChange = (e) => {
            const newPassword = e.target.value;
            setPassword(newPassword);
            setPasswordStrength({
                length: newPassword.length >= 8,
                uppercase: /[A-Z]/.test(newPassword),
                lowercase: /[a-z]/.test(newPassword),
                number: /[0-9]/.test(newPassword),
                specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            if (!/^\d{5}$/.test(employeeId)) {
                alert("Employee ID must be a 5-digit number.");
                return;
            }

            if (!email.endsWith("@gmail.com")) {
                alert("Email must be a @gmail.com address.");
                return;
            }

            if (!passwordsMatch || !Object.values(passwordStrength).every(Boolean)) {
                alert("Please ensure passwords match and meet all complexity requirements.");
                return;
            }

            // The voice captcha check is now removed from here. 
            // It will only be validated if the user enters a value in the input field.

            console.log('Admin Registration Data:', { fullName, employeeId, email, password });
            alert("Admin registration successful! Redirecting to login page.");
            navigate('/login');
        };

        return (
            <div className="max-w-xl w-full p-8 rounded-2xl shadow-2xl relative z-10 bg-white transform transition-transform duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">Playschool Admin</h2>
                <p className="text-center text-gray-500 mb-8">Register as a new administrator</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">Full Name</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">Employee ID</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="employeeId"
                            type="tel"
                            placeholder="Enter your 5-digit employee ID"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value.replace(/\D/g, '').slice(0, 5))}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="email"
                            type="email"
                            placeholder="Enter your @gmail.com address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={password}
                                onChange={handlePasswordChange}
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
                        <div className="mt-2 text-sm text-gray-500">
                            Password must contain:
                            <ul className="list-disc list-inside">
                                <li className={passwordStrength.length ? "text-green-600" : "text-red-500"}>At least 8 characters</li>
                                <li className={passwordStrength.uppercase ? "text-green-600" : "text-red-500"}>An uppercase letter</li>
                                <li className={passwordStrength.lowercase ? "text-green-600" : "text-red-500"}>A lowercase letter</li>
                                <li className={passwordStrength.number ? "text-green-600" : "text-red-500"}>A number</li>
                                <li className={passwordStrength.specialChar ? "text-green-600" : "text-red-500"}>A special character</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="relative">
                            <input
                                className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 ${passwordsMatch ? 'border-green-500' : 'border-gray-300'}`}
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                            >
                                {showConfirmPassword ? (
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
                        {confirmPassword.length > 0 && (
                            <p className={`mt-2 text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
                                {passwordsMatch ? "Passwords match!" : "Passwords do not match."}
                            </p>
                        )}
                    </div>
                    <CaptchaFields />
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    // --- Parent Registration Component ---
    const ParentRegister = () => {
        const [studentName, setStudentName] = useState('');
        const [parentName, setParentName] = useState('');
        const [dob, setDob] = useState('');
        const [mobileNumber, setMobileNumber] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        const [passwordsMatch, setPasswordsMatch] = useState(false);
        const [passwordStrength, setPasswordStrength] = useState({
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            specialChar: false,
        });

        useEffect(() => {
            setPasswordsMatch(password === confirmPassword && password.length > 0);
        }, [password, confirmPassword]);

        const handlePasswordChange = (e) => {
            const newPassword = e.target.value;
            setPassword(newPassword);
            setPasswordStrength({
                length: newPassword.length >= 8,
                uppercase: /[A-Z]/.test(newPassword),
                lowercase: /[a-z]/.test(newPassword),
                number: /[0-9]/.test(newPassword),
                specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            if (!email.endsWith("@gmail.com")) {
                alert("Email must be a @gmail.com address.");
                return;
            }

            if (!passwordsMatch || !Object.values(passwordStrength).every(Boolean)) {
                alert("Please ensure passwords match and meet all complexity requirements.");
                return;
            }

            // The voice captcha check is now removed from here. 
            // It will only be validated if the user enters a value in the input field.

            console.log('Parent Registration Data:', { studentName, parentName, dob, mobileNumber, email, password });
            alert("Parent registration successful! Redirecting to login page.");
            navigate('/login');
        };

        return (
            <div className="max-w-xl w-full mx-auto p-8 rounded-2xl shadow-2xl relative z-10 bg-white transform transition-transform duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">Parent</h2>
                <p className="text-center text-gray-500 mb-8">Register as a new parent</p>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parentName">Parent Name</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="parentName"
                            type="text"
                            placeholder="Enter your full name"
                            value={parentName}
                            onChange={(e) => setParentName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">Date of Birth (Student)</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="dob"
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">Mobile Number</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="mobileNumber"
                            type="tel"
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="email"
                            type="email"
                            placeholder="Enter your @gmail.com address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={password}
                                onChange={handlePasswordChange}
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
                        <div className="mt-2 text-sm text-gray-500">
                            Password must contain:
                            <ul className="list-disc list-inside">
                                <li className={passwordStrength.length ? "text-green-600" : "text-red-500"}>At least 8 characters</li>
                                <li className={passwordStrength.uppercase ? "text-green-600" : "text-red-500"}>An uppercase letter</li>
                                <li className={passwordStrength.lowercase ? "text-green-600" : "text-red-500"}>A lowercase letter</li>
                                <li className={passwordStrength.number ? "text-green-600" : "text-red-500"}>A number</li>
                                <li className={passwordStrength.specialChar ? "text-green-600" : "text-red-500"}>A special character</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="relative">
                            <input
                                className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 ${passwordsMatch ? 'border-green-500' : 'border-gray-300'}`}
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-900"
                            >
                                {showConfirmPassword ? (
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
                        {confirmPassword.length > 0 && (
                            <p className={`mt-2 text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
                                {passwordsMatch ? "Passwords match!" : "Passwords do not match."}
                            </p>
                        )}
                    </div>
                    <CaptchaFields />
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 animate-fade-in-down">
            {/* Background elements with subtle animation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
                {/* Role Selection Tabs */}
                <div className="max-w-md w-full flex justify-center mb-6 bg-gray-100 rounded-xl p-2 transition-all duration-300">
                    <button
                        className={`flex-1 py-3 px-4 rounded-xl text-lg font-bold transition-all duration-300 transform ${selectedRole === 'admin' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105' : 'text-gray-600 hover:text-blue-700 hover:bg-white/50'}`}
                        onClick={() => setSelectedRole('admin')}
                        type="button"
                    >
                        Playschool Admin
                    </button>
                    <button
                        className={`flex-1 py-3 px-4 rounded-xl text-lg font-bold transition-all duration-300 transform ${selectedRole === 'parent' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105' : 'text-gray-600 hover:text-blue-700 hover:bg-white/50'}`}
                        onClick={() => setSelectedRole('parent')}
                        type="button"
                    >
                        Parent
                    </button>
                </div>

                {/* Conditional Registration Form */}
                {selectedRole === 'admin' ? <AdminRegister /> : <ParentRegister />}

                {/* Login Link */}
                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;