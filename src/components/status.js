export default function status(text, stat, wrapper) {
  const st = document.createElement("p");
  st.classList.add(stat);
  st.innerText = text;
  wrapper.appendChild(st);
}
