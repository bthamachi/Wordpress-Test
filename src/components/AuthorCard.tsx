import { format, parseJSON } from "date-fns";

type AuthorCardProps = {
  name: string;
  imgUrl: string;
  date: string;
};

const AuthorCard = ({ name, imgUrl, date }: AuthorCardProps) => {
  return (
    <div className="my-4 flex items-center">
      <img className="h-16  rounded-full" src={imgUrl} />
      <div className="mx-4">
        <p className="font-bold text-gray-700">{name}</p>
        <p>{format(parseJSON(date), "MMM dd, yyyy")}</p>
      </div>
    </div>
  );
};

export default AuthorCard;
