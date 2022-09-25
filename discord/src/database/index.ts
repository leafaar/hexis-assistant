import { config } from "dotenv";
import mongoose from "mongoose";
config();

mongoose.connect(process.env.MONGO_URL as string)
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err));