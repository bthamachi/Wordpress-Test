import Link from "next/link";
import { WordpressPost } from "../types/wp";
import BlogPostCard from "./BlogPostCard";

type HeaderBlogPostCardProps = {
  blogposts: WordpressPost[];
};

const HeaderBlogPostsCard = ({ blogposts }: HeaderBlogPostCardProps) => {
  return (
    <div className="bg-gray-50  px-4 py-8 pb-40 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
      <div>
        <h3 className="text-base font-medium text-gray-500">
          Our Latest Articles
        </h3>
        <ul role="list" className="mt-6 mb-4 space-y-6">
          {blogposts.map((post) => (
            <BlogPostCard key={post.title} post={post} />
          ))}
        </ul>
      </div>
      <div className="mt-6 pb-20 text-sm font-medium">
        <Link href="/">
          <span className="text-indigo-600 hover:text-indigo-500">
            View all posts
            <span aria-hidden="true"> &rarr;</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderBlogPostsCard;
