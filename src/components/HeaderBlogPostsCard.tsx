import { BlogPostPreview } from "../types/wp";
import BlogPostCard from "./BlogPostCard";

type HeaderBlogPostCardProps = {
  blogposts: BlogPostPreview[];
};

const HeaderBlogPostsCard = ({ blogposts }: HeaderBlogPostCardProps) => {
  return (
    <div className="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
      <div>
        <h3 className="text-base font-medium text-gray-500">
          Our Latest Articles
        </h3>
        <ul role="list" className="mt-6 space-y-6">
          {blogposts.map((post) => (
            <BlogPostCard key={post.name} post={post} />
          ))}
        </ul>
      </div>
      <div className="mt-6 text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-500">
          View all posts
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default HeaderBlogPostsCard;
