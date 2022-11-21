import {
  CategoryNode,
  WordpressCategoryReturnType,
  WordpressPostQueryReturnType,
} from "../types/wp";

export const INVALID_CATEGORIES = ["About", "Lower Leg"];

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

export async function getAllCategories(): Promise<WordpressCategoryReturnType> {
  const data = await fetchAPI(
    `
    query{
      categories{
        edges{
          node {
            name
          }
        }
      }
    }
    `
  );
  return data?.categories;
}

export async function getAllPosts(): Promise<WordpressPostQueryReturnType> {
  // TODO: Refactor this into a pagination call
  const data = await fetchAPI(
    `
      query AllPosts {
        posts(first:3, where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              id
              date
              title
              slug
              categories {
                edges {
                  node {
                    name
                  }
                }
              }
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
        `
  );

  return data?.posts;
}
