import { proxy } from "valtio/vanilla";
import * as yup from "yup";
import view from "./helper/view.js";
import i18next from "i18next";
import ru from "./localisation/ru.js";
import parser from "./helper/parser.js";
import posts from "./components/posts.js";

export default async () => {
  const bible = await i18next.createInstance();

  bible
    .init({
      lng: "ru",
      resources: {
        ru,
      },
    })
    .then(console.log(bible));

  const rssForm = document.querySelector(".rss-form");

  const elements = {
    rssCont: document.querySelector(".col"),
    rssForm,
    input: rssForm.querySelector("#rss-input"),
    feedsForm: document.querySelector(".feeds"),
    postsForm: document.querySelector(".posts"),
  };

  const state = {
    form: {
      //ошибки отправки формы (пустая, невалидная ссылка)
      status: "", //invalid, empty
      input: false,
    },
    app: {
      //ошибки приложения (ссылка уже есть, не является RSS и т. д.)
      status: "", // exist, notRSS
      input: false,
    },
    posts: [],
    feeds: [],
    modal: { open: false, activePostId: null },
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

      fetch(
        `https://allorigins.hexlet.app/get?url=${encodeURIComponent(validUrl)}`
      )
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          const elements = parser(data.contents);

          watchedState.feeds.push(elements.feeds);
          watchedState.posts = [...elements.posts, ...watchedState.posts];

          console.log(watchedState);
        });

      console.log(validUrl);
      watchedState.form.status = "valid";
      watchedState.form.input = false;
    } catch (error) {
      watchedState.form.status = error.message;
      watchedState.form.input = true;
    }
  });

  view(watchedState, elements, bible);
};
