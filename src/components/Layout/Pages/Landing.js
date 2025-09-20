import React from 'react'; // Remove useState import
import { Link } from 'react-router-dom';

const Landing = ({ theme }) => { // Accept theme as a prop
    const isUnicornTheme = theme === 'unicorn';
    const bgColor = isUnicornTheme ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100' : 'bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 text-white';

    return (
        <div className={`font-sans overflow-hidden transition-all duration-1000 ${bgColor}`}>
            {/* The theme toggle button div has been removed from here */}

            {/* Background Decorations (Conditional) */}
            {isUnicornTheme ? (
                <>
                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full transform rotate-45 -translate-y-16 -translate-x-16 opacity-30 blur-xl"></div>
                    <div className="absolute top-1/3 right-0 w-24 h-24 bg-yellow-300 rounded-full transform rotate-12 translate-x-1/2 opacity-20 blur-lg"></div>
                    <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-pink-300 rounded-full transform -rotate-30 -translate-x-1/2 opacity-25 blur-xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-300 rounded-full transform rotate-60 translate-y-1/2 opacity-30 blur-lg"></div>
                </>
            ) : (
                <>
                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-yellow-300 rounded-full transform -rotate-45 -translate-y-16 -translate-x-16 opacity-10 blur-xl"></div>
                    <div className="absolute top-1/3 right-0 w-24 h-24 bg-purple-500 rounded-full transform rotate-12 translate-x-1/2 opacity-15 blur-lg"></div>
                    <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-blue-500 rounded-full transform -rotate-30 -translate-x-1/2 opacity-10 blur-xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-pink-500 rounded-full transform rotate-60 translate-y-1/2 opacity-15 blur-lg"></div>
                </>
            )}

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4">
                {/* Cloud shapes (conditional) */}
                {isUnicornTheme && (
                    <>
                        <div className="absolute top-0 left-0 right-0 h-48 bg-white opacity-70 rounded-b-full transform scale-y-150 -translate-y-1/2"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-white opacity-80 rounded-b-full transform scale-y-200 -translate-y-1/3"></div>
                    </>
                )}

                {/* Hero Content */}
                <div className={`relative z-20 p-6 md:p-10 rounded-3xl backdrop-blur-sm shadow-xl border border-opacity-50 mx-4 transition-all duration-1000 ${isUnicornTheme ? 'bg-white bg-opacity-30 border-white' : 'bg-gray-800 bg-opacity-50 border-gray-700'}`}>
                    <h1 className={`text-5xl font-extrabold mb-4 md:text-6xl lg:text-7xl drop-shadow-lg [text-shadow:2px_2px_4px_var(--tw-shadow-color)] transition-colors duration-1000 ${isUnicornTheme ? 'text-purple-800 shadow-pink-300' : 'text-yellow-200 shadow-blue-500'}`}>
                        <span className="inline-block animate-bounce-slow">✨</span> Welcome to Rainbow Land Playschool <span className="inline-block animate-bounce-slow">🦄</span>
                    </h1>
                    <p className={`text-xl mb-10 md:text-2xl lg:text-3xl font-semibold italic [text-shadow:1px_1px_2px_var(--tw-shadow-color)] transition-colors duration-1000 ${isUnicornTheme ? 'text-purple-700 shadow-pink-200' : 'text-blue-300 shadow-purple-500'}`}>
                        Sparkle, Dream, Discover: Every Day is a Magical Journey!
                    </p>
                    <Link
                        to="/login"
                        className={`inline-flex items-center justify-center text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden ${isUnicornTheme ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500' : 'bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600'}`}
                    >
                        <span className="absolute inset-0 flex items-center justify-center">
                            <span className="sparkle"></span>
                            <span className="sparkle delay-1"></span>
                            <span className="sparkle delay-2"></span>
                        </span>
                        <span className="relative z-10">Enroll Now!</span>
                    </Link>
                </div>

                {/* Bottom wave/cloud shape (conditional) */}
                {isUnicornTheme && (
                    <>
                        <div className="absolute bottom-0 left-0 right-0 h-48 bg-white opacity-70 rounded-t-full transform scale-y-150 translate-y-1/2 z-10"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-white opacity-80 rounded-t-full transform scale-y-200 translate-y-1/3 z-10"></div>
                    </>
                )}
            </section>
            
            {/* The rest of the page remains unchanged */}
            <section className="py-24 container mx-auto px-6 relative z-20 -mt-24">
                <h2 className={`text-4xl font-extrabold text-center mb-16 drop-shadow-md transition-colors duration-1000 ${isUnicornTheme ? 'text-purple-700' : 'text-yellow-300'}`}>
                    Our Magical Play-Based Curriculum
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Card 1 */}
                    <div className={`p-8 rounded-[40px] shadow-2xl text-center transform transition-all duration-500 hover:scale-105 border-4 border-white border-opacity-60 relative overflow-hidden ${isUnicornTheme ? 'bg-gradient-to-br from-pink-200 to-purple-200' : 'bg-gradient-to-br from-gray-800 to-purple-800'}`}>
                        <div className={`absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10`} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/sparkle_icon.png)` }}></div>
                        <h3 className={`text-2xl font-bold mb-4 flex items-center justify-center transition-colors duration-1000 ${isUnicornTheme ? 'text-purple-800' : 'text-pink-300'}`}>
                            <span className="text-3xl mr-3">🎨</span> Enchanted Arts
                        </h3>
                        <p className={`text-lg transition-colors duration-1000 ${isUnicornTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                            Wiggle, paint, and sing! Our creative kingdom sparks imagination and helps little stars shine bright.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className={`p-8 rounded-[40px] shadow-2xl text-center transform transition-all duration-500 hover:scale-105 border-4 border-white border-opacity-60 relative overflow-hidden ${isUnicornTheme ? 'bg-gradient-to-br from-blue-200 to-green-200' : 'bg-gradient-to-br from-purple-800 to-blue-800'}`}>
                        <div className={`absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10`} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/rainbow_icon.png)` }}></div>
                        <h3 className={`text-2xl font-bold mb-4 flex items-center justify-center transition-colors duration-1000 ${isUnicornTheme ? 'text-purple-800' : 'text-yellow-300'}`}>
                            <span className="text-3xl mr-3">🧠</span> Rainbow Growth
                        </h3>
                        <p className={`text-lg transition-colors duration-1000 ${isUnicornTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                            Tiny minds blossom! We nurture curious minds and sparkling personalities with joyful learning.
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className={`p-8 rounded-[40px] shadow-2xl text-center transform transition-all duration-500 hover:scale-105 border-4 border-white border-opacity-60 relative overflow-hidden ${isUnicornTheme ? 'bg-gradient-to-br from-yellow-200 to-pink-200' : 'bg-gradient-to-br from-blue-800 to-pink-800'}`}>
                        <div className={`absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10`} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/unicorn_icon.png)` }}></div>
                        <h3 className={`text-2xl font-bold mb-4 flex items-center justify-center transition-colors duration-1000 ${isUnicornTheme ? 'text-purple-800' : 'text-blue-300'}`}>
                            <span className="text-3xl mr-3">🤸‍♂️</span> Magical Play
                        </h3>
                        <p className={`text-lg transition-colors duration-1000 ${isUnicornTheme ? 'text-gray-800' : 'text-gray-200'}`}>
                            Adventure awaits! Our safe enchanted gardens are perfect for jumping, running, and making new friends.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section with playful graphics */}
            <section className={`py-20 mt-16 relative overflow-hidden transition-all duration-1000 ${isUnicornTheme ? 'bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300' : 'bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950'}`}>
                <div className={`absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat opacity-20`} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/stars_pattern.png)` }}></div>
                <div className="container mx-auto text-center relative z-10">
                    <h2 className={`text-4xl font-extrabold mb-6 drop-shadow-md transition-colors duration-1000 ${isUnicornTheme ? 'text-white' : 'text-yellow-200'}`}>Ready for a Magical Journey?</h2>
                    <p className={`text-xl mb-10 max-w-2xl mx-auto transition-colors duration-1000 ${isUnicornTheme ? 'text-white' : 'text-gray-300'}`}>
                        Join our playschool family where every child discovers their inner sparkle and grows with joy!
                    </p>
                    <Link
                        to="/contact"
                        className={`inline-flex items-center justify-center text-purple-700 px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${isUnicornTheme ? 'bg-white hover:bg-gray-100' : 'bg-white hover:bg-gray-200'}`}
                    >
                        <span className="mr-2">🌈</span> Contact Us Today!
                    </Link>
                </div>
            </section>

            {/* Footer with playful design */}
            <footer className={`py-12 relative overflow-hidden transition-colors duration-1000 ${isUnicornTheme ? 'bg-purple-900 text-white' : 'bg-black text-white'}`}>
                <div className={`absolute bottom-0 left-0 w-full h-full bg-contain bg-no-repeat opacity-10`} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/cloud_pattern.png)` }}></div>
                <div className="container mx-auto text-center relative z-10">
                    <p className="text-lg mb-4">&copy; {new Date().getFullYear()} Rainbow Land Playschool. All rights reserved.</p>
                    <div className="flex justify-center space-x-6 text-2xl">
                        <a href="#" className="hover:text-pink-400 transition-colors duration-200">💖</a>
                        <a href="#" className="hover:text-blue-400 transition-colors duration-200">✨</a>
                        <a href="#" className="hover:text-yellow-400 transition-colors duration-200">🌟</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;