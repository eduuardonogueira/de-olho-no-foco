import { Courteus, Flood, Sanitation, Trash } from "@assets/img";
import { HomeReport } from "@customtypes/map";

export const useReports = () => {
  const homeReport: HomeReport[] = [
    {
      image: Sanitation,
      type: "sanitation",
      label: "Saneamento",
    },
    {
      image: Courteus,
      type: "courteous",
      label: "Desmatamento",
    },
    {
      image: Trash,
      type: "trash",
      label: "Lixo",
    },
    {
      image: Flood,
      type: "flood",
      label: "Alagamento",
    },
  ];

  return { homeReport };
};
