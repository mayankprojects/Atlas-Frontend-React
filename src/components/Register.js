// Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/ahalogo.png"
function Register() {
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:9090/addUser', register);
            console.log(response.data);
            alert("User added successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            setError("Registration failed. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            {/* Logo */}
            <div className="mb-8">
                <img src={logo} alt="Logo" className="h-16" />
            </div>
            
            <div className="w-full max-w-md px-4">
                <h1 className="text-2xl font-medium text-center text-gray-800 mb-6">Create an Account</h1>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    <span className="text-red-600">*</span> indicates a required field
                </p>
                
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">
                            Name:<span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="name"
                            value={register.name} 
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">
                            Email:<span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="email" 
                            name="email"
                            value={register.email} 
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700"
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-1">
                            Password:<span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={register.password} 
                                onChange={handleChange}
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
                    
                    <button 
                        type="submit" 
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-6"
                    >
                        Create Account
                    </button>
                </form>
                
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Already have an account? 
                        <button 
                            onClick={() => navigate("/login")}
                            className="text-blue-600 hover:text-blue-700 ml-1"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;