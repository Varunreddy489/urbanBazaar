import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
        );
    } catch (error: any) {
        console.log("error in db:", error.message);
        process.exit(1);
    }
};

export default connectDb;