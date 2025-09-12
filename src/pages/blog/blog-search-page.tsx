import { BlogCard, Loader } from "@/components";
import { useInfiniteBlogs } from "@/services";
import type { TBlog } from "@/types";
import { queryUtils } from "@/utils";
import type { FunctionComponent } from "react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { BlogSearchFilter } from "./components";
import { useTranslation } from "react-i18next";

export const BlogSearchPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearchQuery = searchParams.get("query") || "";
  const currentSortBy = searchParams.get("sort") || "created_date";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteBlogs(
      currentSearchQuery,
      currentSortBy === "created_date_asc" ? "ASC" : "DESC"
    );

  const handleSearch = (searchQuery: string, sortBy: string) => {
    const newParams = new URLSearchParams();
    if (searchQuery.trim()) {
      newParams.set("query", searchQuery.trim());
    }
    if (sortBy !== "created_date") {
      newParams.set("sort", sortBy);
    }
    setSearchParams(newParams);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  useEffect(() => {
    setBlogs(queryUtils.flattenData(data));
  }, [data]);

  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(bottomRef.current);

    return () => {
      observer.disconnect();
    };
  }, [bottomRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full flex-1 my-5 flex flex-col lg:flex-row gap-5 relative">
      <BlogSearchFilter
        onSearch={handleSearch}
        onReset={handleReset}
        initialSearchQuery={currentSearchQuery}
        initialSortBy={currentSortBy}
      />

      <div className="flex-1 space-y-3">
        {isPending ? (
          <div className="flex items-center justify-center w-full">
            <Loader />
          </div>
        ) : (
          <>
            {blogs.length > 0 ? (
              blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
            ) : (
              <div className="flex items-center justify-center w-full bg-white p-2 rounded-md shadow-sm min-h-20">
                <p className="text-gray-500">
                  {t("blog.search.notFound")}
                  <span className="font-bold">{currentSearchQuery}</span>
                </p>
              </div>
            )}
            <div ref={bottomRef} className="h-2"></div>
            {isFetchingNextPage && (
              <div className="flex items-center justify-center w-full">
                <Loader />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
