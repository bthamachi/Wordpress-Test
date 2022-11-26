import Link from "next/link";
import { WordpressPost } from "../types/wp";
import { generateArticleLinkFromSlug } from "../utils/wp";

type ArticleCardProps = {
  post: WordpressPost;
  mainPost: boolean;
};

const mainStyle = "relative block h-80 w-full overflow-hidden ";
const nonMainStyle = "mb-3 block h-48 overflow-hidden ";

const mainDivStyle = "col-span-12";
const nonMainDivStyle = "col-span-12 md:col-span-6";

const ArticleCard = ({ post, mainPost = false }: ArticleCardProps) => {
  const { title, description, featuredImage } = post;
  const imageStyling = mainPost ? mainStyle : nonMainStyle;
  const divStyling = mainPost ? mainDivStyle : nonMainDivStyle;
  const postLink = generateArticleLinkFromSlug(post.slug);

  return (
    <div className={divStyling}>
      <Link href={postLink}>
        <div className={imageStyling}>
          <img
            className="h-full w-full scale-100 transform object-cover object-center transition duration-300 ease-out hover:scale-105"
            src={featuredImage}
            alt=""
          />
        </div>
      </Link>

      <h2 className="mb-2 pt-3 pb-1 font-serif text-lg text-gray-900">
        <Link href={postLink}>{title}</Link>
      </h2>
      <p className="mb-3 text-justify text-sm text-gray-800">
        {description}
        <Link legacyBehavior={true} href={postLink}>
          <span className="ml-1 inline inline-flex items-center text-xs text-gray-500 underline">
            Continue Reading
            <svg
              className="ml-1 h-3 w-3 -rotate-45 transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
        </Link>
      </p>
    </div>
  );
};

export default ArticleCard;
