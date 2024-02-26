import type { Comment } from "./comment";
import type { Post } from "./post";
import type { Settings } from "./settings";

export interface User {
  id: string;
  username: string;
  name: string;
  posts: Post[];
  comments: Comment[];
  settings: Settings;
}
