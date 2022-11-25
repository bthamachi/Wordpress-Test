import { CategoryNode, WordpressPost } from "../types/wp";
import ArticleCard from "./ArticleCard";
import Sidebar from "./Sidebar";

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
              <div className="grid grid-cols-12 gap-y-8 md:gap-x-8">
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
          <Sidebar
            categoryCounts={categoryCounts}
            categories={categories}
            popularPosts={popularPosts}
          />
        </div>
      </div>
    </section>
  );
};

export default Blog;
