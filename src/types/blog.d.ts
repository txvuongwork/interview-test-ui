import type { TUser } from "@/types";

export type TBlog = {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  image: string;
  user: TUser;
  summaryContent: string;
  commentCount: number;
};
