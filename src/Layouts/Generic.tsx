import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { WordpressPost } from "../types/wp";

type GenericProps = {
  categories: any;
  children: ReactNode;
  posts: WordpressPost[];
};

const Generic = ({ children, categories, posts }: GenericProps) => {
  return (
    <>
      <Header categories={categories} posts={posts} />
      <div className="bg-white  pb-20 sm:px-8 lg:px-8 lg:pt-10 lg:pb-28">
        <div className="relative mx-auto max-w-3xl lg:max-w-6xl">
          {children}
        </div>
      </div>

      <Footer categories={categories} />
    </>
  );
};

export default Generic;
