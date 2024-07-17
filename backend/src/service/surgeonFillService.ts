import { Request, Response } from "express";
import { SurgeonInterface } from "../model/surgeonDisplayArrayModel";


export class surgeonFillService {
    static async surgeonSeparated(req: Request, res: Response, allSurgeons: SurgeonInterface[]) {
        try {
            const uniSurgeons = new Set();
            const surgeonMap = new Map<string, any>();
            allSurgeons.forEach(surgeon => {
                uniSurgeons.add(surgeon.surgeon);
                if (!surgeonMap.has(surgeon.surgeon)) {
                    surgeonMap.set(surgeon.surgeon, {
                        surgeon: surgeon.surgeon,
                        interventions: [{
                            specialty: surgeon.specialty,
                            roomNumber: surgeon.roomNumber,
                            nurse1: surgeon.nurse1,
                            nurse2: surgeon.nurse1,
                            anesthsist: surgeon.anesthesist,
                            interventionTitle: surgeon.intervention
                        }]
                    });
                } else {
                    const existingSurgeon = surgeonMap.get(surgeon.surgeon);
                    existingSurgeon.interventions.push({
                        specialty: surgeon.specialty,
                        roomNumber: surgeon.roomNumber,
                        nurse1: surgeon.nurse1,
                        nurse2: surgeon.nurse1,
                        anesthsist: surgeon.anesthesist,
                        interventionTitle: surgeon.intervention
                    });
                    surgeonMap.set(surgeon.surgeon, existingSurgeon);
                }
            });
            console.log("unique surgeon is : ", uniSurgeons);
            const uniScount = uniSurgeons.size;
            console.log("==> Nombre de chirurgiens différents : ", uniScount);
            const BigMap = Array.from(surgeonMap.values());
            // console.log(" BIG MAP => ", BigMap);
            // console.log(" BIG MAP => ", surgeonMap.entries());
            BigMap.forEach(surgeon => {
                console.log(`\nSurgeon: ${surgeon.surgeon} - ${surgeon.specialty}`);
                console.table(surgeon.interventions);
            });
            
        } catch (err) {
            return res.status(500).json({ message : 'surgeonFillService | surgeonSeparated error : ', err });
        }
    }
}