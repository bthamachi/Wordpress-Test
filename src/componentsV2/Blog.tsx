import Link from "next/link";
import { CategoryNode, WordpressPost } from "../types/wp";
import { generateCategoryLinkFromSlug } from "../utils/wp";
import ArticleCard from "./ArticleCard";
import ArticleColumnCard from "./ArticleColumnCard";

type BlogProps = {
  posts: WordpressPost[];
  categoryCounts: { [key: string]: number };
  popularPosts: WordpressPost[];
  limit: boolean;
  categories: CategoryNode[];
};

const Blog = ({
  posts,
  categoryCounts,
  popularPosts,
  categories,
  limit = true,
}: BlogProps) => {
  const paginationLimit = limit ? Math.min(7, posts.length) : posts.length;
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl xl:px-0">
        <div className="mt-10 flex flex-wrap overflow-hidden">
          <div className="w-full overflow-hidden md:w-4/6 lg:w-4/6 xl:w-4/6">
            <div className="ml-2 mr-2 md:mr-4">
              <div className="grid grid-cols-12 gap-8">
                {posts.slice(0, paginationLimit).map((post, index) => {
                  return (
                    <ArticleCard
                      key={index}
                      post={post}
                      mainPost={index === 0}
                    />
                  );
                })}
              </div>
            </div>

            {limit ? (
              <div className="mt-10 text-center">
                <button className="mt-5 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white">
                  See All Articles
                </button>
              </div>
            ) : null}
          </div>
          <div className="mt-12 w-full overflow-hidden md:mt-0 md:w-2/6 lg:w-2/6 xl:w-2/6">
            <div className="ml-2 mr-2 md:ml-4">
              <div className="rounded-lg bg-gray-50 p-7">
                <div className="pb-6 text-left">
                  <h2 className="mb-1 text-lg font-medium text-gray-900">
                    Subscribe to our Newsletter
                  </h2>
                  <span className="block text-xs italic text-gray-500">
                    No Spam. Only one email per week.
                  </span>
                  <form action="">
                    <div className="mt-5 overflow-hidden rounded-lg border-none bg-white">
                      <input
                        className="w-full rounded-lg border-2 border-gray-200 bg-transparent px-3 py-2 placeholder-gray-400 focus:outline-none"
                        type="text"
                        name="name"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="mt-5 overflow-hidden rounded-lg border-none bg-white">
                      <input
                        className="w-full rounded-lg border-2 border-gray-200 bg-transparent px-3 py-2 placeholder-gray-400 focus:outline-none"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-5 w-full rounded-lg bg-gray-900 py-3 text-sm font-medium uppercase tracking-widest text-white"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
              <div className="mt-10">
                <h2 className="mb-5 text-lg font-medium text-gray-900">
                  Categories
                </h2>
                <ul>
                  {Object.keys(categoryCounts).map((name) => {
                    const categorySlug = categories.find(
                      (item) => item.name == name
                    );

                    if (!categorySlug) {
                      throw new Error("Unsupported Column");
                    }

                    return (
                      <li key={name}>
                        <Link
                          className="flex"
                          href={generateCategoryLinkFromSlug(categorySlug.slug)}
                        >
                          <p className="block flex-1 py-2 font-serif text-lg font-thin text-gray-900 hover:underline">
                            {name}
                          </p>
                          <span className="p-2 text-lg font-thin text-gray-700">
                            {categoryCounts[name]}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-12">
                <h2 className="mb-5 text-lg font-medium text-gray-900">
                  Recent Posts
                </h2>
                <ul>
                  {popularPosts.slice(0, 3).map((post) => {
                    return <ArticleColumnCard key={post.title} post={post} />;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
