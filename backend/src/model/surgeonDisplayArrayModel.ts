import mongoose from 'mongoose';
import mongoURI from '../db';

export interface SurgeonInterface {
    surgeon: string;
    speciality: string;
    anesthesist: string;
    nurse1: string;
    nurse2: string;
    roomNumber: number;
    intervention: string;
}


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

        const dbModel = mongoose.model<SurgeonInterface>("search", dbSchema);
        console.log("\n\n\n ---------> ", dbModel);
        
        export default dbModel;