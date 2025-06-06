import { Router } from "express";
import { mocksController } from "../controllers/mocks.controller.js";

const router = Router();


router.get("/mockingusers", mocksController.getMockingUsers);
router.get("/mockingpets", mocksController.getMockingPets);
router.post("/generateData", mocksController.generateData);

export default router;