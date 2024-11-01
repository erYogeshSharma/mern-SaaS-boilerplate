import { Types } from "mongoose";
import { BadRequestError, InternalError } from "../core/api-error";
import Keystore, { KeystoreModel } from "../database/model/Keystore";
import User, { UserModel } from "../database/model/User";
import { ROLE_MAP } from "../constants/role-config";

export class AuthService {
  // Find a user by ID with active status, including email, password, and roles
  async find_user_by_id(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true })
      .select("+email +password +roles +reset_password_token")
      .lean()
      .exec();
  }

  // Find a user by email with active status, including email, password, and roles
  async find_user_by_email(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email })
      .select(
        "+email +password +role +gender +dob +grade +country +state +city +school +bio +hobbies"
      )
      .lean()
      .exec();
  }

  // Create a user with roles and associated keystore
  async create_user(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string
  ): Promise<{ user: User; keystore: Keystore }> {
    const now = new Date();

    user.role = ROLE_MAP.SUPERADMIN; // admin
    user.createdAt = user.updatedAt = now;
    const createdUser = await UserModel.create(user);
    const keystore = await this.create_keys(
      createdUser,
      accessTokenKey,
      refreshTokenKey
    );
    return {
      user: { ...createdUser.toObject(), role: user.role },
      keystore: keystore,
    };
  }

  // Update user info
  async update_user_info(user: Partial<User>): Promise<any> {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { ...user } },
        { new: true }
      )
        .lean()
        .exec();
      return updatedUser;
    } catch (error) {
      throw new BadRequestError(error as string);
    }
  }
  // Find a keystore by primary key
  async find_keystore_for_key(
    client: User,
    key: string
  ): Promise<Keystore | null> {
    return KeystoreModel.findOne({
      client: client,
      primaryKey: key,
      status: true,
    })
      .lean()
      .exec();
  }

  // Find a keystore by user, primary key, and secondary key
  async find_key_store(
    client: User,
    primaryKey: string,
    secondaryKey: string
  ): Promise<Keystore | null> {
    return KeystoreModel.findOne({
      client: client,
      primaryKey: primaryKey,
      secondaryKey: secondaryKey,
    })
      .lean()
      .exec();
  }

  // Create a keystore for the user with primary and secondary keys
  async create_keys(
    client: User,
    primaryKey: string,
    secondaryKey: string
  ): Promise<Keystore> {
    const now = new Date();
    const keystore = await KeystoreModel.create({
      client: client,
      primaryKey: primaryKey,
      secondaryKey: secondaryKey,
      createdAt: now,
      updatedAt: now,
    });
    return keystore.toObject();
  }

  // Remove all keystores for a user
  async remove_all_keys_for_client(client: User) {
    return KeystoreModel.deleteMany({ client: client }).exec();
  }

  // Remove a keystore by ID
  async remove_key_by_id(id: Types.ObjectId): Promise<Keystore | null> {
    return KeystoreModel.findByIdAndDelete(id).lean().exec();
  }
}
