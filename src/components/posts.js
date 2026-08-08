import post from "./post.js";

export default function posts(p, wrapper) {
  wrapper.innerHTML = "";
  const title = document.createElement("h2");
  title.innerText = "Посты";
  title.classList.add("h4");
  const postMass = document.createElement("div");
  postMass.classList.add("border-0");
  postMass.appendChild(title);
  p.forEach((el) => {
    //p - массив постов [{post 1}, {post2}, {name: , text: , href: , id:}]
    post(el.feedID, el.id, el.title, el.description, el.link, postMass);
  });
  wrapper.appendChild(postMass);
  console.log(p);
}
