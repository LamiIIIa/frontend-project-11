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
      status(snap.status, elements.rssCont, bible);
    } else {
      elements.input.classList.remove("is-invalid");
    }

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

    posts(snap, elements.postsForm);

    console.log("check posts");
  });

  subscribe(watchedState, () => {
    const modalSnap = snapshot(watchedState.modal);
    const postsSnap = snapshot(watchedState.posts);

    const activePost = postsSnap.find(
      (post) => post.id === modalSnap.activePostId
    );

    const onClose = () => {
      modalSnap.open = false;
      modalSnap.activePostId = "";
    };

    if (modalSnap.open === true && activePost) {
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
