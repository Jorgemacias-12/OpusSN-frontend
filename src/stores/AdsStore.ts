import type { AdCampaign } from "@/types";
import { atom } from "nanostores";

export const $adCampaigns = atom<AdCampaign[]>([
  {
    id: "ads-01",
    name: "CluckinBell-GTA-SA",
    url: "/AdCampaign-CluckinBell-GTASA.webp",
    alt: "Campaña marketing GTA:SA"
  },
  {
    id: "ads-02",
    name: "dekoch-GTA-SA",
    url: "/AdCampaign-DeKoch-GTASA.webp",
    alt: "Campaña marketing 2 GTA:SA"
  },
  {
    id: "ads-03",
    name: "Sprunk-GTA-V",
    url: "/AdCampaign-Lifeinvader-GTAV.webp",
    alt: "Campaña marketing GTA:V"
  },
  {
    id: "ads-04",
    name: "RedWood-GTA-IV",
    url: "/AdCampaign-RedwoodCigarettes-GTAIV.webp",
    alt: "Campaña marketing GTA:IV"
  }
]);