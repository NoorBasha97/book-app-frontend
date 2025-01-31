import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Login Data:", data);  // Debugging log

        try {
            // Using hardcoded URL for debugging (change back to getBaseUrl() if needed)
            const response = await axios.post(`http://localhost:5000/api/auth/admin`, data, {
                headers: {
                    "Content-Type": 'application/json',
                }
            });

            const auth = response.data;
            console.log("Auth Response:", auth);

            if (auth.token) {
                localStorage.setItem('token', auth.token);

                // Auto logout after 1 hour
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert("Token has expired, please log in again.");
                    navigate("/");
                }, 3600 * 1000);

                alert("Admin Login successful!");
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
            setMessage(error.response?.data?.message || "Something went wrong. Try again.");
        }
    };

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            {...register("username", { required: "Username is required" })}
                            placeholder="Enter your username"
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>

                    {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}

                    <div className="flex flex-wrap space-y-2.5 items-center justify-between">
                        <button
                            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="mt-5 text-center text-gray-500 text-xs">
                    &copy;2025 Book Store. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
