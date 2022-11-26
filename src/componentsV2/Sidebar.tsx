import Link from "next/link";
import { CategoryNode, WordpressPost } from "../types/wp";
import { generateCategoryLinkFromSlug } from "../utils/wp";
import ArticleColumnCard from "./ArticleColumnCard";

type SidebarProps = {
  categoryCounts: { [key: string]: number };
  categories: CategoryNode[];
  popularPosts: WordpressPost[];
};

const Sidebar = ({
  categoryCounts,
  categories,
  popularPosts,
}: SidebarProps) => {
  return (
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
          <h2 className="mb-5 text-lg font-medium text-gray-900">Categories</h2>
          <ul className="list-none">
            {Object.keys(categoryCounts).map((name) => {
              const categorySlug = categories.find((item) => item.name == name);

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
          <ul className="list-none">
            {popularPosts.slice(0, 3).map((post) => {
              return <ArticleColumnCard key={post.title} post={post} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
