import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

export const BASE_QUERY_KEYS = {
  PROFILE: "profile",
  BLOGS: "blogs",
  COMMENTS: "comments",
};
