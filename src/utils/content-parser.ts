import { DOMNode, Element } from "html-react-parser";

export const replaceContent = (domNode: DOMNode) => {
  if (!(domNode instanceof Element)) {
    return;
  }
  // Remove the width and height first
  if (domNode.name == "iframe") {
    if (domNode.attribs.hasOwnProperty("height")) {
      delete domNode.attribs["height"];
    }
    if (domNode.attribs.hasOwnProperty("width")) {
      delete domNode.attribs["width"];
    }
  }

  // We add some styling for paragraphs
  if (domNode.name == "p") {
    domNode.attribs["class"] = "prose prose-lg my-4 text-gray-500";
  }
  if (domNode.name == "h1") {
    domNode.attribs["class"] =
      "prose prose-lg text-lg font-bold mt-4 text-gray-800";
  }
  if (domNode.name == "h2") {
    domNode.attribs["class"] =
      "prose prose-lg text-md font-bold mt-4 text-gray-800";
  }
  if (domNode.name == "a") {
    domNode.attribs["class"] = "text-red-400 cursor-pointer";
  }

  // list styling
  if (domNode.name == "ol" || domNode.name == "ul") {
    domNode.attribs["class"] = "list-decimal reset-list-style";
  }

  return domNode;
};
