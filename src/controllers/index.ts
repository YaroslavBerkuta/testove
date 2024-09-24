import { Router } from "express";
import { AuthController } from "./AuthController";
import { DataController, upload } from "./DataController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();

router.post("/login", AuthController.login);
router.post(
  "/upload-csv",
  authenticateToken,
  upload.single("file"),
  DataController.uploadCSV
);

router.get("/data", authenticateToken, DataController.getData);

export default router;
