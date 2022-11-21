import { ReactNode } from "react";
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
    </>
  );
};

export default Generic;
