import { HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { CategoryNode } from "../types/wp";
import { generateCategoryLinkFromSlug } from "../utils/wp";

const pages = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
];

type BreadcrumbsProps = {
  categories: CategoryNode[];
};

const Breadcrumbs = ({ categories }: BreadcrumbsProps) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {categories && categories[0] && (
          <li>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                href={generateCategoryLinkFromSlug(
                  categories[0].slug as string
                )}
              >
                <span className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {categories[0]?.name}
                </span>
              </Link>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
