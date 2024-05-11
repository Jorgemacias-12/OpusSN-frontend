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

export interface CommentCreationResponse {
  message?: string;
  comment: Comment;
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

export interface UserCreationResponse {
  message: string;
  newUser: SafeUser | null;
}

export interface BasePost {
  id: number;
  Title: string;
  Content: string;
  CreationDate: Date;
  UpdateDate?: Date | null;
  Categories: Category[];
  userId: number;
  User: User;
}

export interface PostsReponse {
  posts: BasePost[] | null;
  postCount?: number;
  error?: {
    message: string;
  }
}

export interface Comment {
  id: number;
  Content: string;
  CreatedAt: Date;
  postId: number;
  userId: number;
  User: SafeUser;
}

export interface CommentData extends Pick<Comment, "Content" | "postId" | "userId"> { };

export interface CommentError {
  error: string;
}

export type TabType = 'posts' | 'categories';