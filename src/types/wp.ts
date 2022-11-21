export type WordpressPost = {
  id: string;
  date: string;
  featuredImage: null | {
    node: {
      mediaItemUrl: string;
    };
  };
  title: string;
  slug: DataTransferItemList;
  categories: {
    edges: {
      node: {
        name: string;
      };
    }[];
  };
};

export type WordpressPostQueryReturnType = {
  edges: {
    node: WordpressPost;
  }[];
};

export type BlogPostPreview = {
  slug: string;
  description: string;
  imageUrl: string;
  name: string;
};

export type CategoryNode = {
  name: string;
};

export type WordpressCategoryReturnType = {
  edges: {
    node: CategoryNode;
  }[];
};
