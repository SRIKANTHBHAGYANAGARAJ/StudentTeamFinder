import bcrypt from 'bcrypt'


import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';

const createToken = (user) =>
    jwt.sign(
        { userId: user._id, roles: user.roles, name: user.name, email: user.email},
        "jkkjfdbk2323jb4kbrkebfekhb ",
        { expiresIn: "7d" }
    );



export const register = async (req, res) => {

    console.log(req.body)
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password)

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {

            return res.status(409).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("hashedPassword", hashedPassword);


        const obj = await userModel.create({
            name, email, password: hashedPassword, roles: [{ authority: "USER" }]

        })
        const token = createToken(obj)
        return res.status(201).json({ message: "User registered successfully", token })
    


    } catch (error) {
        console.error("Error during registration:", error);

}

}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: "Email and password required" });

        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        if (!user.password) return res.status(400).json({ success: false, message: "User has no password set" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const token = createToken(user);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });
    } catch (err) {
        logger.error(`loginManual: ${err.stack}`);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
