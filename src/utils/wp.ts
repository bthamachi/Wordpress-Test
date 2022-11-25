import {
  CategoryNode,
  WordpressCategoryReturnType,
  WordpressPost,
  WordpressPostQueryReturnType,
  WordpressPostResponseObject,
} from "../types/wp";

export const INVALID_CATEGORIES = [
  "About",
  "Lower Leg",
  "Uncategorized",
  "What Hurts?",
];

export async function fetchAPI(query: string, variables: any = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { "Content-Type": "application/json" };

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch(process.env.NEXT_PUBLIC_WP_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  // error handling work
  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    console.log("error details", query, variables);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export function filterCategories(categoryList: CategoryNode[]): CategoryNode[] {
  return categoryList.filter((item) => {
    return !INVALID_CATEGORIES.includes(item.name);
  });
}

export function filterCategoryStrings(categoryList: string[]): string[] {
  return categoryList.filter((item) => {
    return !INVALID_CATEGORIES.includes(item);
  });
}

export async function getAllCategories(): Promise<WordpressCategoryReturnType> {
  const data = await fetchAPI(
    `
    query{
      categories(first:100){
        edges{
          node {
            name
            slug
          }
        }
      }
    }
    `
  );
  return data?.categories;
}

export const filterPostsByCategorySlug = (
  posts: WordpressPost[],
  categorySlug: string
) => {
  return posts.filter((post) =>
    post.categories.map((item) => item.slug).includes(categorySlug)
  );
};

export const generateCategoryLinkFromSlug = (slug: string) => {
  return `/category/what-hurts/${encodeURIComponent(slug)}`;
};

export const generateArticleLinkFromSlug = (slug: string) => {
  return `/${encodeURIComponent(slug)}`;
};

export const cleanCategory = (
  categories: WordpressCategoryReturnType
): CategoryNode[] => {
  return filterCategories(
    categories.edges.map(({ node: { name, slug } }) => {
      return {
        name,
        slug,
      };
    })
  );
};

export const sanitizeSinglePost = (post: WordpressPostResponseObject) => {
  const { id, date, title, slug, featuredImage, categories, author, content } =
    post;

  const description =
    content
      .replace(/\/n/gm, "")
      .replace(/<p>/gm, "")
      .replace(/<\/p>/gm, "")
      .replace(/<strong>/gm, "")
      .replace(/<\/strong>/gm, "")
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/&#8217;/gm, "'")
      .replace(/&#8220;/gm, '"')
      .replace(/&#8221;/gm, '"')
      .slice(0, 100)
      .trimEnd() + "...";
  const filteredCategories = filterCategories(
    categories.edges.map(({ node: { name, slug } }) => {
      return {
        name,
        slug,
      };
    })
  );

  return {
    id,
    date,
    title,
    slug,
    featuredImage: featuredImage?.node?.mediaItemUrl,
    categories: filteredCategories,
    authorName: author?.node?.name,
    authorImg: author?.node?.avatar?.url,
    description,
  };
};

export const sanitizePostData = (
  posts: WordpressPostQueryReturnType
): WordpressPost[] => {
  return posts.edges.map(({ node }) => {
    return sanitizeSinglePost(node);
  });
};

export const getCategoryCounts = (
  posts: WordpressPost[],
  categories: string[]
) => {
  const categoryCounts: { [key: string]: number } = {};
  posts.forEach((post) => {
    const filteredCategoryStrings = filterCategoryStrings(
      post.categories.map((item) => item.name)
    );
    filteredCategoryStrings.forEach((categoryString) => {
      if (!categoryCounts[categoryString]) {
        categoryCounts[categoryString] = 0;
      }
      categoryCounts[categoryString] += 1;
    });
  });
  return categoryCounts;
};
