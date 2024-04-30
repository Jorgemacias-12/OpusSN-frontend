export interface User {
  id: number;
  Name: string;
  LastName: string;
  UserName: string;
  Email: string;
  Password: string;
  Role: number;
}

export interface NewUser extends Omit<User, "id"> { };

export interface SafeUser extends Omit<User, "Password"> { };

export interface LoginData extends Pick<User, "Email" | "Password"> { };

export interface AuthResponse {
  user: SafeUser | null;
  error?: {
    message: string;
  },
  message?: string;
}

export interface Category {
  id: number;
  Name: string;
}

export interface CategoryAPIResponse {
  categories: Category[];
  categoryCount: number;
}