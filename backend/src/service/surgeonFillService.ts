import { Request, Response } from "express";
import { SurgeonInterface } from "../model/surgeonDisplayArrayModel";

export class surgeonFillService {
    static async getTopSurgeon(req: Request, res: Response, surgeonArray: any[]): Promise<Map<string, number>> {
        try {
            const mapTopSurgeon = new Map<string, number>();
            const sortedTopSurgeons = surgeonArray.sort((a, b) => b.interventions.length - a.interventions.length);
            sortedTopSurgeons.forEach(surgeon => {
                const nbInterv = surgeon.interventions.length;
                mapTopSurgeon.set(surgeon.surgeon, nbInterv);
            });
            return mapTopSurgeon;
        } catch (err) {
            console.error('Error getTopSurgeon:', err);
            throw new Error('Error getTopSurgeon');
        }
    }

    static async getTopRoomNumber(req: Request, res: Response, surgeonSortedArray: any[]): Promise<Map<string, number>> {
        try {
            const promises = surgeonSortedArray.map(async (surgeon) => {
                const mapRoomNb = new Map<number, number>();
                surgeon.interventions.sort((a: { roomNumber: number }, b: { roomNumber: number }) => a.roomNumber - b.roomNumber);
                let previousRoomNumber: number | null = null;
                let count = 0;
                surgeon.interventions.forEach((intervention: { roomNumber: any; }, index: number) => {
                    const roomNb = intervention.roomNumber;
                    if (index < surgeon.interventions.length - 1) {
                        if (previousRoomNumber !== roomNb) {
                            if (previousRoomNumber !== null)
                                mapRoomNb.set(previousRoomNumber, count);
                            count = 0;
                        }
                        count += 1;
                    }
                    else if (index == surgeon.interventions.length - 1) {
                        if (previousRoomNumber !== roomNb) {
                            if (previousRoomNumber !== null)
                                mapRoomNb.set(previousRoomNumber, count);
                            count = 1;
                            mapRoomNb.set(roomNb, count);
                        } else {
                            count +=1;
                            mapRoomNb.set(roomNb, count);
                        }
                    }
                    previousRoomNumber = roomNb;
                });

                let maxValue = 0;
                let maxKey = 0;
                mapRoomNb.forEach((value, key) => {
                    if (maxValue === null || value > maxValue) {
                        maxValue = value;
                        maxKey = key
                    }
                });
                    return { surgeon: surgeon.surgeon, maxKey };
                    // SurgeonMaxRoom.set(surgeon.surgeon, maxKey);
                });
                const results = await Promise.all(promises);
                const SurgeonMaxRoom = new Map<string, number>();
                results.forEach(result => {
                    SurgeonMaxRoom.set(result.surgeon, result.maxKey);
                });

                return SurgeonMaxRoom;

        } catch (err) {
            console.error('Error getTopRoomNumber:', err);
            throw new Error('Error getTopRoomNumber');
        }
    }

    static async getTopIntervention(req: Request, res: Response, surgeonSortedArray: any[]): Promise<Map<string, string>> {
        try {
            const mapTopSurgeon = new Map<string, string>();

            surgeonSortedArray.forEach(surgeon => {
                console.log("*********** surgeon is ", surgeon.surgeon);
                surgeon.interventions.forEach((intervention: { interventionTitle: any; }, index: number) => {
                    const interventionNature = intervention.interventionTitle;
                    console.log(" ----> ", interventionNature);
                })
            })


            return mapTopSurgeon;
        } catch (err) {
            console.error('Error getTopIntervention:', err);
            throw new Error('Error getTopIntervention');
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

            const BigMap = Array.from(surgeonMap.values());

            let surgeonTop = new Map<string, number>();
            surgeonTop = await this.getTopSurgeon(req, res, BigMap);
            const topSurgeonSortedTimes = Array.from(surgeonTop).map(([key, value]) => ({ key, value }));

            let surgeonMaxRoom = new Map<string, number>();
            surgeonMaxRoom = await this.getTopRoomNumber(req, res, BigMap);
            const favoriteRoomSurgeon = Array.from(surgeonMaxRoom).map(([key, value]) => ({ key, value }));

            let surgeonTopInterv = new Map<string, string>();
            surgeonTopInterv = await this.getTopIntervention(req, res, BigMap);

            let surgeonsVector: { surgeon: string, interventionNb: number, favoriteRoom: number }[] = [];
            
            
            topSurgeonSortedTimes.forEach(topSurgeon => {
                let favoriteRoom = favoriteRoomSurgeon.find(roomSurgeon => roomSurgeon.key === topSurgeon.key);
                if (favoriteRoom) {

                surgeonsVector.push({
                    surgeon: topSurgeon.key,
                    interventionNb: topSurgeon.value,
                    favoriteRoom: favoriteRoom.value
                  });
                }
        });
            return res.status(200).json({message : 'sorted surgeons ok', surgeonsVector});

        } catch (err) {
            return res.status(500).json({ message : 'surgeonFillService.ts | surgeonSeparatedFunction error : ', err });
        }
    }
}