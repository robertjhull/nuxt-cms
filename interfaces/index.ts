export interface User {
  _id: string;
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
  _id: string;
  title: string;
  subtitle: string;
  authorName: string;
  content: string;
  comments: Comment[];
  created: string;
  published?: string;
  status: "draft" | "published";
}

export interface Comment {
  _id: string;
  authorName: string;
  postTitle: string;
  text: string;
  created: string;
  replies: Comment[];
  post: Post;
  status: "pending" | "approved" | "trash";
  expanded: boolean;
}
