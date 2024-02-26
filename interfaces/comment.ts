import type { Post } from "./post";
import type { User } from "./user";

export interface Comment {
  id: string;
  author: User;
  text: string;
  created: string;
  replies: Comment[];
  post: Post;
  status: "pending" | "approved" | "trash";
}
