import uniqueId from "lodash/uniqueId.js";

export default (xml) => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(xml, "application/xml");
  const errorNode = doc.querySelector("parsererror");
  const channel = doc.querySelector("channel");

  switch (
    true //исправить на if
  ) {
    case Boolean(errorNode):
      return null;

    case !channel:
      return null;

    default:
      break;
  }

  const id = uniqueId();

  const feeds = {
    id,
    title: channel.querySelector("title")?.textContent.trim() ?? "",
    description: channel.querySelector("description")?.textContent.trim() ?? "",
  };

  const posts = [...channel.querySelectorAll("item")].map((item) => ({
    feedId: id,
    id: uniqueId(),
    title: item.querySelector("title")?.textContent.trim() ?? "",
    description: item.querySelector("description")?.textContent.trim() ?? "",
    link: item.querySelector("link")?.textContent.trim() ?? "",
  }));

  return {
    feeds,
    posts,
  };
};
