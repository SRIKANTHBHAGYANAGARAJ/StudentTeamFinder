import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { AuthAPI } from "../apis/AuthAPI";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // --- Manual login ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const { data } = await AuthAPI.loginUser(formData.email, formData.password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.user?.roles?.[0]?.authority || "USER");
            localStorage.setItem("userId", data.user.id);

            setSuccess("Login successful! Redirecting...");
            setTimeout(() => navigate("/profile"), 1000);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">Sign In</h2>
                <p className="text-slate-500 text-center mb-6">Enter your credentials to access your account</p>

                {error && <div className="mb-6 flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-red-700 text-sm">{error}</span>
                </div>}

                {success && <div className="mb-6 flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-green-700 text-sm">{success}</span>
                </div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email address"
                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input type={showPasswordModal ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required placeholder="Password"
                            className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                        <button type="button" className="absolute right-3 top-3 text-slate-400 hover:text-slate-600" onClick={() => setShowPasswordModal(!showPasswordModal)}>
                            {showPasswordModal ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <Link to="/forgot-password" className="text-indigo-600 font-semibold hover:underline text-center text-sm ">forgot password</Link>

                    <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-60 font-semibold shadow-md" disabled={loading}>
                        {loading ? <><Loader className="w-5 h-5 animate-spin" /><span>Signing In...</span></> : "Sign In"}
                    </button>
                </form>

                <div className="my-8 flex items-center">
                    <div className="flex-grow h-px bg-slate-200"></div>
                    <span className="px-4 text-sm text-slate-500">Or continue with</span>
                    <div className="flex-grow h-px bg-slate-200"></div>
                </div>



                <p className="mt-8 text-center text-sm text-slate-600">
                    Don’t have an account? <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700">Register here</Link>
                </p>
            </div>

        </section>
    );
};

export default Login;