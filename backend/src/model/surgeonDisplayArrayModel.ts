import mongoose from 'mongoose';
import mongoURI from '../db';

export interface SurgeonInterface {
    surgeon: string;
    specialty: string;
    anesthsiste: string;
    nurse1: string;
    nurse2: string;
    roomNumber: number;
    intervention: string;
}


        console.log("\n\n\nje suis dans le model");
        // const dbSchema = new mongoose.Schema({
        //     surgeon: String,
        //     speciality: String,
        //     anesthsiste: String,
        //     nurse1: String,
        //     nurse2: String,
        //     roomNumber: Number,
        //     intervention: String
        // });
        const dbSchema = new mongoose.Schema({
            surgeon: { type: String, required: true },
            specialty: { type: String, required: true },
            anesthsiste: { type: String, required: true },
            nurse1: { type: String, required: true },
            nurse2: { type: String, required: true },
            roomNumber: { type: Number, required: true },
            intervention: { type: String, required: true },
        });
        const dbModel = mongoose.model<SurgeonInterface>("searches", dbSchema);
        // console.log("\n\n\n ---------> ", dbModel);
        
        export default dbModel;