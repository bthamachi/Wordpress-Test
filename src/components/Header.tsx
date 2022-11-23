import { Disclosure, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment } from "react";

import { CategoryNode, WordpressPost } from "../types/wp";
import { generateCategoryLinkFromSlug } from "../utils/wp";

import HeaderBlogPostsCard from "./HeaderBlogPostsCard";
import HeaderLink from "./HeaderLink";
import MobileLink from "./MobileLink";

function classNames(s1: string, s2: string) {
  return [s1, s2].join("");
}

type HeaderProps = {
  categories: CategoryNode[];
  posts: WordpressPost[];
};

const Header = ({ categories, posts }: HeaderProps) => {
  return (
    <Popover
      style={{
        backgroundColor: "#000000",
      }}
      className="sticky top-0 z-20"
    >
      {({ open }) => (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-30 shadow"
            aria-hidden="true"
          />
          <div className="relative z-20">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 sm:py-5">
              <div>
                <a href="#" className="flex">
                  <span className="text-white">I&apos;m hurt. Now what?</span>
                </a>
              </div>
              <div className="-my-2 -mr-2 md:hidden">
                <Popover.Button
                  style={{
                    color: "#1192c1",
                  }}
                  className="inline-flex items-center justify-center  p-2 text-gray-400  focus:outline-none"
                >
                  <span className="sr-only">Open menu</span>
                  {!open ? (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <XMarkIcon className="h-6 w-6" />
                  )}
                </Popover.Button>
              </div>
              <div className="hidden md:flex">
                <Popover.Group as="nav" className="flex space-x-10">
                  <HeaderLink href="/about-us" name="About Us" />
                  <HeaderLink href="/newsletter" name="Newsletter" />

                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          style={{
                            color: "#1192c1",
                          }}
                          className={classNames(
                            open ? "text-gray-900" : "text-gray-500",
                            "group inline-flex w-full items-center rounded-md  text-base font-medium hover:text-gray-900 focus:outline-none"
                          )}
                        >
                          <span>What Hurts</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? "text-gray-600" : "text-gray-400",
                              "ml-2 h-5 w-5 group-hover:text-gray-500"
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 -translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 -translate-y-1"
                        >
                          <Popover.Panel className="absolute inset-x-0 top-full z-10 hidden transform overflow-auto shadow-lg md:block">
                            <div className="absolute inset-0 flex">
                              <div className="w-1/2 bg-white" />
                              <div className="w-1/2 bg-gray-50" />
                            </div>
                            <div className="relative mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                              <nav className="grid gap-y-10 bg-white px-4 py-8 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
                                <div>
                                  <h3 className="text-base font-medium text-gray-500">
                                    Body Parts
                                  </h3>
                                  <div className="mt-5 ml-2 grid grid-cols-2	gap-y-4">
                                    {categories.map((item) => (
                                      <Link
                                        href={generateCategoryLinkFromSlug(
                                          item.slug
                                        )}
                                      >
                                        <Popover.Button className="group col-span-1 inline-flex w-full items-center rounded-md text-base font-medium hover:cursor-pointer hover:text-gray-900 hover:underline focus:outline-none ">
                                          <p>{item.name}</p>
                                        </Popover.Button>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </nav>
                              <HeaderBlogPostsCard
                                blogposts={posts.slice(0, 3)}
                              />
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </Popover.Group>
              </div>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 top-full z-30 origin-top-right transform transition md:hidden"
            >
              <div
                style={{
                  backgroundColor: "#000000",
                }}
                className="divide-y-2 divide-gray-50 shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <div className="px-5 pb-6 sm:pb-8">
                  <div
                    style={{
                      color: "#1192c1",
                    }}
                    className="pt-2"
                  >
                    <nav>
                      <div className="ml-4 grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                        <MobileLink href="/about-us" name="About Us" />
                        <MobileLink href="/newsletter" name="Newsletter" />
                        <Disclosure>
                          <Disclosure.Button className=" flex items-center">
                            <p className="flex items-center ">What Hurts?</p>
                            <ChevronDownIcon
                              className={classNames(
                                "",
                                "ml-2 h-5 w-5 text-gray-600 group-hover:text-gray-500"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>

                          <Disclosure.Panel className={"ml-4 "}>
                            <div className=" ml-2 grid grid-cols-1 gap-y-4">
                              {categories.map((item) => (
                                <MobileLink
                                  key={item.name}
                                  name={item.name}
                                  href={item.name}
                                />
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </Disclosure>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Header;
