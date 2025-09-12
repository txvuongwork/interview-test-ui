import { Loader, Separator } from "@/components";
import { DATE_FORMATS } from "@/constants";
import { useAuthenticatedUser } from "@/hooks";
import { formatWithDateFns } from "@/lib/utils";
import { useBlogByID, useInfiniteComments } from "@/services";
import { useEffect, useState, type FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router";
import { Comment, CommentField } from "./components";
import type { TComment } from "@/types";
import { queryUtils } from "@/utils";

export const BlogDetailPage: FunctionComponent = () => {
  const user = useAuthenticatedUser();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const {
    data,
    isFetchingNextPage: isFetchingComments,
    refetch: refetchComments,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteComments(id);
  const { data: response, isFetching } = useBlogByID(id);
  const blog = response?.ok ? response.body : null;

  const [comments, setComments] = useState<TComment[]>([]);

  useEffect(() => {
    if (location.hash && !isFetching && blog) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash, isFetching, blog]);

  useEffect(() => {
    setComments(queryUtils.flattenData(data));
  }, [data]);

  if (isFetching) {
    return (
      <div className="w-full py-5 space-y-4 max-w-4xl mx-auto min-h-40 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-full p-5 max-w-4xl mx-auto min-h-40 bg-white rounded-lg my-5 flex items-center justify-center flex-col gap-2">
        <img src="/images/not-found.png" alt="error" className="size-28" />
        <p className="text-lg text-gray-500 font-semibold">
          {t("blog.notFound")}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full my-5 max-w-4xl mx-auto bg-white rounded-lg">
      <div className="flex items-center gap-2 p-4">
        <img
          src={blog.user.avatar}
          alt={blog.user.firstName}
          className="size-12 rounded-full shrink-0 object-cover object-center shadown"
        />
        <div className="flex flex-col items-start justify-center">
          <span className="font-semibold text-black">{`${blog.user.firstName} ${blog.user.lastName}`}</span>
          <span className="text-xs text-gray-500">
            {formatWithDateFns(
              new Date(blog.createdDate),
              DATE_FORMATS.DATE_TIME
            )}
          </span>
        </div>
      </div>

      <img src={blog.image} alt={blog.title} className="w-full h-auto" />

      <div className="space-y-2 px-10 py-5">
        <h1 className="text-2xl font-bold text-postvibe-gray-1">
          {blog.title}
        </h1>
        <div className="w-full p-2 border-y-2 bg-postvibe-gray-2 border-postvibe-gray-1/30">
          <p className="text-base text-postvibe-gray-1 font-medium">
            {blog.summaryContent}
          </p>
        </div>
      </div>

      <div
        className="w-full bg-white rounded-lg text-justify text-base space-y-3 blog-content__container px-10 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="px-10 my-5 w-full">
        <Separator className="w-full bg-postvibe-gray-1/30" />
      </div>

      <section id="comments" className="px-10 pb-5">
        <div className="w-full flex items-start gap-2">
          <img
            src={user.avatar}
            alt={user.firstName}
            className="size-8 rounded-full shrink-0 object-cover object-center shadown"
          />
          <CommentField
            className="flex-1"
            placeholder={t("blog.commentPlaceholder")}
            blog={blog}
            refetchComments={refetchComments}
          />
        </div>

        <div className="space-y-4 mt-5">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}

          {isFetchingComments && (
            <div className="w-full flex items-center justify-center min-h-10">
              <Loader />
            </div>
          )}

          {hasNextPage && (
            <div className="w-full flex items-center justify-center">
              <button
                type="button"
                className="text-sm text-postvibe-purple cursor-pointer font-medium"
                onClick={() => fetchNextPage()}
              >
                {t("blog.loadMoreComments")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
