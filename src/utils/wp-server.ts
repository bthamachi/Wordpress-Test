import fs from "fs";
import {
  WordpressPostQueryReturnType,
  WordpressPostResponseObject,
} from "../types/wp";
import { fetchAPI } from "./wp";

export async function getPostByPostId(
  id: string
): Promise<WordpressPostResponseObject> {
  const data = await fetchAPI(
    `
        query singlePost {
            post(id: "${id}") {
              id
              date
              title
              slug
              excerpt
              content
              categories {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
              author {
                node {
                  name
                  avatar {
                    url
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
        `
  );

  return data.post;
}

export async function getAllPostIdsAndSlugs(): Promise<
  { node: { id: string; slug: string } }[]
> {
  const data = await fetchAPI(
    `
    query allPosts {
        posts(first: 1000, where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }        
    `
  );

  return data.posts.edges;
}

export async function getAllPosts(
  cache = true
): Promise<WordpressPostQueryReturnType> {
  // Step 1 : Check if we have an existing cached version

  const cachePath = `${process.cwd()}/.next/cache/posts.json`;

  if (fs.existsSync(cachePath)) {
    const cachedData = fs.readFileSync(cachePath, "utf-8");
    const json = JSON.parse(cachedData);

    const prevWrite = new Date(json.cacheDate);
    const currTime = new Date();

    // 2 Minute Cache Timing
    if (cache && currTime.getTime() - prevWrite.getTime() < 60000 * 2) {
      return json.data;
    }
  }

  const data = await fetchAPI(
    `
        query AllPosts {
          posts(first:1000, where: {orderby: {field: DATE, order: DESC}}) {
            edges {
              node {
                id
                date
                title
                slug
                excerpt
                content
                categories {
                  edges {
                    node {
                      name
                      slug
                    }
                  }
                }
                author{
                  node{
                    name
                    avatar{
                     url 
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

  const parsedJson = JSON.stringify({
    data: data.posts,
  });

  fs.writeFileSync(cachePath, parsedJson);

  return data?.posts;
}
