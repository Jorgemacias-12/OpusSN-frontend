import type { User } from "@/types";
import { atom } from "nanostores";

const testUser: User = {
  id: 1,
  Name: "Juan",
  LastName: "Pérez",
  UserName: "ElChaPo",
  Email: "juanito123@example.com",
  Role: 1
}

export const loggedUser = atom<User | null>(testUser);

export const setLoggedUser = (user: User) => {
  loggedUser.set(user);
}

export const deleteLoggedUser = () => {
  loggedUser.set(null);
}