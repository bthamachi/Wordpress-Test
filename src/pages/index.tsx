import ArticleCard from "../components/ArticleCard";
import MainPostCard from "../components/MainPostCard";
import PageTitle from "../components/PageTitle";
import SectionTitle from "../components/SectionTitle";
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
        <div className="my-8 hidden md:block">
          <PageTitle text="Articles" />
          <SectionTitle text="Latest" />
        </div>

        <div className="w-full grid-cols-2 md:grid">
          {/* We render the latest post with the main card */}
          {posts && posts[0] && <MainPostCard post={posts[0]} />}
          <div className="grid grid-cols-1">
            {posts &&
              posts.slice(1, 4).map((post) => {
                return (
                  <ArticleCard key={post.title} post={post} hideDate={false} />
                );
              })}
          </div>
        </div>

        <SectionTitle text="Popular" />
        <div className="mx-10 my-10 space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-2 lg:gap-x-8">
          {posts &&
            posts.slice(4, 8).map((post) => {
              return (
                <div key={post.title}>
                  <ArticleCard post={post} hideDate={true} />
                </div>
              );
            })}
        </div>
      </Generic>
    </>
  );
};

export async function getStaticProps() {
  const postData = await getAllPosts();
  const categoriesData = await getAllCategories();
  const posts = postData.edges.map(
    ({
      node: {
        id,
        date,
        title,
        slug,
        featuredImage,
        categories,
        author,
        content,
      },
    }) => {
      return {
        id,
        date,
        title,
        slug,
        featuredImage: featuredImage?.node?.mediaItemUrl,
        categories: categories
          ? categories?.edges.map((item) => {
              return item?.node?.name;
            })
          : [],
        authorName: author?.node?.name,
        authorImg: author?.node?.avatar?.url,
        description:
          content
            .replace(/\/n/gm, "")
            .replace(/<p>/gm, "")
            .replace(/<\/p>/gm, "")
            .replace(/<strong>/gm, "")
            .replace(/<\/strong>/gm, "")
            .slice(0, 100)
            .trimEnd() + "...",
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
