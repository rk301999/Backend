import mongoose  from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); //returns an object , hence we can store in var
        console.log(connectionInstance.Connection);
        console.log(`\n Database Connected Successfully DB-HOST : ${connectionInstance.Connection.host}`);
    } catch (error) {
        console.log("MONGO DB connection error",error);
        process.exit(1); //current application refrence  is process and we are exiting it 
    }
}
    
export default connectDB;