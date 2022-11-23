import { useRouter } from "next/router";
import PageTitle from "../../../components/PageTitle";
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
  const categorySlug = router.query.categoryName as string;
  const categoryName = categories.find((item) => item.slug === categorySlug)
    ?.name as string;
  return (
    <>
      <Generic posts={posts} categories={categories}>
        <div className="mt-2 px-2">
          <PageTitle text={capitalizeFirstLetter(categoryName)} />
          <p className="text-md mt-3 text-gray-700 sm:mt-4">
            Currently viewing articles that have been tagged as{" "}
            <span className="ml-1 underline">{categoryName}</span>
          </p>
        </div>

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
