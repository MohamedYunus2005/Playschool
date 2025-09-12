import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        navigate('/');
    };

    return (
        <nav className="bg-green-600 p-4 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Anganwadi</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/about" className="hover:underline">About</Link>
                    {isLoggedIn ? (
                        <>
                            {userRole === 'anganwadi' && (
                                <Link to="/admin-dashboard" className="hover:underline">Dashboard</Link>
                            )}
                            {userRole === 'parent' && (
                                <Link to="/parent-dashboard" className="hover:underline">Dashboard</Link>
                            )}
                            <button onClick={handleLogout} className="bg-white text-green-700 px-3 py-1 rounded-md hover:bg-green-100 transition-colors duration-300">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="bg-white text-green-700 px-3 py-1 rounded-md hover:bg-green-100 transition-colors duration-300">
                                Register
                            </Link>
                            <Link to="/login" className="bg-white text-green-700 px-3 py-1 rounded-md hover:bg-green-100 transition-colors duration-300">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
