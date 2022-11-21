import { BlogPostPreview } from "../types/wp";

type BlogPostCardProps = {
  post: BlogPostPreview;
};

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <li key={post.slug} className="flow-root">
      <a
        href={post.slug}
        className="-m-3 flex rounded-lg p-3 hover:bg-gray-100"
      >
        <div className="hidden flex-shrink-0 sm:block">
          <img
            className="h-20 w-32 rounded-md object-cover"
            src={post.imageUrl}
            alt=""
          />
        </div>
        <div className="w-0 flex-1 sm:ml-8">
          <h4 className="truncate text-base font-medium text-gray-900">
            {post.name}
          </h4>
          <p className="mt-1 text-sm text-gray-500">{post.description}</p>
        </div>
      </a>
    </li>
  );
};

export default BlogPostCard;
