import Link from "next/link";
import { WordpressPost } from "../types/wp";
import { generateArticleLinkFromSlug } from "../utils/wp";

type ArticleColumnCardProps = {
  post: WordpressPost;
};

const ArticleColumnCard = ({ post }: ArticleColumnCardProps) => {
  const { featuredImage, title, slug, date } = post;
  return (
    <li className="mb-5">
      <Link className="flex" href={generateArticleLinkFromSlug(slug)}>
        <div className="w-1/3 overflow-hidden rounded">
          <img
            className="h-full w-full scale-100 transform rounded object-cover object-center transition duration-300 ease-out hover:scale-105"
            src={featuredImage}
            alt=""
          />
        </div>
        <div className="flex w-2/3 flex-col items-start justify-center p-2">
          <h3 className="mb-2 font-serif font-thin text-gray-900">{title}</h3>
          <span className="block text-xs font-thin text-gray-800">{date}</span>
        </div>
      </Link>
    </li>
  );
};

export default ArticleColumnCard;
