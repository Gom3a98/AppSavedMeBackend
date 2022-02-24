import express, { Express, Request, Response, Router } from "express";
import HospitalController from './controllers/Hospital.contoller';
const hospitalController = new HospitalController;
import { Navigator } from "node-navigator";
const navigator = new Navigator();
const router: Router = express.Router();
router.get("/init", (req: Request, res: Response) => res.sendStatus(200));

router.get("/", (req, res, next) => {
    navigator.geolocation.getCurrentPosition((success, error) => {
        if (error) console.error(error);
        else {
            req.body.long = success.longitude;
            req.body.lat = success.latitude;
            req.body.maxNumberOfHospitals = 10;
            next();
        }
    });

}, hospitalController.getNearestHospitals);

export default router;
