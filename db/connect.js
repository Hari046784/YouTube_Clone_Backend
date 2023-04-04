import mongoose from "mongoose";

const connect = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Database Connection Establised!");
    }catch (error) {
        console.log("Error while connecting DB:", error);
    };
};

export default connect;