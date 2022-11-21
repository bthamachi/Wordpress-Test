import Generic from "../Layouts/Generic";
import { CategoryNode, WordpressPost } from "../types/wp";
import { filterCategories, getAllCategories, getAllPosts } from "../utils/wp";

type HomeProps = {
  posts: WordpressPost[];
  categories: CategoryNode[];
};

const Home = ({ posts, categories }: HomeProps) => {
  return (
    <>
      <Generic categories={categories}>
        <p></p>
        {/* {posts.map((item, index) => {
          return (
            <>
              <p key={index}>
                {item.title}{" "}
                <span>
                  |{" "}
                  {item.categories.edges
                    .map((item) => {
                      return item.node.name;
                    })
                    .join(",")}
                </span>
              </p>
            </>
          );
        })} */}
      </Generic>
    </>
  );
};

export async function getStaticProps() {
  const postData = await getAllPosts();
  const categoriesData = await getAllCategories();
  const posts = postData.edges.map(
    ({ node: { id, date, title, slug, featuredImage, categories } }) => {
      return {
        id,
        date,
        title,
        slug,
        featuredImage,
        categories,
      };
    }
  );
  const categories = filterCategories(
    categoriesData.edges.map(({ node: { name } }) => {
      return {
        name,
      };
    })
  );

  return {
    props: {
      posts,
      categories,
    },
  };
}

export default Home;
