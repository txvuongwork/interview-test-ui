import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { DATE_FORMATS, ROUTE_PATHS } from "@/constants";
import { formatWithDateFns } from "@/lib/utils";
import type { TBlog } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { generatePath, Link } from "react-router";

interface BlogCardProps {
  blog: TBlog;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link
      to={generatePath(ROUTE_PATHS.POST.DETAIL, { id: blog.id })}
      className="w-full bg-white p-2 rounded-md shadow-sm flex items-stretch gap-4 group hover:border-postvibe-purple duration-300 transition-all border border-transparent hover:ring-postvibe-purple/20 hover:ring-3"
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="w-40 aspect-video object-cover object-center rounded-md shrink-0"
      />

      <div className="flex flex-col items-start justify-between flex-1 gap-4">
        <div className="w-full">
          <h3 className="text-base font-bold line-clamp-2 group-hover:text-postvibe-purple transition-all duration-300">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {blog.summaryContent}
          </p>
        </div>

        <div className="w-full flex items-center gap-2">
          <img
            alt="avatar"
            src={blog.user.avatar}
            className="w-6 h-6 rounded-full shrink-0 object-cover object-center"
          />
          <span className="text-black text-sm font-medium">{`${blog.user.firstName} ${blog.user.lastName}`}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(blog.createdDate))}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              {formatWithDateFns(
                new Date(blog.createdDate),
                DATE_FORMATS.DATE_TIME
              )}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Link>
  );
};
