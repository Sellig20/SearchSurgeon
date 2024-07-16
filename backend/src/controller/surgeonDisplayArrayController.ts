import { Request, Response } from "express";
import dbModel, { SurgeonInterface } from '../model/surgeonDisplayArrayModel';
import mongoose from "mongoose";

export class surgeonDisplayArrayController {
    static async getAllSurgeons(req: Request, res: Response) {
        try {
            console.log("je suis dans le controller");
            const allSurgeons: SurgeonInterface[] = await dbModel.find();
            // console.log("\n\n ALL SURGEONS = ", allSurgeons);
            allSurgeons.forEach(surgeon => {
                console.log("\nloko loko");
                console.log(surgeon);
            });
            // allSurgeons.find()
            //     .then(data => {
            //         console.log("Données recup de la collection ==> ", data);
            //     })
            //     .catch(err => {
            //         console.log("Erreur pdt la récup des données : ", err);
            //     });
            res.json(allSurgeons);
        } catch (err) {
            return res.status(500).json({ message : 'Server backend error : ', err });
        }
    }
}