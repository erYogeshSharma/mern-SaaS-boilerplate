import { RoleRequest } from "app-request";
import { Response, NextFunction } from "express";
import { ROLE_CODE } from "../constants/role-config";
export default (roleCode: keyof typeof ROLE_CODE) =>
  (req: RoleRequest, res: Response, next: NextFunction) => {
    req.currentRoleCode = roleCode;
    next();
  };
