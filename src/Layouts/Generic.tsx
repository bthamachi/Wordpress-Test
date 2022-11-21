import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type GenericProps = {
  categories: any;
  children: ReactNode;
};

const Generic = ({ children, categories }: GenericProps) => {
  return (
    <>
      <Header categories={categories} />
      {children}
      <Footer categories={categories} />
    </>
  );
};

export default Generic;
