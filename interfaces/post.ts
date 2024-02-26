import type { Comment } from "./comment";
import type { User } from "./user";

export interface Draft {
  title?: string | undefined;
  subtitle?: string | undefined;
  content: string;
  status?: "draft" | undefined;
}

export interface Post {
  id: number;
  title: string;
  subtitle: string;
  author: User;
  content: string;
  comments: Comment[];
  created: string;
  published: string;
  status: "draft" | "published";
}
