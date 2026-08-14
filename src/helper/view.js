import { subscribe, snapshot } from "valtio/vanilla";
import status from "../components/status";
import posts from "../components/posts";
import fids from "../components/fids";
import modal from "../components/modal";

export default (watchedState, elements, bible) => {
  console.log("hello!");

  subscribe(watchedState.form, () => {
    const snap = snapshot(watchedState.form);

    if (snap.input) {
      elements.input.classList.add("is-invalid");
    } else {
      elements.input.classList.remove("is-invalid");
    }
    status(snap.status, elements.rssCont, bible);
    console.log("check input");
  });

  subscribe(watchedState, () => {
    const snap = snapshot(watchedState.feeds);

    fids(snap, elements.feedsForm);

    console.log("check feeds", snap);
  });

  subscribe(watchedState, () => {
    //почему не отрабатывает watchedState.posts и watchedState.feeds
    const snap = snapshot(watchedState.posts);
    const viewedSnap = snapshot(watchedState.viewedPost);

    posts(snap, viewedSnap, elements.postsForm);

    console.log("check posts");
  });

  subscribe(watchedState.modal, () => {
    const modalSnap = snapshot(watchedState.modal);
    const postsSnap = snapshot(watchedState.posts);

    const activePost = postsSnap.find(
      (post) => post.id === modalSnap.activePostId
    );

    const onClose = () => {
      watchedState.modal.open = false;
      watchedState.modal.activePostId = null;
    };

    if (modalSnap.open && activePost) {
      modal(
        activePost.title,
        activePost.description,
        activePost.link,
        bible,
        onClose
      );
    }
  });
};
