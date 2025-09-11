import { Loader } from "@/components";
import { DATE_FORMATS } from "@/constants";
import { formatWithDateFns } from "@/lib/utils";
import { useBlogByID } from "@/services";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

export const PostDetailPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { data: response, isFetching } = useBlogByID(id);
  const blog = response?.ok ? response.body : null;

  if (isFetching) {
    return (
      <div className="w-full py-5 space-y-4 max-w-3xl mx-auto min-h-40 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-full p-5 max-w-3xl mx-auto min-h-40 bg-white rounded-lg my-5 flex items-center justify-center flex-col gap-2">
        <img src="/images/not-found.png" alt="error" className="size-28" />
        <p className="text-lg text-gray-500 font-semibold">
          {t("blog.notFound")}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full py-5 space-y-4 max-w-3xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{blog.title}</h1>
        <p className="text-base text-gray-500">{blog.summaryContent}</p>
      </div>
      <div className="w-full space-y-2">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto rounded-lg"
        />

        <div className="flex items-center gap-2">
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
      </div>

      <div
        className="w-full bg-white rounded-lg p-4 text-justify text-base space-y-3 blog-content__container"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};
