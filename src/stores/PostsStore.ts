import type { PostsReponse } from "@/types";
import { atom } from "nanostores";

export const $posts = atom<PostsReponse | null>(null);