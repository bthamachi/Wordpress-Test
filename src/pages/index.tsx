import { WordpressPost } from "../types/wp";
import { getAllPosts } from "../utils/wp";

type HomeProps = {
  posts: WordpressPost[];
};

const Home = ({ posts }: HomeProps) => {
  return (
    <>
      {posts.map((item, index) => {
        return <p key={index}>{item.title}</p>;
      })}
    </>
  );
};

export async function getStaticProps() {
  const data = await getAllPosts();
  const posts = data.edges.map(
    ({ node: { id, date, title, slug, featuredImage } }) => {
      return {
        id,
        date,
        title,
        slug,
        featuredImage,
      };
    }
  );

  return {
    props: {
      posts,
    },
  };
}

export default Home;
