export type WordpressPostResponseObject = {
  id: string;
  date: string;
  featuredImage: null | {
    node: {
      mediaItemUrl: string;
    };
  };
  content: string;
  title: string;
  slug: DataTransferItemList;
  author: {
    node: {
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  categories: {
    edges: {
      node: {
        name: string;
      };
    }[];
  };
};

export type WordpressPost = {
  id: string;
  date: string;
  title: string;
  slug: string;
  featuredImage: string | null;
  categories: string[];
  authorName: string;
  authorImg: string;
  description: string;
};

export type WordpressPostQueryReturnType = {
  edges: {
    node: WordpressPostResponseObject;
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
