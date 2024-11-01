import { ProtectedRequest, PublicRequest } from "app-request";
import { Types } from "mongoose";
import { AuthFailureError, BadRequestError } from "../core/api-error";
import JWT, { JwtPayload } from "../core/jwt";
import crypto from "crypto";
import {
  validateTokenData,
  createTokens,
  getAccessToken,
} from "../auth/authUtils";
import {
  SuccessMsgResponse,
  SuccessResponse,
  TokenRefreshResponse,
} from "../core/api-response";
import { AuthService } from "../services/auth.service";
import { getUserData } from "../helpers/utils";
import User, { UserModel } from "../database/model/User";
import bcrypt from "bcrypt";
import { app, sg, tokenInfo } from "../config/config";
import sendmail from "../helpers/sendmail";

const authService = new AuthService();
class AuthController {
  /* -------------------------------------------------------------------------- */
  /*                                REGISTER USER                               */
  /* -------------------------------------------------------------------------- */
  async register(req: PublicRequest, res: any) {
    const user = await authService.find_user_by_email(req.body.email);
    if (user) throw new BadRequestError("User already registered");

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const { user: createdUser, keystore } = await authService.create_user(
      {
        name: req.body.name,
        email: req.body.email,
        profilePicUrl: req.body.profilePicUrl,
        password: passwordHash,
      } as User,
      accessTokenKey,
      refreshTokenKey
    );

    const tokens = await createTokens(
      createdUser,
      keystore.primaryKey,
      keystore.secondaryKey
    );
    const userData = await getUserData(createdUser);

    new SuccessResponse("Signup Successful", {
      user: userData,
      tokens: tokens,
    }).send(res);
  }

  /* -------------------------------------------------------------------------- */
  /*                                    LOGIN                                   */
  /* -------------------------------------------------------------------------- */
  async login(req: PublicRequest, res: any) {
    const user = await authService.find_user_by_email(req.body.email);
    if (!user) throw new BadRequestError("User not registered");
    if (!user.password) throw new BadRequestError("Credential not set");

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new AuthFailureError("Authentication failure");

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");

    await authService.create_keys(user, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);
    const userData = await getUserData(user);

    new SuccessResponse("Login Success", {
      user: userData,
      tokens: tokens,
    }).send(res);
  }

  /* -------------------------------------------------------------------------- */
  /*                                REFRESH TOKEN                               */
  /* -------------------------------------------------------------------------- */
  async refreshToken(req: ProtectedRequest, res: any) {
    req.accessToken = getAccessToken(req.headers.authorization);

    const accessTokenPayload = await JWT.decode(req.accessToken);
    validateTokenData(accessTokenPayload);

    const user = await authService.find_user_by_id(
      new Types.ObjectId(accessTokenPayload.sub)
    );
    if (!user) throw new AuthFailureError("User not registered");
    req.user = user;

    const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
    validateTokenData(refreshTokenPayload);

    if (accessTokenPayload.sub !== refreshTokenPayload.sub)
      throw new AuthFailureError("Invalid access token");

    const keystore = await authService.find_key_store(
      req.user,
      accessTokenPayload.prm,
      refreshTokenPayload.prm
    );

    if (!keystore) throw new AuthFailureError("Invalid access token");
    await authService.remove_key_by_id(keystore._id);

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");

    await authService.create_keys(req.user, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(
      req.user,
      accessTokenKey,
      refreshTokenKey
    );

    new TokenRefreshResponse(
      "Token Issued",
      tokens.accessToken,
      tokens.refreshToken
    ).send(res);
  }

  /* -------------------------------------------------------------------------- */
  /*                               FORGOT PASWORD                               */
  /* -------------------------------------------------------------------------- */

  async forgotPassword(req: PublicRequest, res: any) {
    const user = await authService.find_user_by_email(req.body.email);
    if (!user) throw new BadRequestError("User not registered");

    // Generate reset password token
    const resetPasswordKey = crypto.randomBytes(64).toString("hex");

    const resetPasswordToken = await JWT.encode(
      new JwtPayload(
        tokenInfo.issuer,
        tokenInfo.audience,
        user._id.toString(),
        resetPasswordKey,
        tokenInfo.accessTokenValidity
      )
    );

    await UserModel.findByIdAndUpdate(user._id, {
      reset_password_token: resetPasswordToken,
    });

    const emailData = {
      from: { email: sg.mailFrom, name: "SaaS Starter Kit" },
      to: user.email,
      subject: "Reset Password",
      html: `<strong>To reset your password  <a href="${app.clientURL}/reset-password/${resetPasswordToken}"> </a>${app.clientURL}/reset-password/${resetPasswordToken} </strong>`,
    };

    await sendmail(emailData);

    new SuccessMsgResponse("Reset token sent to email").send(res);
  }

  /* -------------------------------------------------------------------------- */
  /*                               RESET_PASSWORD                               */
  /* -------------------------------------------------------------------------- */
  async resetPassword(req: PublicRequest, res: any) {
    const token = req.body.resetPasswordToken;

    const resetTokenPayload = await JWT.decode(token);
    validateTokenData(resetTokenPayload);

    const user = await authService.find_user_by_id(
      new Types.ObjectId(resetTokenPayload.sub)
    );

    if (!user) throw new BadRequestError("User not registered");

    if (user.reset_password_token !== token) {
      throw new BadRequestError("Invalid reset token");
    }

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    await authService.remove_all_keys_for_client(user);
    await authService.create_keys(user, accessTokenKey, refreshTokenKey);

    await authService.update_user_info({
      _id: user._id,
      password: passwordHash,
      reset_password_token: "",
    });

    new SuccessMsgResponse("Password reset successful").send(res);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   LOGOUT                                   */
  /* -------------------------------------------------------------------------- */

  async logout(req: ProtectedRequest, res: any) {
    console.log("dfasf");
    await authService.remove_key_by_id(req.keystore._id);
    new SuccessMsgResponse("Logout success").send(res);
  }
}

export default AuthController;
