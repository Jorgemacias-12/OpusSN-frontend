import type { SafeUser } from "@/types";
import { persistentAtom } from "@nanostores/persistent";

export const loggedUser = persistentAtom<SafeUser | null>('loggedUser', null, {
  encode: (value) => JSON.stringify(value),
  decode: (value) => JSON.parse(value)
});