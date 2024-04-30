import type { AdCampaign } from "@/types";
import { atom } from "nanostores";

export const $adCampaigns = atom<AdCampaign[]>([
  {
    id: "ads-01",
    name: "CluckinBell-GTA-SA",
    url: "ads/AdCampaign-CluckinBell-GTASA.webp",
    alt: "Campaña marketing GTA:SA"
  },
  {
    id: "ads-02",
    name: "dekoch-GTA-SA",
    url: "ads/AdCampaign-DeKoch-GTASA.webp",
    alt: "Campaña marketing 2 GTA:SA"
  },
  {
    id: "ads-03",
    name: "Sprunk-GTA-V",
    url: "ads/AdCampaign-Lifeinvader-GTAV.webp",
    alt: "Campaña marketing GTA:V"
  },
  {
    id: "ads-04",
    name: "RedWood-GTA-IV",
    url: "ads/AdCampaign-RedwoodCigarettes-GTAIV.webp",
    alt: "Campaña marketing GTA:IV"
  }
]);