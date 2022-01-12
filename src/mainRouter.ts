import express , { Express , Request , Response, Router } from "express";
import HospitalController from './controllers/Hospital.contoller';
const hospitalController = new HospitalController;
const router : Router =  express.Router();
router.get("/init" , (req : Request, res : Response)=> res.sendStatus(200));
router.get("/" , hospitalController.getNearestHospitals);

export default router;
