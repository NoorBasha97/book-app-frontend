const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/users/user.model'); // Ensure correct path to user model

const JWT_SECRET = process.env.JWT_SECRET_KEY || "yourSuperSecretKey";

async function createAdmin() {
    try {
        await mongoose.connect('mongodb+srv://noorrocky99:m6vakZbPUD52nkZa@cluster0.pque7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

        const existingAdmin = await User.findOne({ username: "admin" });
        if (existingAdmin) {
            console.log("Admin already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = new User({
            username: "admin",
            password: hashedPassword, // Store hashed password
            role: "admin"
        });

        await admin.save();
        console.log("Admin user created successfully!");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error creating admin:", error);
        mongoose.connection.close();
    }
}

createAdmin();
