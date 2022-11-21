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
      <img className="col-span-1  h-32 w-40 object-cover" src={featuredImage} />
      <div className="col-span-3 ">
        <p className="text-2xl text-base font-bold">{title}</p>
        {hideDate ? null : (
          <p className="text-gray-700">
            {format(parseJSON(date), "MMM dd, yyyy")}
          </p>
        )}
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
