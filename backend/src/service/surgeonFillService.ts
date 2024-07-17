import { Request, Response } from "express";
import { SurgeonInterface } from "../model/surgeonDisplayArrayModel";

export class surgeonFillService {
    static async getTopSurgeon(req: Request, res: Response, surgeonArray: any[]) {
        try {
            const sortedTopSurgeons = surgeonArray.sort((a, b) => b.interventions.length - a.interventions.length);
            sortedTopSurgeons.forEach(surgeon => {
                const nbInterv = surgeon.interventions.length;
                console.log(`Le chirurgien ${surgeon.surgeon} a travaillé ${nbInterv} fois`);
            });
            return sortedTopSurgeons;
        } catch (err) {
            return res.status(500).json({ message : 'surgeonFillService.ts | getTopSurgeonFunction error : ', err });
        }
    }

    static async getTopRoomNumber(req: Request, res: Response, surgeonSortedArray: any[]) {
        try {
            surgeonSortedArray.forEach(surgeon => {
                surgeon.interventions.sort((a: { roomNumber: number }, b: { roomNumber: number }) => a.roomNumber - b.roomNumber);
                let previousRoomNumber: number | null = null;
                // const mapRoomNb = new Map<number, number>();
                console.log("----");
                let count = 0;
                surgeon.interventions.forEach((intervention: { roomNumber: any; }, index: number) => {
                    const roomNb = intervention.roomNumber;
                    let nextRoomNb: number | null = null;
                    console.log(`\nLa room de ${surgeon.surgeon} est : ${previousRoomNumber}`);
                    if (index < surgeon.interventions.length - 1) {
                        nextRoomNb = surgeon.interventions[index + 1].roomNb;
                    }
                    if (index == surgeon.interventions.length - 1) {
                        // console.log(`\nLa room de ${surgeon.surgeon} est : ${roomNb} pour ${count + 1} interv`);
                        console.log("count == ", count + 1);
                        // console.log("----");
                        // count++;
                    }
                    else if (previousRoomNumber !== roomNb) {
                        // console.log(`\nLa room de ${surgeon.surgeon} est : ${roomNb} pour ${count + 1} interv`);
                        console.log("count == ", count + 1);
                        console.log("----");
                        count = 0;

                    } else {
                        count++;
                    }
                    
                    previousRoomNumber = roomNb;
                    
                });
                console.log("************************************************");
            });
        } catch (err) {
            return res.status(500).json({ message : 'surgeonFillService.ts | getTopRoomNumber error : ', err });
        }
    }

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
                            anesthsiste: surgeon.anesthsiste,
                            interventionTitle: surgeon.intervention
                        }]
                    });
                } else {
                    const existingSurgeon = surgeonMap.get(surgeon.surgeon);
                    existingSurgeon.interventions.push({
                        specialty: surgeon.specialty,
                        roomNumber: surgeon.roomNumber,
                        nurse1: surgeon.nurse1,
                        nurse2: surgeon.nurse2,
                        anesthsiste: surgeon.anesthsiste,
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
            // BigMap.forEach(surgeon => {
            //     console.log(`\nSurgeon: ${surgeon.surgeon}`);
            //     console.table(surgeon.interventions);
            // });
            this.getTopSurgeon(req, res, BigMap);
            this.getTopRoomNumber(req, res, BigMap);
            return res.status(200).json({message : 'sorted surgeons ok', BigMap});
        } catch (err) {
            return res.status(500).json({ message : 'surgeonFillService.ts | surgeonSeparatedFunction error : ', err });
        }
    }
}