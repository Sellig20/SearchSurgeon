import { Request, Response } from "express";
import dbModel from '../model/surgeonDisplayArrayModel';

export class surgeonDisplayArrayController {
    static async getAllSurgeons(req: Request, res: Response) {
        try {
            console.log("je suis dans le controller");
            const allSurgeons = await dbModel.find();
            console.log("\n\n ALL SURGEONS = ", allSurgeons);
            res.json(allSurgeons);
        } catch (err) {
            return res.status(500).json({ message : 'Server backend error : ', err });
        }
    }
}