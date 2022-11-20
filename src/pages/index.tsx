import { type NextPage } from "next";
import { getAllPosts } from "../utils/wp";

const Home: NextPage = () => {
  getAllPosts().then((res) => {
    console.log(res);
  });
  return <>Home Page</>;
};

export default Home;
