import { subscribe, snapshot } from "valtio/vanilla";
import status from "../components/status";
import posts from "../components/posts";
import fids from "../components/fids";

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
};
