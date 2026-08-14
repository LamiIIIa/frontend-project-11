import post from "./post.js";

export default function posts(p, viewed, wrapper) {
  wrapper.innerHTML = "";

  if (p.length === 0) {
    return;
  }
  const title = document.createElement("h2");
  title.innerText = "Посты";
  title.classList.add("h4");
  const postMass = document.createElement("ul");
  postMass.classList.add("list-group", "border-0", "rounded-0");
  postMass.appendChild(title);
  p.forEach((el) => {
    const isViewed = viewed.includes(el.id);
    //p - массив постов [{post 1}, {post2}, {name: , text: , href: , id:}]
    post(el.id, el.title, el.link, isViewed, postMass);
  });

  wrapper.appendChild(title);
  wrapper.appendChild(postMass);
  console.log(p);
}
