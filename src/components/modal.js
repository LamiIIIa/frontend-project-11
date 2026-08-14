export default (title, description, href, bible, onClose) => {
  const oldModal = document.querySelector("#modal");

  if (oldModal) {
    oldModal.remove();
  }

  const modalField = document.createElement("div");
  const modalDialog = document.createElement("div");
  const modalContent = document.createElement("div");

  const modalHeader = document.createElement("div");
  const modalTitle = document.createElement("p");
  const closeButTop = document.createElement("button");

  const modalBody = document.createElement("div");

  const modalFooter = document.createElement("div");
  const readBut = document.createElement("a");
  const closeButFoot = document.createElement("button");

  modalField.classList.add("modal", "fade", "show");
  modalField.setAttribute("id", "modal");
  modalField.style.display = "block";
  modalDialog.classList.add("modal-dialog");
  modalContent.classList.add("modal-content");

  modalHeader.classList.add("modal-header");
  modalTitle.classList.add("modal-title", "h5");
  modalTitle.innerText = title;
  Object.assign(closeButTop, { type: "button" });
  closeButTop.classList.add("btn-close", "close");
  closeButTop.setAttribute("data-bs-dismiss", "modal");
  closeButTop.setAttribute("aria-label", "Close");

  modalBody.classList.add("modal-body", "text-break");
  modalBody.innerText = description;

  modalFooter.classList.add("modal-footer");
  readBut.classList.add("btn", "btn-primary", "full-article");
  readBut.href = href;
  readBut.target = "_blank";
  readBut.innerText = bible.t("buttons.read");
  Object.assign(closeButFoot, {
    type: "button",
  });
  closeButFoot.classList.add("btn", "btn-secondary");
  closeButFoot.setAttribute("data-bs-dismiss", "modal");
  closeButFoot.innerText = bible.t("buttons.close");

  const closeModal = () => {
    modalField.remove();
    onClose();
  };

  closeButTop.addEventListener("click", closeModal);
  closeButFoot.addEventListener("click", closeModal);

  modalField.appendChild(modalDialog);

  modalDialog.appendChild(modalContent);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButTop);

  modalFooter.appendChild(readBut);
  modalFooter.appendChild(closeButFoot);

  document.body.prepend(modalField);
};
