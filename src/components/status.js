export default function status(stat, wrapper, bible) {
  const statusEl = document.querySelector(".status");

  if (statusEl) {
    statusEl.remove();
  }

  const stText = document.createElement("div");
  const st = document.createElement("p");

  st.classList.add("status", "m-0", "position-absolute", "small");
  if (stat === "empty") {
    st.classList.add("text-danger");
    st.appendChild(stText);
    stText.innerText = bible.t("statuses.empty");
  } else if (stat === "invalid") {
    st.classList.add("text-danger");
    st.appendChild(stText);
    stText.innerText = bible.t("statuses.invalid");
  }

  wrapper.appendChild(st);
}
