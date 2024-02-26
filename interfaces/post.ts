import type { Comment } from "./comment";
import type { User } from "./user";

export interface Post {
  id: number;
  title: string;
  author: User;
  content: string;
  comments: Comment[];
  created: string;
  published: string;
  status: "draft" | "published";
}
