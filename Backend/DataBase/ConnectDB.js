import dotenv from 'dotenv'
dotenv.config();

import mongoose from 'mongoose';
const ConnectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL);
        console.log(process.env.DATABASE_URL);
        console.log("Connection is Established", connect.connection.host, connect.connection.name);
        console.log("DataBase Connected in dbconnect.js");
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
    
}

export default ConnectDB;