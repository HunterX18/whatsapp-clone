import {
	checkUser,
	getAllUsers,
	onboardUser,
} from "../controllers/AuthController.js";
import { Router } from "express";

const router = Router();

router.post("/check-user", checkUser);
router.post("/onboard-user", onboardUser);
router.get("/get-contacts", getAllUsers);

export default router;
