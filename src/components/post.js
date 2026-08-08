export default function post(feedID, id, title, description, href, wrapper) {
  const doPost = document.createElement("div");
  doPost.classList.add(
    "post",
    "d-flex",
    "justify-content-between",
    "aling-items-start",
    "border-0",
    "border-end-0",
    "mt-3"
  );
  const botPost = document.createElement("button");
  botPost.classList.add("btn", "btn-outline-primary", "btn-sm");
  const link = document.createElement("a");
  link.classList.add("fw-bold");
  link.innerText = title;
  link.href = href;
  botPost.innerText = "Просмотр";
  doPost.appendChild(link);
  doPost.appendChild(botPost);
  wrapper.appendChild(doPost);
}
