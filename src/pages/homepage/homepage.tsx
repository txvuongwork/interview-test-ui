import { BlogCard, Loader } from "@/components";
import { useInfiniteBlogs } from "@/services";
import type { TBlog } from "@/types";
import { queryUtils } from "@/utils";
import { useEffect, useState, useRef } from "react";

export const Homepage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteBlogs();

  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

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
    <div className="w-full py-5 space-y-4 max-w-3xl mx-auto">
      {isPending ? (
        <div className="flex items-center justify-center w-full">
          <Loader />
        </div>
      ) : (
        <>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
          <div ref={bottomRef} className="h-2"></div>
          {isFetchingNextPage && (
            <div className="flex items-center justify-center w-full">
              <Loader />
            </div>
          )}
        </>
      )}
    </div>
  );
};
