import {
  AREAS_ROUTE,
  HOME_ROUTE,
  NOTIFICATIONS_ROUTE,
  PROFILE_ROUTE,
} from "@constants/routes";
import { Bell, MapPin, Stack, UserCircle } from "@phosphor-icons/react";

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

  return { menuLinks };
};
