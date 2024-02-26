export interface User {
  id: string;
  username: string;
  name: string;
  posts: Post[];
  comments: Comment[];
  settings: Settings;
}

export interface Settings {
  pageTitle: string;
  pageColor: string;
  textColor: string;
  fontFamily: { name: string; value: string };
  fontSize: number;
  headerImage: string;
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

export interface Comment {
  id: string;
  author: User;
  text: string;
  created: string;
  replies: Comment[];
  post: Post;
  status: "pending" | "approved" | "trash";
}
