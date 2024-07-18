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
            const SurgeonMaxRoom = new Map<string, number>();
            surgeonSortedArray.forEach(surgeon => {
                const mapRoomNb = new Map<number, number>();
                surgeon.interventions.sort((a: { roomNumber: number }, b: { roomNumber: number }) => a.roomNumber - b.roomNumber);
                let previousRoomNumber: number | null = null;
                let count = 0;
                surgeon.interventions.forEach((intervention: { roomNumber: any; }, index: number) => {
                    const roomNb = intervention.roomNumber;
                    // console.log(`\nLa room de ${surgeon.surgeon} est : ${previousRoomNumber}`);
                    if (index < surgeon.interventions.length - 1) {
                        if (previousRoomNumber !== roomNb) {
                            // console.log("count == ", count);
                            // console.log("----");
                            if (previousRoomNumber !== null)
                                mapRoomNb.set(previousRoomNumber, count);
                            count = 0;
                        }
                        count += 1;
                    }
                    else if (index == surgeon.interventions.length - 1) {
                        if (previousRoomNumber !== roomNb) {
                            // console.log("count == ", count);
                            // console.log(`\nLa roomanshow de ${surgeon.surgeon} est : ${roomNb}`);
                            if (previousRoomNumber !== null)
                                mapRoomNb.set(previousRoomNumber, count);
                            count = 1;
                            mapRoomNb.set(roomNb, count);
                            // console.log("count == ", count);
                            // console.log("----");
                        } else {
                            count +=1;
                            // console.log("count == ", count);
                            mapRoomNb.set(roomNb, count);
                        }
                    }
                    previousRoomNumber = roomNb;
                });
                // console.log("*******************************************");
                // console.log(`*******************  MRN  ${surgeon.surgeon} ***************************** : `, mapRoomNb);
                let maxValue = 0;
                let maxKey = 0;
                mapRoomNb.forEach((value, key) => {
                    if (maxValue === null || value > maxValue) {
                        maxValue = value;
                        maxKey = key
                    }
                    // console.log("sa salle preférée est : ", maxKey, " ", surgeon.surgeon, " a travaillé ", maxValue, " fois");
                    SurgeonMaxRoom.set(surgeon.surgeon, maxKey);
                })
                console.log(" ====> ", SurgeonMaxRoom);
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
            // return BigMap;
        } catch (err) {
            return res.status(500).json({ message : 'surgeonFillService.ts | surgeonSeparatedFunction error : ', err });
        }
    }
}