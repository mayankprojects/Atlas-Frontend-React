import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import abc from "../images/ahalogo.png"

function Login({ onLoginSuccess }) {
    const [password, setPasswordValue] = useState("");
    const [userId, setUserIdValue] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Admin hardcoded login check
        if (userId === "admin@atlas.com" && password === "admin123") {
            // Set admin role in localStorage
            localStorage.setItem('userRole', 'admin');
            onLoginSuccess('admin');
            navigate("/");
            return;
        }
        
        const data = {
            "userId": userId,
            "password": password
        }

        try {
            const response = await axios.post("http://localhost:9090/loginUser", data);
            if(response.data) {
                // Set regular user role in localStorage
                localStorage.setItem('userRole', 'user');
                onLoginSuccess('user');
                navigate("/");
            } else {
                setError("Invalid User Id or Password");
            }
        } catch(error) {
            setError("Login failed. Please try again.");
            console.error(error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            {/* Logo */}
            <div className="mb-8">
                <img src={abc} alt="Logo" className="h-16" />
            </div>
            
            <div className="w-full max-w-md px-3">
                <h1 className="text-2xl font-medium text-center text-gray-800 mb-6">Sign In or Create an Account</h1>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    <span className="text-red-600">*</span> indicates a required field
                </p>
                
                <h2 className="text-xl font-medium mb-4 text-gray-700">Sign In</h2>
                
                {error && <p className="text-red-500 mb-4">{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1">
                            Username / Email:<span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            value={userId} 
                            onChange={(e) => setUserIdValue(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700"
                            required
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-1">
                            Password:<span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                value={password} 
                                onChange={(e) => setPasswordValue(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700"
                                required
                            />
                            <button 
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <a href="#" className="text-blue-600 hover:underline text-sm">Forgot Password?</a>
                    </div>
                    
                    <div className="mb-4">
                        <a href="#" className="text-blue-600 hover:underline text-sm">One-Time Code To Login</a>
                    </div>
                    
                    <div className="mb-4 flex items-center">
                        <input 
                            type="checkbox" 
                            id="remember-me"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="mr-2"
                        />
                        <label htmlFor="remember-me" className="text-gray-700 text-sm">Remember me</label>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-6"
                    >
                        Sign In
                    </button>
                </form>
                
                <div className="mt-8 mb-4">
                    <h2 className="text-xl font-medium text-gray-800">New User?</h2>
                </div>
                
                <button 
                    onClick={() => navigate("/register")}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                    Create an account
                </button>
            </div>
        </div>
    );
}

export default Login;