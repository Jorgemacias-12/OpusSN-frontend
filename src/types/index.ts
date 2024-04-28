export interface NewUser {
  Name: string;
  LastName: string;
  UserName: string;
  Email: string;
  Password: string;
  Role: number;
}

export interface Category {
  id: number;
  Name: string;
}

export interface CategoryAPIResponse {
  categories: Category[];
  categoryCount: number;
}