import { CategoryNode } from "../types/wp";
import HeaderLink from "./HeaderLink";

type FooterProps = {
  categories: CategoryNode[];
};

export default function Footer({ categories }: FooterProps) {
  return (
    <footer
      style={{
        backgroundColor: "#000000",
      }}
      className="mt-4"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-8">
          <div className="hidden lg:col-span-3 lg:grid">
            <div className="xl:col-span-1">
              <p className="text-base text-gray-600">
                None of this is to be deemed official medical advice. These are
                the opinions of 2 anonymous cartoons that know a thing or 2.
                This does not replace a consult with your physician. Speak to
                you doctor before completing any type of rehab program.
              </p>
              <p className="mt-4 text-base text-gray-400">
                &copy; 2022 I&apos;m hurt, now what? Inc. All rights reserved.
              </p>
            </div>
          </div>
          <div className="hidden lg:col-span-1 lg:grid xl:col-span-2"></div>
          <div className="col-span-2 mx-4 grid grid-cols-1 gap-y-4 sm:grid-cols-3 lg:col-span-4 lg:mx-0 xl:col-span-3">
            <div className="col-span-1 gap-y-4 md:col-span-2 md:mx-10">
              <h3 className="text-base font-bold text-gray-200">What Hurts</h3>
              <div className="mt-4 grid grid-cols-1 gap-y-4 md:grid-cols-2 ">
                {categories.map((item) => (
                  <HeaderLink
                    key={item.name}
                    name={item.name}
                    href={item.name}
                  />
                ))}
              </div>
            </div>
            <div className="col-span-1 mr-10 ">
              <h3 className="text-base font-bold text-gray-200">Company</h3>
              <div className="mt-4 grid grid-cols-1 gap-y-4">
                <HeaderLink name="About Us" href="about-us" />
                <HeaderLink name="Newsletter" href="newsletter" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pt-8 sm:px-8 lg:hidden">
          <p className="pb-4 text-base text-gray-600">
            None of this is to be deemed official medical advice. These are the
            opinions of 2 anonymous cartoons that know a thing or 2. This does
            not replace a consult with your physician. Speak to you doctor
            before completing any type of rehab program.
          </p>
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2022 I&apos;m hurt, now what? Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
