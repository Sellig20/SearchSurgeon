import { Request, Response } from "express";
import dbModel, { SurgeonInterface } from '../model/surgeonDisplayArrayModel';
import mongoose from "mongoose";
import { surgeonFillService } from "../service/surgeonFillService";

export class surgeonDisplayArrayController {
    static async getAllSurgeons(req: Request, res: Response) {
        try {
            const allSurgeons: SurgeonInterface[] = await dbModel.find();
            const sortedSurgeons = surgeonFillService.surgeonSeparated(req, res, allSurgeons);
            return sortedSurgeons;
        } catch (err) {
            return res.status(500).json({ message : 'Server backend error : ', err });
        }
    }
}