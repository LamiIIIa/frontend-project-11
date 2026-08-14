import fid from "./fid.js";

export default function fids(f, wrapper) {
  wrapper.innerHTML = "";

  if (f.length === 0) {
    return;
  }

  const title = document.createElement("h2");
  title.innerText = "Фиды";
  title.classList.add("h4");
  const fidMass = document.createElement("div");
  fidMass.appendChild(title);
  f.forEach((el) => {
    //f - массив, el - объект {title: , subtitle: , id: }
    fid(el.title, el.description, fidMass);
  });
  wrapper.appendChild(fidMass);
}
