type SectionTitleProps = {
  text: string;
};

const SectionTitle = ({ text }: SectionTitleProps) => {
  return <p className="text-md mt-3 text-gray-700 sm:mt-4">{text}</p>;
};

export default SectionTitle;
