import Blog from "../componentsV2/Blog";
import Generic from "../Layouts/Generic";
import { CategoryNode, WordpressPost } from "../types/wp";
import { random_sample } from "../utils/arr";
import {
  cleanCategory,
  getAllCategories,
  getAllPosts,
  getCategoryCounts,
  sanitizePostData,
} from "../utils/wp";

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

  console.log(categories);

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

// {/* <Generic categories={categories}>
//         <div className="my-8 hidden lg:block">
//           <PageTitle text="Articles" />
//           <SectionTitle text="Latest" />
//         </div>
//         {/* Smaller Mobile */}
//         <div className="grid grid-cols-1 lg:hidden">
//           <div className="md:mt-10">
//             {posts && <MainPostCard post={posts[0]!} />}
//             <RecentPublications
//               posts={posts.slice(1, Math.min(posts.length, 4))}
//             />
//           </div>
//         </div>

//         {/* Laptop Look */}
//         <div className="hidden w-full grid-cols-2 px-0 lg:grid lg:grid-cols-5">
//           {/* We render the latest post with the main card */}

//           {posts && posts[0] && <MainPostCard post={posts[0]} />}
//           <div className="col-span-2 mt-10 grid grid-cols-1 gap-y-8 px-4 md:mt-0 md:px-0">
//             {posts &&
//               posts.slice(1, 4).map((post) => {
//                 return (
//                   <ArticleCard key={post.title} post={post} hideDate={false} />
//                 );
//               })}
//           </div>
//         </div>
//       </Generic> */}
