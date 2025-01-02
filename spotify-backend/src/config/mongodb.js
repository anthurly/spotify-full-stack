import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("connection established")
    });

    // await mongoose.connect(`${process.env.MONGODB_URI}/spotify`)
    await mongoose.connect(`mongodb://localhost:27017/MusicStreamingWebsite`)

}

export default connectDB;