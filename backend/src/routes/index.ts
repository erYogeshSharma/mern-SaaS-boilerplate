import express from "express";

import authRoutes from "./auth/auth.routes";
const router = express.Router();

router.use("/auth", authRoutes);

//test route
router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

export default router;
