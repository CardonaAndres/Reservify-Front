import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { router } from "../configs/config.js";

export const useNavLinks = () => {
  const { isAuth } = useAuth();

  // Memoriza los enlaces de navegación basados en `isAuth`
  const navigationLinks = useMemo(() => {
    if (isAuth) {
      return [
        { to: router.myReservations, label: "Mis Reservas" },
      ];
    } else {
      return [

      ];
    }
  }, [isAuth]);

  return navigationLinks;
};
