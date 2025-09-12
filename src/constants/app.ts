export const ROUTE_PATHS = {
  ROOT: "/",
  BLOG: {
    ROOT: "/blogs",
    SEARCH: "/blogs/search",
    DETAIL: "/blogs/:id",
  },
  AUTH: {
    ROOT: "/auth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
};

export const APP_CONFIG = {
  NAME: "PostVibe",
  ACCESS_TOKEN_KEY: "interview-test-ui-access-token",
};

export const DATE_FORMATS = {
  DEFAULT: "dd/MM/yyyy",
  DATE_TIME: "dd/MM/yyyy HH:mm:ss",
};
