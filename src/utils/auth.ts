import { queryClient } from "@/config/react-query";
import { APP_CONFIG, ROUTE_PATHS } from "@/constants";

export const authUtils = {
  logout: () => {
    localStorage.removeItem(APP_CONFIG.ACCESS_TOKEN_KEY);
    queryClient.clear();
    window.location.href = ROUTE_PATHS.AUTH.LOGIN;
  },
};
