import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { DATE_FORMATS, ROUTE_PATHS } from "@/constants";
import { formatWithDateFns } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Eye, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router";

interface PostCardProps {
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  content: {
    full: string;
  };
}

export const PostCard = ({ author, createdAt, content }: PostCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(180);
  const contentRef = useRef<HTMLDivElement>(null);

  const onComment = () => {
    navigate(generatePath(ROUTE_PATHS.POST.DETAIL, { id: "1" }));
  };

  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        setContentHeight(180);
      }
    }
  }, [isExpanded]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-5 rounded-md shadow-sm space-y-4">
      <div className="flex items-center gap-2 w-full">
        <img
          alt="avatar"
          src={author.avatar}
          className="w-10 h-10 md:w-14 md:h-14 rounded-full"
        />

        <div className="flex flex-col items-start w-full">
          <p className="text-base font-bold text-postvibe-purple truncate max-w-2/3 w-full">
            {author.name}
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(createdAt))}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {formatWithDateFns(new Date(createdAt), DATE_FORMATS.DATE_TIME)}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        <div
          className="relative overflow-hidden transition-all duration-500 ease-out"
          style={{ height: `${contentHeight}px` }}
        >
          <div
            ref={contentRef}
            dangerouslySetInnerHTML={{
              __html: content.full,
            }}
          />

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none transition-opacity duration-300" />
          )}
        </div>

        {!isExpanded && (
          <div className="flex justify-center pt-2">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(true)}
              className="font-medium rounded-md"
            >
              {t("button.seeMore")}
            </Button>
          </div>
        )}
      </div>

      <div className="w-full border-y border-gray-300 py-1 grid grid-cols-2 gap-2">
        <Button variant="ghost" className="rounded-md">
          <Eye />
          <span>{t("button.viewDetail")}</span>
        </Button>
        <Button variant="ghost" className="rounded-md" onClick={onComment}>
          <MessageCircle />
          <span>{t("button.comment")}</span>
        </Button>
        {/* <img
          alt="avatar"
          src={author.avatar}
          className="w-8 h-8 rounded-full"
        />
        <Input placeholder={t("post.commentPlaceholder")} className="w-full" />
        <Button variant="ghost" size="icon">
          <SendHorizontal />
        </Button> */}
      </div>
    </div>
  );
};
