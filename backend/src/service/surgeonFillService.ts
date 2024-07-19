import { Request, Response } from "express";
import { SurgeonInterface } from "../model/surgeonDisplayArrayModel";

export class surgeonFillService {
    static async getTopSurgeon(req: Request, res: Response, surgeonArray: any[]): Promise<Map<string, number>> {
        try {
            const mapTopSurgeon = new Map<string, number>();
            //sort tab to join all same name and count easier
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

    static async getTopSpecialty(req: Request, res: Response, surgeonSortedArray: any[]): Promise<Map<string, [string]>> {
        try {
            let returnTab: Map<string, [string]> = new Map();
            surgeonSortedArray.forEach(surgeon => {
                let specialtyTopTab: string[] = [];
                surgeon.interventions.forEach((intervention: { specialty: string; }) => {
                    const specialty = intervention.specialty;
                    specialtyTopTab.push(specialty);
                })
                //sort tab to join all same intervention and count easier
                specialtyTopTab.sort((a, b) => a.localeCompare(b));
                let maxSpe = this.getMax(specialtyTopTab);
                returnTab.set(surgeon.surgeon, [maxSpe]);
                })
                return returnTab;
            } catch (err) {
            console.error('Error getTopSpeciality:', err);
            throw new Error('Error getTopSpeciality');
        }
    }

    static async getTopCoworker(req: Request, res: Response, surgeonSortedArray: any[]): Promise<Map<string, [string, string, string]>> {
        try {
            let returnTab: Map<string, [string, string, string]> = new Map();
            surgeonSortedArray.forEach(surgeon => {
                let nurse1Tab: string[] = [];
                surgeon.interventions.forEach((intervention: { nurse1: string; }) => {
                const nursy = intervention.nurse1;
                nurse1Tab.push(nursy);
                })

                let nurse2Tab: string[] = [];
                surgeon.interventions.forEach((intervention: { nurse2: string; }) => {
                const nursy2 = intervention.nurse2;
                nurse2Tab.push(nursy2);
                })

                let anaesthetistTab: string[] = [];
                surgeon.interventions.forEach((intervention: { anesthsiste: string; }) => {
                const nursy = intervention.anesthsiste;
                anaesthetistTab.push(nursy);
                })

                //sort tab to join all same nurse1, nurse2 and anaesthesist names and count easier
                nurse1Tab.sort((a, b) => a.localeCompare(b));
                nurse2Tab.sort((a, b) => a.localeCompare(b));
                anaesthetistTab.sort((a, b) => a.localeCompare(b));

                let maxNurse1 = this.getMax(nurse1Tab);
                let maxNurse2 = this.getMax(nurse2Tab);
                let maxAnaesthesist = this.getMax(anaesthetistTab);
                returnTab.set(surgeon.surgeon, [maxNurse1, maxNurse2, maxAnaesthesist]);
                })
            return returnTab;
            } catch (err) {
            console.error('Error getTopCoworker:', err);
            throw new Error('Error getTopCoworker');
        }
    }

    static async getTopIntervention(req: Request, res: Response, surgeonSortedArray: any[]): Promise<Map<string, [string]>> {
        try {
            let returnTab: Map<string, [string]> = new Map();
            surgeonSortedArray.forEach(surgeon => {
                let interventionTopTab: string[] = [];
                surgeon.interventions.forEach((intervention: { interventionTitle: string; }) => {
                
                const interventionTitle = intervention.interventionTitle;
                interventionTopTab.push(interventionTitle);
                })
                //sort tab to join all same intervention and count easier
                interventionTopTab.sort((a, b) => a.localeCompare(b));
                let maxInterventionTop = this.getMax(interventionTopTab);
                returnTab.set(surgeon.surgeon, [maxInterventionTop]);
                })
                return returnTab;
            } catch (err) {
            console.error('Error getTopIntervention:', err);
            throw new Error('Error getTopIntervention');
        }
    }

    static getMax(array: string[]): string {
        const map = new Map<string, number>();
        let i = 0;
        let count = 0;
        while (array[i]) { //Loop to compare index and index + 1
            let j = i + 1;
            if (array[j]) {
                if (array[j] === array[i]) {
                    count += 1;
                }
                else {
                    map.set(array[i], count + 1);
                    count = 0;
                }
            }
            else {
                map.set(array[i], count + 1);
            }
            i++;
        }
        let maxValue = 0;
        let maxKey: string = "null";
        //get the value most present in the tab
        map.forEach((value, key) => {
            if (maxValue === null || value > maxValue) {
                maxValue = value;
                maxKey = key
            }
        });
        return maxKey;
    }

    
    static async getTopRoomNumber(req: Request, res: Response, surgeonSortedArray: any[]): Promise<Map<string, number>> {
        try {
            const promises = surgeonSortedArray.map(async (surgeon) => {
                const mapRoomNb = new Map<number, number>();
                //sort tab to join all same room and count easier
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

            let bestIntervention: Map<string, [string]> = new Map();
            bestIntervention = await this.getTopIntervention(req, res, BigMap);

            let bestCoworkersList: Map<string, [string, string, string]> = new Map();
            bestCoworkersList = await this.getTopCoworker(req, res, BigMap);

            let topSpe: Map<string, [string]> = new Map();
            topSpe = await this.getTopSpecialty(req, res, BigMap);

            let surgeonsVector: { 
                surgeon: string, 
                interventionNb: number, 
                favoriteRoom: number,
                interventionTop: string,
                nurse1Top: string,
                nurse2Top: string,
                anaesthesistTop: string,
                speciality: string,
            }[] = [];
            
            topSurgeonSortedTimes.forEach(topSurgeon => {
                let favoriteRoom = favoriteRoomSurgeon.find(roomSurgeon => roomSurgeon.key === topSurgeon.key);
                let topIntervention = bestIntervention.get(topSurgeon.key)?.[0];
                let nurse1Top = bestCoworkersList.get(topSurgeon.key)?.[0];
                let nurse2Top = bestCoworkersList.get(topSurgeon.key)?.[1];
                let anaesthesistTop = bestCoworkersList.get(topSurgeon.key)?.[2];
                let speciality = topSpe.get(topSurgeon.key)?.[0];

                if (favoriteRoom && topIntervention && speciality
                    && nurse1Top && nurse2Top && anaesthesistTop) {
                    surgeonsVector.push({
                        surgeon: topSurgeon.key,
                        interventionNb: topSurgeon.value,
                        favoriteRoom: favoriteRoom.value,
                        interventionTop: topIntervention,
                        nurse1Top: nurse1Top,
                        nurse2Top: nurse2Top,
                        anaesthesistTop: anaesthesistTop,
                        speciality: speciality,
                    });
                }
            });
            return res.status(200).json({message : 'sorted surgeons ok', surgeonsVector});

        } catch (err) {
            return res.status(400).json({ message : 'surgeonFillService.ts | surgeonSeparatedFunction error : ', err });
        }
    }
}