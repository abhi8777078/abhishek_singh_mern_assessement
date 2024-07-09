import React from 'react'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }
    return (
        <div className="bg-blue-600 h-16 flex justify-between items-center px-6 fixed w-full shadow-md transition-all duration-300 mb-20">
            <div className="text-white font-extrabold text-lg">
                <a href="/" className="hover:text-gray-200 transition-colors duration-300">Developer Abhishek Singh</a>
            </div>
            <div className="text-white flex items-center space-x-6">
                <div className="hidden md:block text-sm">
                    <span className="bg-blue-700 py-1 px-3 rounded-md shadow-md transition-transform transform hover:scale-105">
                        Admin: Dashboard
                    </span>
                </div>
                <div className="border-l border-gray-300 h-6"></div>
                <div className="flex items-center">
                    <span className="ml-3 font-semibold transition-opacity duration-300 hover:opacity-80">{user.firstName + " " + user.lastName}</span>
                </div>
                <div className="py-4 px-6 border-t border-blue-400">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar
