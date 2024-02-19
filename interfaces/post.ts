import type { User } from "./user";

export interface Post {
  id: string;
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
