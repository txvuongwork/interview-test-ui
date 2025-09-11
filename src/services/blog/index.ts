import type { TBlog, TListResponse, TResponse } from "@/types";
import api from "@/config/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BASE_QUERY_KEYS } from "@/config/react-query";

const PAGE_SIZE = 5;

const blogApi = {
  getBlogs: async (
    page = 0,
    size = PAGE_SIZE
  ): Promise<TResponse<TListResponse<TBlog>>> => {
    return await api.get<TListResponse<TBlog>>("/blogs", {
      params: {
        page,
        size,
      },
    });
  },
};

export const useInfiniteBlogs = () => {
  return useInfiniteQuery({
    queryKey: [BASE_QUERY_KEYS.BLOGS],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => blogApi.getBlogs(pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.ok) {
        const { currentPage, totalPages } = lastPage.body;
        return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
      }
      return undefined;
    },
  });
};
