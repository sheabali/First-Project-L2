import { Model } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
  needPasswordChange: string;
  role: string;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export type NewUser = {
  password: string;
  role: string;
  id: string;
};

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<Boolean>;
}
