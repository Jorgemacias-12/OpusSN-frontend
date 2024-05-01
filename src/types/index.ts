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

export interface AdCampaign {
  id: string;
  name: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface NewPost {
  Title: string;
  Content: string;
  CreationDate: Date;
  UpdateDate?: Date;
  Categories: number[];
  User: number;
}

export interface BasePost {
  id: number;
  Title: string;
  Content: string;
  CreationDate: Date;
  UpdateDate?: Date | null;
  Categories: Category[];
  userId: number;
}

export interface PostCreationReponse {
  createdPost: BasePost | null,
  error?: {
    message: string;
  }
}

export interface BasePost {
  id: number;
  Title: string;
  Content: string;
  CreationDate: Date;
  UpdateDate?: Date | null;
  Categories: Category[];
  userId: number;
}

export interface PostsReponse {
  posts: BasePost[] | null;
  postCount?: number;
  error?: {
    message: string;
  }
}
