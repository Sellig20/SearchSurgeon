import { Request, Response } from "express";
import dbModel, { SurgeonInterface } from '../model/surgeonDisplayArrayModel';
import mongoose from "mongoose";
import { surgeonFillService } from "../service/surgeonFillService";

export class surgeonDisplayArrayController {
    static async getAllSurgeons(req: Request, res: Response) {
        try {
            console.log("je suis dans le controller");
            const allSurgeons: SurgeonInterface[] = await dbModel.find();
            console.log("\n\nnombre de surgeons -> ", allSurgeons.length);
            surgeonFillService.surgeonSeparated(req, res, allSurgeons);            
            res.status(200).json({message: 'All surgeons from db ok', allSurgeons});
        } catch (err) {
            return res.status(500).json({ message : 'Server backend error : ', err });
        }
    }
}