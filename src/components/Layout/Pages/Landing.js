import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            {/* Hero Section with Image Background */}
            <section
                className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620712948238-d62f6b52a926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc3NTd8MHwxfHNlYXJjaHw0fHxhbmdhbndhZGl8ZW58MHx8fHwxNjk5MjA1MTI5fDA&ixlib=rb-4.0.3&q=80&w=1080')" }}
            >
                {/* Overlay to ensure text is readable */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
                
                <div className="relative z-10 text-white">
                    <h1 className="text-4xl font-bold mb-4 md:text-5xl lg:text-6xl">Welcome to Anganwadi</h1>
                    <p className="text-lg mb-8 md:text-xl lg:text-2xl">Nurturing Tomorrow's Leaders, Today.</p>
                    <Link to="/login" className="bg-white text-green-700 px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transition-colors duration-300">Get Started</Link>
                </div>
            </section>

            {/* Feature Highlights - visible on scroll */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
                        <h3 className="text-xl font-semibold mb-2">📊 Health Tracking</h3>
                        <p className="text-gray-700">Regular monitoring of height, weight, and vaccinations to ensure your child's healthy development.</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
                        <h3 className="text-xl font-semibold mb-2">🧠 Early Education</h3>
                        <p className="text-gray-700">Foundational learning in English, Tamil, and Mathematics to prepare for school.</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
                        <h3 className="text-xl font-semibold mb-2">🍎 Nutrition & Care</h3>
                        <p className="text-gray-700">Nutritious meals and expert health advice for a strong start in life.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;