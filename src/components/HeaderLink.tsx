import Link from "next/link";

type HeaderLinkProps = {
  name: string;
  href: string;
};

const HeaderLink = ({ name, href }: HeaderLinkProps) => {
  return (
    <Link href={href}>
      <p
        style={{
          color: "#1192c1",
        }}
        className="
      group inline-flex
      items-center rounded-md text-base font-medium hover:cursor-pointer hover:text-gray-900 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {name}
      </p>
    </Link>
  );
};

export default HeaderLink;
