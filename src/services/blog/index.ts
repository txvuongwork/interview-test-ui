import type { TBlog, TListResponse, TResponse } from "@/types";
import api from "@/config/axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

  getBlogByID: async (id: number | string): Promise<TResponse<TBlog>> => {
    return await api.get<TBlog>(`/blogs/${id}`);
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

export const useBlogByID = (id: number | string | undefined) => {
  return useQuery({
    queryKey: [BASE_QUERY_KEYS.BLOGS, "blog", id],
    queryFn: () => blogApi.getBlogByID(id as number | string),
    staleTime: 1000 * 60 * 3,
    enabled: !!id,
  });
};
