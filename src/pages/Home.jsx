import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {


    return (
        <div className="flex flex-col min-h-screen">
            
            <main className="font-sans antialiased flex-grow">
                <section className="bg-gradient-to-br from-indigo-50 to-indigo-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                        <h1 className="text-4xl font-extrabold text-indigo-900 sm:text-5xl">
                            Welcome to MERN Authentication
                        </h1>
                        <p className="mt-4 text-lg text-indigo-700">
                            A robust and secure authentication system built with MongoDB, Express, React, and Node.js.
                        </p>

                        
                    </div>
                    {/* login and register button  */}
                    <div className="flex justify-center gap-4 mb-20">
                        <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                            Login
                        </Link>
                        <Link to="/register" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                            Register
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;