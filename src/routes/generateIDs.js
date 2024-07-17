import { Router } from "express";
import { generateID } from "../controllers/generateIDs.js";

const router = Router();

router.route("/").get(generateID);
export default router;
