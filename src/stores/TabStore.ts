import type { TabType } from "@/types";
import { persistentAtom } from "@nanostores/persistent";

export const $selectedTab = persistentAtom<TabType>("posts", "posts");
