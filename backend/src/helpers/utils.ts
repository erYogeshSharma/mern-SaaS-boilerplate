import { Request } from "express";
import moment from "moment";
import Logger from "../core/Logger";
import User from "../database/model/User";
import _ from "lodash";
export function findIpAddress(req: Request) {
  try {
    if (req.headers["x-forwarded-for"]) {
      return req.headers["x-forwarded-for"].toString().split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
      return req.connection.remoteAddress;
    }
    return req.ip;
  } catch (e) {
    Logger.error(e);
    return undefined;
  }
}

export function addMillisToCurrentDate(millis: number) {
  return moment().add(millis, "ms").toDate();
}

export const enum AccessMode {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
}

export async function getUserData(user: User) {
  const data = _.pick(user, ["_id", "name", "email", "role", "profilePicUrl"]);
  return data;
}
