import express from "express";
import { ProtectedRequest } from "app-request";
import { UserModel } from "../database/model/User";
import { AuthFailureError, AccessTokenError, TokenExpiredError } from "../core/api-error";
import JWT from "../core/jwt";
import { KeystoreModel } from "../database/model/Keystore";
import { Types } from "mongoose";
import { getAccessToken, validateTokenData } from "./authUtils";
import validator, { ValidationSource } from "../helpers/validator";
import schema from "./schema";
import asyncHandler from "../helpers/asyncHandler";

const router = express.Router();

export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

    try {
      const payload = await JWT.validate(req.accessToken);
      console.log(payload);
      validateTokenData(payload);

      const user = await UserModel.findById(new Types.ObjectId(payload.sub));

      if (!user) {
        throw new AuthFailureError("User not registered");
      }
      req.user = user;

      const keystore = await KeystoreModel.findOne({
        client: user,
        primaryKey: payload.prm,
        status: true,
      })
        .lean()
        .exec();
      if (!keystore) throw new AuthFailureError("Invalid access token");
      req.keystore = keystore;

      return next();
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  })
);
