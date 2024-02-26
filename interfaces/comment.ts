import type { User } from "./user";

export interface Comment {
  id: string;
  author: User;
  text: string;
  created: string;
  replies: Comment[];
  status: "pending" | "approved" | "trash";
}
