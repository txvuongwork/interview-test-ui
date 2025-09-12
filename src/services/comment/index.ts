import api from "@/config/axios";
import { BASE_QUERY_KEYS } from "@/config/react-query";
import type { TComment, TListResponse, TResponse } from "@/types";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

const PAGE_SIZE = 5;

type TCreateCommentRequest = {
  content: string;
  blogId: number | string;
};

const commentApi = {
  getCommentsByBlogId: async (
    page = 0,
    size = PAGE_SIZE,
    blogId: number | string
  ): Promise<TResponse<TListResponse<TComment>>> => {
    return await api.get<TListResponse<TComment>>("/comments", {
      params: {
        page,
        size,
        blogId,
        sortBy: "createdDate",
        sortDirection: "DESC",
      },
    });
  },

  createComment: async (
    body: TCreateCommentRequest
  ): Promise<TResponse<TComment>> => {
    return await api.post<TComment>("/comments", body);
  },
};

export const useInfiniteComments = (blogId: number | string | undefined) => {
  return useInfiniteQuery({
    queryKey: [BASE_QUERY_KEYS.COMMENTS, blogId],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      commentApi.getCommentsByBlogId(pageParam as number, PAGE_SIZE, blogId!),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.ok) {
        const { currentPage, totalPages } = lastPage.body;
        return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
      }
      return undefined;
    },
    enabled: !!blogId,
  });
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: commentApi.createComment,
  });
};
