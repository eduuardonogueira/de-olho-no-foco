import { Courteus, Flood, Sanitation, Trash } from "@assets/img";
import { EnumPointStatus, IListReport, Report } from "@customtypes/index";

export const useReports = () => {
  const reports: IListReport[] = [
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

  const pointType = {
    sanitation: "saneamento",
    courteous: "desmatamento",
    trash: "lixo",
    flood: "alagamento",
  } as const;

  const pointStatus = {
    PENDING: "pendente",
    APPROVED: "aprovado",
    IN_PROGRESS: "em progresso",
    RESOLVED: "resolvido",
    REJECTED: "rejeitado",
  } as const;

  function translateType(type: Report): string {
    return pointType[type];
  }

  function translateStatus(status: EnumPointStatus): string {
    const statusKey = EnumPointStatus[status] as keyof typeof pointStatus;
    return pointStatus[statusKey];
  }

  return { reports, translateType, translateStatus };
};
