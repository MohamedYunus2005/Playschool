import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    // State to track the selected role
    const [selectedRole, setSelectedRole] = useState('anganwadi');
    const navigate = useNavigate();

    // --- Data for Districts ---
    const tamilNaduDistricts = [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi",
        "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris",
        "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur",
        "Theni", "Thoothukudi (Tuticorin)", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur",
        "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
    ];

    // --- Worker Registration Component ---
    const WorkerRegister = () => {
        const [salutation, setSalutation] = useState('');
        const [fullName, setFullName] = useState('');
        const [employeeId, setEmployeeId] = useState('');
        const [aadhaarNumber, setAadhaarNumber] = useState('');
        const [mobileNumber, setMobileNumber] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [gender, setGender] = useState('');
        const [placeOfAnganwadi, setPlaceOfAnganwadi] = useState('');
        const [showAadhaar, setShowAadhaar] = useState(false);
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

        useEffect(() => {
            if (salutation === 'Mr.') {
                setGender('Male');
            } else if (salutation === 'Mrs.') {
                setGender('Female');
            } else {
                setGender('');
            }
        }, [salutation]);

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
            if (!/^\d{12}$/.test(aadhaarNumber)) {
                alert("Aadhaar Number must be a 12-digit number.");
                return;
            }
            if (!email.endsWith("@gmail.com")) {
                alert("Email must be a @gmail.com address.");
                return;
            }
            if (!passwordsMatch) {
                alert("Passwords do not match. Please try again.");
                return;
            }
            if (!Object.values(passwordStrength).every(Boolean)) {
                alert("Password does not meet the complexity requirements.");
                return;
            }

            console.log('Worker Registration Data:', { role: 'anganwadi', salutation, fullName, employeeId, aadhaarNumber, mobileNumber, email, password, gender, placeOfAnganwadi });
            alert("Registration successful! Redirecting to login page.");
            navigate('/login');
        };

        return (
            <div className="max-w-xl w-full p-8 rounded-2xl shadow-2xl relative z-10 bg-white transform transition-transform duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center text-green-700 mb-2">Anganwadi Worker</h2>
                <p className="text-center text-gray-500 mb-8">Register as a new worker</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Salutation</label>
                        <select
                            className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={salutation}
                            onChange={(e) => setSalutation(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">Full Name</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">Anganwadi Employee ID</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                            id="employeeId"
                            type="text"
                            placeholder="Enter your 5-digit employee ID"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value.replace(/\D/g, '').slice(0, 5))}
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">Mobile Number</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
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
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
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
                                className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400 ${passwordsMatch ? 'border-green-500' : 'border-gray-300'}`}
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
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-green-600 h-5 w-5"
                                    name="gender"
                                    value="Male"
                                    checked={gender === 'Male'}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="ml-2 text-gray-700">Male</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-green-600 h-5 w-5"
                                    name="gender"
                                    value="Female"
                                    checked={gender === 'Female'}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="ml-2 text-gray-700">Female</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-green-600 h-5 w-5"
                                    name="gender"
                                    value="Other"
                                    checked={gender === 'Other'}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="ml-2 text-gray-700">Other</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="placeOfAnganwadi">Place of Anganwadi</label>
                        <select
                            className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
                            id="placeOfAnganwadi"
                            value={placeOfAnganwadi}
                            onChange={(e) => setPlaceOfAnganwadi(e.target.value)}
                            required
                        >
                            <option value="">Select a District</option>
                            {tamilNaduDistricts.map(district => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
        const [salutation, setSalutation] = useState('');
        const [studentName, setStudentName] = useState('');
        const [parentName, setParentName] = useState('');
        const [aadhaarNumber, setAadhaarNumber] = useState('');
        const [mobileNumber, setMobileNumber] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [gender, setGender] = useState('');
        const [placeOfAnganwadi, setPlaceOfAnganwadi] = useState('');
        const [showAadhaar, setShowAadhaar] = useState(false);
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

        useEffect(() => {
            if (salutation === 'Mr.') {
                setGender('Male');
            } else if (salutation === 'Mrs.') {
                setGender('Female');
            } else {
                setGender('');
            }
        }, [salutation]);

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

            if (!/^\d{12}$/.test(aadhaarNumber)) {
                alert("Aadhaar Number must be a 12-digit number.");
                return;
            }
            if (!email.endsWith("@gmail.com")) {
                alert("Email must be a @gmail.com address.");
                return;
            }
            if (!passwordsMatch) {
                alert("Passwords do not match. Please try again.");
                return;
            }
            if (!Object.values(passwordStrength).every(Boolean)) {
                alert("Password does not meet the complexity requirements.");
                return;
            }

            console.log('Parent Registration Data:', { role: 'parent', salutation, studentName, parentName, aadhaarNumber, mobileNumber, email, password, gender, placeOfAnganwadi });
            alert("Registration successful! Redirecting to login page.");
            navigate('/login');
        };

        return (
            <div className="max-w-xl w-full mx-auto p-8 rounded-2xl shadow-2xl relative z-10 bg-white transform transition-transform duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">Parent</h2>
                <p className="text-center text-gray-500 mb-8">Register as a new parent</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Salutation</label>
                        <select
                            className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={salutation}
                            onChange={(e) => setSalutation(e.target.value)}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                        </select>
                    </div>
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
                            placeholder="Enter your email address"
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
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-600 h-5 w-5"
                                    name="gender"
                                    value="Male"
                                    checked={gender === 'Male'}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="ml-2 text-gray-700">Male</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-600 h-5 w-5"
                                    name="gender"
                                    value="Female"
                                    checked={gender === 'Female'}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="ml-2 text-gray-700">Female</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-blue-600 h-5 w-5"
                                    name="gender"
                                    value="Other"
                                    checked={gender === 'Other'}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <span className="ml-2 text-gray-700">Other</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="placeOfAnganwadi">Place of Anganwadi</label>
                        <select
                            className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                            id="placeOfAnganwadi"
                            value={placeOfAnganwadi}
                            onChange={(e) => setPlaceOfAnganwadi(e.target.value)}
                            required
                        >
                            <option value="">Select a District</option>
                            {tamilNaduDistricts.map(district => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
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
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
                {/* Role Selection Tabs */}
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

                {/* Conditional Registration Form */}
                {selectedRole === 'anganwadi' ? <WorkerRegister /> : <ParentRegister />}

                {/* Login Link */}
                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-green-600 hover:text-green-800 transition-colors duration-300">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;