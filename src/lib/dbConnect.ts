import mongoose from "mongoose";

type ConnectionObj={
    isConnected?: number
}

const connection:ConnectionObj = {};

async function dbConnect() {
    if (connection.isConnected) {
        console.log("Using existing database");
        return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to database");

    return db;
}

export default dbConnect;