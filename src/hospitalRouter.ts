import express from "express"
import HospitalController from "./controllers/Hospital.contoller";

const router = express.Router();

const hospitalController : HospitalController  = new HospitalController;

router.get("/" , (req , res)=>{
    res.status(200).send("Welcome To my app");
})
router.post("/save" , hospitalController.save);
router.get("/getHospital/:hospId" , hospitalController.getHospital)
router.put("/updateAvailableRooms" , hospitalController.updateAvailableRooms)
export default router;