import express from "express";
import validator, { ValidationSource } from "../../helpers/validator";
import schema from "./schema";
import asyncHandler from "../../helpers/asyncHandler";
import AuthController from "../../controllers/auth.controller";
import authentication from "../../auth/authentication";

const router = express.Router();
const authController = new AuthController();

router.post(
  "/register",
  validator(schema.signup),
  asyncHandler(authController.register)
);
router.post(
  "/login",
  validator(schema.credential),
  asyncHandler(authController.login)
);
router.post(
  "/forgot-password",
  validator(schema.forgotPassword),
  asyncHandler(authController.forgotPassword)
);
router.post(
  "/reset-password",
  validator(schema.resetPassword),
  asyncHandler(authController.resetPassword)
);

router.use(authentication);
router.delete("/", asyncHandler(authController.logout));
router.post(
  "/refresh",
  validator(schema.auth, ValidationSource.HEADER),
  validator(schema.refreshToken),
  asyncHandler(authController.refreshToken)
);

export default router;
