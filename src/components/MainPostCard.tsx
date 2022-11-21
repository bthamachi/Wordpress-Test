import { WordpressPost } from "../types/wp";
import AuthorCard from "./AuthorCard";

type MainPostCardProps = {
  post: WordpressPost;
};

const MainPostCard = ({ post }: MainPostCardProps) => {
  console.log(post);
  return (
    <div className="col-span-1  cursor-pointer">
      {post.featuredImage && (
        <img className="w-full lg:w-5/6" src={post.featuredImage} />
      )}
      <div className="px-2">
        <h1 className=" my-4 text-2xl text-base font-bold">{post.title}</h1>
        <AuthorCard
          name={post.authorName}
          date={post.date}
          imgUrl={post.authorImg}
        />
      </div>
    </div>
  );
};

export default MainPostCard;
