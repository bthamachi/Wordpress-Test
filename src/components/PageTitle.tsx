type PageTitleProps = {
  text: string;
};

const PageTitle = ({ text }: PageTitleProps) => {
  return (
    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
      {text}
    </h2>
  );
};

export default PageTitle;
