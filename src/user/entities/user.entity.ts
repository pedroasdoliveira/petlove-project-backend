import { Result } from "src/result/entities/result.entity";

export class User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  team?: string;
  chapter?: string;
  role?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  emailNotification?: string;
  createdAt?: Date;
  updatedAt?: Date;
  profilePicture?: string;
  results?: Result[];
}
