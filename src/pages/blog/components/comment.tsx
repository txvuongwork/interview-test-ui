import { Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { DATE_FORMATS } from "@/constants";
import { formatWithDateFns } from "@/lib/utils";
import type { TComment } from "@/types";
import { formatDistanceToNow } from "date-fns";
import type { FunctionComponent } from "react";

type CommentProps = {
  comment: TComment;
};

export const Comment: FunctionComponent<CommentProps> = ({ comment }) => {
  const user = comment.user;

  return (
    <div className="w-full flex items-start gap-2">
      <img
        src={user.avatar}
        alt={user.firstName}
        className="size-8 rounded-full shrink-0 object-cover object-center shadown"
      />
      <div className="flex flex-col gap-1 items-start justify-start flex-1 bg-postvibe-gray-2 p-3 rounded-md">
        <div className="w-full flex items-center justify-between gap-2">
          <span className="font-bold text-black text-base">{`${user.firstName} ${user.lastName}`}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.createdDate))}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {formatWithDateFns(
                new Date(comment.createdDate),
                DATE_FORMATS.DATE_TIME
              )}
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-base text-gray-500">{comment.content}</p>
      </div>
    </div>
  );
};
