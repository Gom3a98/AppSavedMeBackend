import express from "express"
import HospitalController from "./controllers/Hospital.contoller";
import path from 'path';

const router = express.Router();

const hospitalController : HospitalController  = new HospitalController;

router.get("/" , (req , res)=>{
    res.sendFile( path.join(path.resolve(__dirname, '..'), 'views/HospitalDashboard/Registeration.html'))
})
router.post("/save" , hospitalController.save);
router.get("/getHospital/:hospId" , hospitalController.getHospital)
router.put("/updateAvailableRooms" , hospitalController.updateAvailableRooms)
export default router;