type SectionTitleProps = {
  text: string;
};

const SectionTitle = ({ text }: SectionTitleProps) => {
  return <p className="mt-3 text-3xl text-gray-700 sm:mt-4">{text}</p>;
};

export default SectionTitle;
