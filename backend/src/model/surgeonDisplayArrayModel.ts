import mongoose from 'mongoose';
import mongoURI from '../db';

        console.log("je suis dans le model");
        const dbSchema = new mongoose.Schema({
            surgeon: String,
            speciality: String,
            anesthsiste: String,
            nurse1: String,
            nurse2: String,
            roomNumber: Number,
            intervention: String
        });

        const dbModel = mongoose.model("surgeonArray", dbSchema);
        console.log("bonjour");
        // return dbModel;
        export default dbModel;