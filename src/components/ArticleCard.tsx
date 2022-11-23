import { format, parseJSON } from "date-fns";
import { WordpressPost } from "../types/wp";

type ArticleCardProp = {
  post: WordpressPost;
  hideDate: boolean;
};

const ArticleCard = ({
  post: { featuredImage, title, date, authorImg, authorName, description },
  hideDate,
}: ArticleCardProp) => {
  return (
    <div className="grid cursor-pointer grid-cols-4 gap-x-3">
      {featuredImage && (
        <img
          className="col-span-2 h-32 w-40 object-cover md:col-span-1"
          src={featuredImage}
        />
      )}
      <div className="col-span-2 md:col-span-3">
        <p className="text-2xl text-base font-bold md:font-bold">{title}</p>
        <p className="text-gray-800">
          {format(parseJSON(date), "MMM dd, yyyy")}
        </p>

        <p className="text-md hidden text-justify text-base text-gray-700 lg:block	">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;
