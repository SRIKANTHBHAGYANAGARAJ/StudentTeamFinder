import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle, CheckCircle } from "lucide-react";
import { AuthAPI } from "../apis/AuthAPI";

const EyeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EyeSlashIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
    </svg>
);

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", isGoogleUser: false });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // --- Normal registration ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await AuthAPI.registerUser(formData);
            if (response.status === 201) {
                const { data } = response;
                localStorage.setItem("token", data.token);
                if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-indigo-200 p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Your Account</h2>
                    <p className="text-slate-500">Let&apos;s get started with your free account.</p>
                </div>

                {error && (
                    <div className="mb-4 flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                        <span className="text-red-700 text-sm">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="mb-4 flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-green-700 text-sm">{success}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                        <input
                            type={showPasswordModal ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-4 py-3 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 top-7 flex items-center pr-3 cursor-pointer"
                            onClick={() => setShowPasswordModal(!showPasswordModal)}
                        >
                            {showPasswordModal ? <EyeSlashIcon className="h-5 w-5 mt-5 text-slate-500" /> : <EyeIcon className="h-5 w-5 mt-5 text-slate-500" />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-60 text-base font-semibold shadow-md"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <div className="flex-grow h-px bg-slate-200"></div>
                    <span className="text-sm text-slate-500">or</span>
                    <div className="flex-grow h-px bg-slate-200"></div>
                </div>

                <p className="mt-8 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Login here</Link>
                </p>
            </div>

            
        </section>
    );
};

export default Register;