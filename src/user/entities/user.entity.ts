export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  team?: string;
  chapter?: string;
  role?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
