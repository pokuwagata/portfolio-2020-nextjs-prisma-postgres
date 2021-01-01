import { Post, User } from "@prisma/client";

export type PostReqInput = any;

export type PostResponse = any;

export type PostView = {
  post: Pick<Post, "id", "title" | "body" | "updatedAt"> & {
    user: Pick<User, "name">;
  };
};

// export type PostViewResponse = Partial<Post & { User: User }>;
export type PostViewResponse = PostView;
