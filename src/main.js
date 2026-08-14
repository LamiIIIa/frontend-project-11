import { proxy } from "valtio/vanilla";
import * as yup from "yup";
import view from "./helper/view.js";
import i18next from "i18next";
import ru from "./localisation/ru.js";
import parser from "./helper/parser.js";

export default async () => {
  const bible = i18next.createInstance();

  await bible.init({
    lng: "ru",
    resources: {
      ru,
    },
  });

  const rssForm = document.querySelector(".rss-form");

  const elements = {
    rssCont: document.querySelector(".col"),
    rssForm,
    input: rssForm.querySelector("#rss-input"),
    feedsForm: document.querySelector(".feeds"),
    postsForm: document.querySelector(".posts"),
    app: document.querySelector("#app"),
    modalForm: document.querySelector("#app"),
  };

  const state = {
    form: {
      status: "", // invalid, empty, valid
      input: false,
    },
    app: {
      status: "", // exist, notRSS, network
      input: false,
    },
    posts: [],
    feeds: [],
    modal: {
      open: false,
      activePostId: null,
    },
    viewedPost: [],
  };

  const watchedState = proxy(state);

  rssForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const info = data.get("url");

    const schema = yup.string().trim().required("empty").url("invalid");

    try {
      const validUrl = await schema.validate(info);

      const loadFeeds = () => {
        fetch(
          `https://allorigins.hexlet.app/get?url=${encodeURIComponent(
            validUrl
          )}`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }

            throw new Error("network");
          })
          .then((data) => {
            const parsedElements = parser(data.contents);

            if (!parsedElements) {
              throw new Error("notRSS");
            }

            watchedState.feeds.push({ ...parsedElements.feeds, url: validUrl });

            watchedState.posts = [
              ...parsedElements.posts,
              ...watchedState.posts,
            ];

            console.log(watchedState);
          })
          .catch((error) => {
            watchedState.app.status = error.message;
            watchedState.app.input = true;
          });
      };

      const updatePosts = () => {
        watchedState.feeds.forEach((feed) => {
          fetch(
            `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(
              feed.url
            )}`
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              }

              throw new Error("network");
            })
            .then((data) => {
              const parsedElements = parser(data.contents);

              const newPosts = parsedElements.posts.filter(
                (post) =>
                  !watchedState.posts.some(
                    (currentPost) => currentPost.link === post.link
                  )
              );
              watchedState.posts.push(...newPosts);
            });
        });

        setTimeout(updatePosts, 5000);
      };

      watchedState.form.status = "valid";
      watchedState.form.input = false;

      elements.postsForm.addEventListener("click", (event) => {
        const viewButton = event.target.closest(".btn-sm");

        if (!viewButton) {
          return;
        }

        watchedState.modal.open = true;
        watchedState.modal.activePostId = viewButton.dataset.id;
      });

      loadFeeds();
      updatePosts();
    } catch (error) {
      watchedState.form.status = error.message;
      watchedState.form.input = true;
    }
  });

  view(watchedState, elements, bible);
};
