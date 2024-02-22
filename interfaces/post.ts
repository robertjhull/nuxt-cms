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
  header_img: string;
  img: any[];
  author: User;
  content: string;
  comments: number;
  created: string;
  published: string;
  status: "draft" | "published";
  readers: number;
}
