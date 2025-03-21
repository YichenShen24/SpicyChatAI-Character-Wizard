import express from "express";
import characterRoutes from "./characters";
import templateRoutes from "./templates";

const router = express.Router();

router.use("/characters", characterRoutes);
router.use("/templates", templateRoutes);

export default router;
