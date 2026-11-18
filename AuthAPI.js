import axios from "axios";

const URL = "http://localhost:3500";


export const AuthAPI = {
    // ---------- Manual login ----------
    loginUser: (email, password) =>
        axios.post(`http://localhost:3500/auth/login`, { email, password }),

    // ---------- Register user ----------
    registerUser: (formData) =>
        axios.post(`http://localhost:3500/auth/register`, formData),

};