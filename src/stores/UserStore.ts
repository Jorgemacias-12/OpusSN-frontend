import type { SafeUser } from "@/types";
import { atom } from "nanostores";


export const loggedUser = atom<SafeUser | null>(null);

export const setLoggedUser = (user: SafeUser) => {
  loggedUser.set(user);
}

export const deleteLoggedUser = () => {
  loggedUser.set(null);
}