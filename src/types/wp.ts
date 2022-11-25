export type WordpressPostResponseObject = {
  id: string;
  date: string;
  featuredImage:
    | undefined
    | {
        node: {
          mediaItemUrl: string;
        };
      };
  content: string;
  title: string;
  slug: string;
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
        slug: string;
      };
    }[];
  };
};

export interface WordpressPostWithContent extends WordpressPost {
  content: string;
}

export type WordpressPost = {
  id: string;
  date: string;
  title: string;
  slug: string;
  featuredImage: string | undefined;
  categories: CategoryNode[];
  authorName: string;
  authorImg: string;
  description: string;
};

export type IdAndSlug = {
  id: string;
  slug: string;
};

export type WordpressPostQueryReturnType = {
  edges: {
    node: WordpressPostResponseObject;
  }[];
};

export type CategoryNode = {
  name: string;
  slug: string;
};

export type WordpressCategoryReturnType = {
  edges: {
    node: CategoryNode;
  }[];
};
