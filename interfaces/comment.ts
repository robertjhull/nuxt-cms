import type { Post } from "./post";
import type { User } from "./user";

export interface Comment {
  id: string;
  author: User;
  content: string;
  parentCommentId?: string | null;
  created: string;
  status: "pending" | "approved" | "trash";
  post: Post;
}
