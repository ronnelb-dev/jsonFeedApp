export type RootStackParamList = {
  Home: undefined;
  Detail: {post: Post};
};

export interface Post {
  userId: number;
  id: number;
  title: string;
  content: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
}