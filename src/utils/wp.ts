import { WordpressPostQueryReturnType } from "../types/wp";

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

export async function getAllPosts(): Promise<WordpressPostQueryReturnType> {
  const data = await fetchAPI(
    `
        query AllPosts {
            posts(where: { orderby: { field: DATE, order: DESC}}) {
              edges {
                node {
                    id
                    date
                    title
                    slug
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
