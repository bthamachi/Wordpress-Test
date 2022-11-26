import parse from "html-react-parser";
import { useRouter } from "next/router";
import AuthorCard from "../components/AuthorCard";
import Breadcrumbs from "../componentsV2/Breadcrumbs";
import Sidebar from "../componentsV2/Sidebar";
import Generic from "../Layouts/Generic";
import { CategoryNode, WordpressPost } from "../types/wp";
import { random_sample } from "../utils/arr";
import { replaceContent } from "../utils/content-parser";

import {
  cleanCategory,
  getAllCategories,
  getCategoryCounts,
  sanitizePostData,
  sanitizeSinglePost,
} from "../utils/wp";
import {
  getAllPostIdsAndSlugs,
  getAllPosts,
  getPostByPostId,
} from "../utils/wp-server";

type ArticleProps = {
  article: WordpressPost;
  content: string;
  categories: CategoryNode[];
  categoryCounts: { [key: string]: number };
  popularPosts: WordpressPost[];
  posts: WordpressPost[];
};

const Article = ({
  article,
  content,
  categories,
  categoryCounts,
  popularPosts,
  posts,
}: ArticleProps) => {
  const router = useRouter();
  if (!content) {
    return null;
  }

  return (
    <>
      <Generic posts={posts} categories={categories}>
        <section className="w-full bg-white">
          <div className="mx-auto max-w-7xl px-4 xl:px-0">
            <div className="mt-10 flex flex-wrap overflow-hidden">
              <div className="w-full overflow-hidden pr-10 md:w-4/6 lg:w-4/6 xl:w-4/6">
                <Breadcrumbs categories={article.categories} />
                <div className="mb-10 mt-8">
                  <h1>
                    <span className="mt-2 block text-left text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                      {article.title}
                    </span>
                    <AuthorCard
                      name={article.authorName}
                      imgUrl={article.authorImg}
                      date={article.date}
                    />
                  </h1>
                </div>
                <div className="max-w-3xl">
                  {parse(content, { replace: replaceContent })}
                </div>
                <div className="my-40"></div>
              </div>

              <Sidebar
                categoryCounts={categoryCounts}
                categories={categories}
                popularPosts={popularPosts}
              />
            </div>
          </div>
        </section>
      </Generic>
    </>
  );
};

export async function getStaticPaths() {
  const postData = await getAllPosts();
  const postSlugs = postData.edges.map(({ node }) => {
    return node.slug;
  });
  const paths = postSlugs.map((articleSlug) => {
    return {
      params: {
        articleSlug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

type ArticleParamProps = {
  params: { articleSlug: string };
};

export async function getStaticProps({ params }: ArticleParamProps) {
  try {
    const articleSlug = params.articleSlug;
    const rawPostAndSlug = await getAllPostIdsAndSlugs();
    const postId = rawPostAndSlug
      .map(({ node }) => {
        return {
          id: node.id,
          slug: node.slug,
        };
      })
      .find((item) => item.slug == articleSlug);

    if (!postId) {
      // Unlikely to happen
      return {
        article: null,
        content: null,
      };
    }

    const rawPostData = await getPostByPostId(postId.id);

    const rawPostsData = await getAllPosts(false);

    const categoriesData = await getAllCategories();

    const post = sanitizeSinglePost(rawPostData);
    const posts = sanitizePostData(rawPostsData);

    const categories = cleanCategory(categoriesData);
    const categoriesAsStrings = categories.map((item) => item.name);
    const categoryCounts = getCategoryCounts(posts, categoriesAsStrings);

    // Filter By Category
    const popularPosts = random_sample(posts, 10);

    return {
      props: {
        article: post,
        content: rawPostData.content,
        categories,
        categoryCounts,
        popularPosts,
        posts,
        articleSlug,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export default Article;
