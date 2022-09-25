import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL as string)
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err));