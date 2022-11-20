export type WordpressPost = {
  id: string;
  date: string;
  featuredImage: string | null;
  title: string;
  slug: DataTransferItemList;
};

export type WordpressPostQueryReturnType = {
  edges: {
    node: WordpressPost;
  }[];
};
