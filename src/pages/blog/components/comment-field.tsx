import { cn } from "@/lib/utils";
import { useCreateComment } from "@/services";
import type { TBlog } from "@/types";
import { Send } from "lucide-react";
import { useState, type FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type CommentFieldProps = {
  className?: string;
  placeholder?: string;
  blog: TBlog;
  refetchComments: () => void;
};

export const CommentField: FunctionComponent<CommentFieldProps> = ({
  className,
  placeholder,
  blog,
  refetchComments,
}) => {
  const { t } = useTranslation();
  const { mutateAsync: createComment, isPending } = useCreateComment();

  const [content, setContent] = useState<string>("");

  const onSubmit = async () => {
    const response = await createComment({
      content,
      blogId: blog.id,
    });

    if (response.ok) {
      setContent("");
      toast.success(t("blog.commentCreated"));
      refetchComments();
    } else {
      toast.error(t(response.error.message));
    }
  };

  return (
    <div
      className={cn(
        "flex items-start border-postvibe-purple border min-w-0 rounded-md bg-transparent shadow-xs transition-[color,box-shadow] outline-none",
        "focus-within:border-postvibe-purple focus-within:ring-postvibe-purple/20 focus-within:ring-[3px]",
        className
      )}
    >
      <textarea
        className="placeholder:text-muted-foreground flex-1 px-3 py-1 border-none outline-none text-sm md:text-base resize-none"
        placeholder={placeholder}
        rows={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="button"
        className="text-postvibe-purple h-full aspect-square w-auto flex items-center justify-center shrink-0 cursor-pointer p-2 disabled:text-gray-500 disabled:cursor-not-allowed"
        disabled={!content || isPending}
        onClick={onSubmit}
      >
        <Send className="size-4" />
      </button>
    </div>
  );
};
