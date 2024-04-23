export interface User {
  id: number;
  Name: string;
  LastName: string;
  UserName: string;
  Email: string;
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