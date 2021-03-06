import express, { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../utils/connect";
import Hospital from "../models/Hospital.model";
import logger from "../utils/logger";


export default class HospitalController {
    async save(req: Request, res: Response, next: NextFunction) {
        /**
         * endpoint to save new hospital to database
         * POST /hospital/save
         *
            {
                name: 'Al Glaa',
                bio: 'new bio to hospital',
                phone: '0123456789',
                type: 'Governmental',
                street_name: 'Sheraton Al Matar',
                street_number: '123',
                city: 'El Nozha',
                location: { type: 'Point', coordinates: [ '30.008', '31.2194' ] }
                }
         * 
         */
        try {
            let nwHospital = req.body as Hospital;
            let result = await collections.Hospital?.insertOne(nwHospital);
            logger.info(`Successfully added a new hospital`)
            result
                ? res.status(201).send({
                    status: true,
                    message: `Successfully added a new hospital`,
                    token: result.insertedId
                })
                : res.status(500).send({
                    status: false,
                    message: "Failed to add a new hospital."
                });
        }
        catch (e: any) {
            console.error(e);
            res.status(400).send({
                status : false,
                message : e.message
            })
        }
    }
    getHospital(req: Request, res: Response, next: NextFunction) {
        try {
            let hostId: string = req.params.hospId;
            collections.Hospital?.findOne({
                _id: new ObjectId(hostId)
            }).then(results => {
                results
                    ? res.status(200).send(results)
                    : res.status(404).send("Not Found");
            }).catch(error => console.error(error))
        } catch (e: any) {
            console.error(e);
            res.status(400).send(e.message)
        }
    }
    getNearestHospitals(req: Request, res: Response, next: NextFunction) {
        try {
            let mylong = req.body.long;
            let mylat = req.body.lat;
            let maxNumberOfHospitals = req.body.maxNumberOfHospitals;
            let result = collections.Hospital?.find(
                {
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [mylong, mylat]
                            },
                        }
                    },

                })
                .limit(maxNumberOfHospitals)
                .toArray()
                .then(results => {
                    results
                        ? res.status(200).render( "UserDashboard/index", {results : results})
                        : res.status(404).send("Not Found");
                }).catch(error => console.error(error))
        } catch (e: any) {
            console.error(e);
            res.status(400).send(e.message)
        }
    }
    async updateAvailableRooms(req: Request, res: Response, next: NextFunction) {
        try {
            let availableRooms = req.body.availableRooms;
            let hospId = req.body.hospId;
            await collections.Hospital?.findOneAndUpdate({
                _id: new ObjectId(hospId),
            },
                {
                    $set: { availableRooms: availableRooms }
                }).then((result) => {
                    result
                        ? res.status(202).send(`Successfully Updated`)
                        : res.status(500).send("Failed to Update.");
                }).catch((e: any) => {
                    console.error(e);
                    res.status(400).send(e.message)
                })

        }
        catch (e: any) {
            console.error(e);
            res.status(400).send(e.message)
        }
    }
}
