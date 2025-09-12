import type { TBlog, TUser } from "@/types";

export type TComment = {
  id: number;
  content: string;
  createdDate: string;
  user: TUser;
  blog: TBlog;
};
