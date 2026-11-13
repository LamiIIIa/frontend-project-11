export default function post(id, title, href, isViewed, wrapper) {
  const doPost = document.createElement("li");
  doPost.classList.add(
    "post",
    "d-flex",
    "justify-content-between",
    "align-items-start",
    "border-0",
    "border-end-0",
    "mt-3"
  );
  const botPost = document.createElement("button");
  botPost.classList.add("btn", "btn-outline-primary", "btn-sm");
  botPost.dataset.id = id;
  const link = document.createElement("a");
  link.innerText = title;
  link.href = href;
  link.dataset.seen = String(isViewed);
  link.setAttribute("aria-label", "title");
  if (isViewed) {
    link.classList.add("fw-normal", "link-secondary");
  } else {
    link.classList.add("fw-bold");
  }
  botPost.innerText = "Просмотр";
  doPost.appendChild(link);
  doPost.appendChild(botPost);
  wrapper.appendChild(doPost);
}
