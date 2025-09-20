import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    // For demonstration, these states are hardcoded.
    // In a real application, they would be managed by your authentication context or state management system.
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // This is a placeholder for your actual logout logic
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Inline SVG for Hamburger icon
    const HamburgerIcon = () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
    );

    // Inline SVG for Close icon
    const CloseIcon = () => (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    );

    return (
        <nav className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 p-4 text-white shadow-xl relative z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand/Logo - with playful font and styling */}
                <Link to="/" className="text-3xl font-extrabold tracking-wide text-white drop-shadow-md">
                    <span className="text-pink-100">✨</span> Rainbow Land <span className="text-yellow-100">🦄</span>
                </Link>

                {/* Desktop Menu - visible on medium screens and up */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>

                    {isLoggedIn ? (
                        // Logged-in state
                        <>
                            <Link to="/attendance" className="nav-link">Attendance</Link>
                            <Link to="/gallery" className="nav-link">Gallery</Link>
                            <Link to="/events" className="nav-link">Events</Link>
                            <Link to="/curriculum" className="nav-link">Curriculum</Link>
                            <Link to="/admissions" className="nav-link">Admissions</Link>
                            <Link to="/contact" className="nav-link">Contact</Link>
                            <button onClick={handleLogout} className="nav-button">
                                Logout
                            </button>
                        </>
                    ) : (
                        // Logged-out state
                        <>
                            <Link to="/register" className="nav-button">Register</Link>
                            <Link to="/login" className="nav-button">Login</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button - visible on small screens */}
                <div className="md:hidden flex items-center">
                    <button onClick={handleMenuToggle} className="text-white focus:outline-none">
                        {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu - conditionally rendered and animated */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-gradient-to-b from-purple-400 to-pink-400 transition-all duration-500 ease-in-out transform shadow-xl ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col items-center space-y-4 py-8">
                    <Link to="/" className="mobile-nav-link" onClick={handleMenuToggle}>Home</Link>
                    <Link to="/about" className="mobile-nav-link" onClick={handleMenuToggle}>About</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/attendance" className="mobile-nav-link" onClick={handleMenuToggle}>Attendance</Link>
                            <Link to="/gallery" className="mobile-nav-link" onClick={handleMenuToggle}>Gallery</Link>
                            <Link to="/events" className="mobile-nav-link" onClick={handleMenuToggle}>Events</Link>
                            <Link to="/curriculum" className="mobile-nav-link" onClick={handleMenuToggle}>Curriculum</Link>
                            <Link to="/admissions" className="mobile-nav-link" onClick={handleMenuToggle}>Admissions</Link>
                            <Link to="/contact" className="mobile-nav-link" onClick={handleMenuToggle}>Contact</Link>
                            <button onClick={() => { handleLogout(); handleMenuToggle(); }} className="mobile-nav-button">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="mobile-nav-button">Register</Link>
                            <Link to="/login" className="mobile-nav-button">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;