import { useRouter } from "next/router";
import PageTitle from "../../../components/PageTitle";
import SectionTitle from "../../../components/SectionTitle";
import Blog from "../../../componentsV2/Blog";
import Generic from "../../../Layouts/Generic";
import { CategoryNode, WordpressPost } from "../../../types/wp";
import { random_sample } from "../../../utils/arr";
import { capitalizeFirstLetter } from "../../../utils/strings";
import {
  cleanCategory,
  filterPostsByCategorySlug,
  getAllCategories,
  getAllPosts,
  getCategoryCounts,
  sanitizePostData,
} from "../../../utils/wp";

type CategoryPageProps = {
  posts: WordpressPost[];
  categories: CategoryNode[];
  categoryCounts: { [key: string]: number };
  popularPosts: WordpressPost[];
};

const Category = ({
  posts,
  categories,
  categoryCounts,
  popularPosts,
}: CategoryPageProps) => {
  const router = useRouter();
  const categoryName = router.query.categoryName as string;
  return (
    <>
      <Generic posts={posts} categories={categories}>
        <PageTitle text={capitalizeFirstLetter(categoryName)} />
        <SectionTitle
          text={`Currently viewing articles that have been tagged with ${categoryName}`}
        />
        <Blog
          categories={categories}
          posts={posts}
          categoryCounts={categoryCounts}
          popularPosts={popularPosts}
          limit={false}
        />
      </Generic>
    </>
  );
};

export const getStaticPaths = async () => {
  const categoriesData = await getAllCategories();
  const names = categoriesData.edges.map((item) => item.node.name);
  const paths = cleanCategory(categoriesData).map((item) => {
    return {
      params: {
        categoryName: item.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

type paramType = {
  params: {
    categoryName: string;
  };
};

export async function getStaticProps({ params }: paramType) {
  const categoryName = params.categoryName;
  //Get Raw Data
  const postData = await getAllPosts();
  const categoriesData = await getAllCategories();

  // Sanitize Data
  const posts = sanitizePostData(postData);
  const categories = cleanCategory(categoriesData);
  const categoriesAsStrings = categories.map((item) => item.name);
  const categoryCounts = getCategoryCounts(posts, categoriesAsStrings);

  // Filter By Category
  const filteredPosts = filterPostsByCategorySlug(posts, categoryName);
  const popularPosts = random_sample(posts, 10);

  return {
    props: {
      posts: filteredPosts,
      categories,
      categoryCounts,
      popularPosts,
    },
  };
}

export default Category;
