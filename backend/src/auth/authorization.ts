import express from "express";
import { ProtectedRequest } from "app-request";
import { AuthFailureError } from "../core/api-error";
import asyncHandler from "../helpers/asyncHandler";
import { ROLE_MAP } from "../constants/role-config";

const router = express.Router();

export default router.use(
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    if (!req.user || !req.user.role || !req.currentRoleCode)
      throw new AuthFailureError("Permission denied");

    const role = req.currentRoleCode as keyof typeof ROLE_MAP;
    if (role.length === 0) throw new AuthFailureError("Permission denied");

    let authorized = false;

    if (ROLE_MAP[role] === req.user.role) {
      authorized = true;
    }

    if (!authorized) throw new AuthFailureError("Permission denied");

    return next();
  })
);
