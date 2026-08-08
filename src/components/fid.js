export default function fid(title, subtitle, wrapper) {
  const theFid = document.createElement("div");
  const firstTitle = document.createElement("h3");
  const secTitle = document.createElement("p");
  theFid.classList.add("border-0");
  firstTitle.innerText = title;
  firstTitle.classList.add("h6", "m-0");
  secTitle.innerText = subtitle;
  secTitle.classList.add("m-0", "small", "text-black-50");
  theFid.appendChild(firstTitle);
  theFid.appendChild(secTitle);
  wrapper.appendChild(theFid);
}
