import type { TListResponse, TResponse } from "@/types";
import type { InfiniteData } from "@tanstack/react-query";

export const queryUtils = {
  flattenData: <T>(
    data: InfiniteData<TResponse<TListResponse<T>>, unknown> | undefined
  ) => {
    if (!data) return [];
    return data.pages.flatMap((page) => {
      if (page.ok) {
        return page.body.items;
      }
      return [];
    });
  },
};
