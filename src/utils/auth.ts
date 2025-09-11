import { queryClient } from "@/config/react-query";
import { APP_CONFIG } from "@/constants";

export const authUtils = {
  logout: () => {
    localStorage.removeItem(APP_CONFIG.ACCESS_TOKEN_KEY);
    queryClient.clear();
  },
};
