// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        console.error('Error: No DATABASE_URL found in .env file');
        process.exit(1);
    }
    await mongoose.connect(dbUrl)
        .then(() => console.log('DB Connected'))
        .catch(err => {
            console.error('DB connection error:', err);
            process.exit(1);
        });
};
