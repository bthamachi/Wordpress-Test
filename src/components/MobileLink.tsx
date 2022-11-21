type MobileLinkProps = {
  href: string;
  name: string;
};

const MobileLink = ({ href, name }: MobileLinkProps) => {
  return (
    <a
      href={href}
      className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
    >
      <div className="text-base font-medium">{name}</div>
    </a>
  );
};

export default MobileLink;
