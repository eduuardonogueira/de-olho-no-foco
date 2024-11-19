import {
  AREAS_ROUTE,
  HOME_ROUTE,
  LOGOUT_ROUTE,
  NOTIFICATIONS_ROUTE,
  PROFILE_ACHIEVEMENTS_ROUTE,
  PROFILE_HELP_ROUTE,
  PROFILE_HISTORY_ROUTE,
  PROFILE_ROUTE,
  PROFILE_USER_DATA_ROUTE,
} from "@constants/routes";

import {
  Bell,
  MapPin,
  Stack,
  UserCircle,
  FileText,
  Scroll,
  Gear,
  Trophy,
  Question,
  SignOut,
} from "@phosphor-icons/react";

export const useLinks = () => {
  const menuLinks = [
    {
      route: AREAS_ROUTE,
      label: "Áreas",
      icon: Stack,
    },
    {
      route: HOME_ROUTE,
      label: "Pontos",
      icon: MapPin,
    },
    {
      route: NOTIFICATIONS_ROUTE,
      label: "Notificações",
      icon: Bell,
    },
    {
      route: PROFILE_ROUTE,
      label: "Perfil",
      icon: UserCircle,
    },
  ];

  const profileLinks = [
    { label: "Meus dados", route: PROFILE_USER_DATA_ROUTE, icon: FileText },
    { label: "Histórico", route: PROFILE_HISTORY_ROUTE, icon: Scroll },
    {
      label: "Configurações",
      route: PROFILE_HISTORY_ROUTE,
      icon: Gear,
    },
    { label: "Conquistas", route: PROFILE_ACHIEVEMENTS_ROUTE, icon: Trophy },
    { label: "Ajuda", route: PROFILE_HELP_ROUTE, icon: Question },
    {
      label: "Sair",
      route: LOGOUT_ROUTE,
      icon: SignOut,
    },
  ];

  return { menuLinks, profileLinks };
};
