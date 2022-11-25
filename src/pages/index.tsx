import Blog from "../componentsV2/Blog";
import Generic from "../Layouts/Generic";
import { CategoryNode, WordpressPost } from "../types/wp";
import { random_sample } from "../utils/arr";
import {
  cleanCategory,
  getAllCategories,
  getCategoryCounts,
  sanitizePostData,
} from "../utils/wp";
import { getAllPosts } from "../utils/wp-server";

type HomeProps = {
  posts: WordpressPost[];
  categories: CategoryNode[];
  categoryCounts: { [key: string]: number };
  popularPosts: WordpressPost[];
};

const Home = ({
  posts,
  categories,
  categoryCounts,
  popularPosts,
}: HomeProps) => {
  return (
    <>
      <Generic posts={posts} categories={categories}>
        <Blog
          posts={posts}
          categoryCounts={categoryCounts}
          popularPosts={popularPosts}
          limit={true}
          categories={categories}
        />
      </Generic>
    </>
  );
};

export async function getStaticProps() {
  //Get Raw Data
  const postData = await getAllPosts();
  const categoriesData = await getAllCategories();

  // Sanitize Data
  const posts = sanitizePostData(postData);

  const categories = cleanCategory(categoriesData);
  const categoriesAsStrings = categories.map((item) => item.name);
  const categoryCounts = getCategoryCounts(posts, categoriesAsStrings);

  const popularPosts = random_sample(posts, 10);

  return {
    props: {
      posts,
      categories,
      categoryCounts,
      popularPosts,
    },
  };
}

export default Home;
