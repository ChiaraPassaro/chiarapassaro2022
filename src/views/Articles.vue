<script setup>
import Article from "../components/Article.vue";
import axios from "axios";
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loading from "../components/icons/Loading.vue";
import { state } from "../store";
const route = useRoute();
const router = useRouter();
defineProps(["color"]);

//Medium Feeds Setup
const username = `chiarapassaro`;
const RSSUrl = `https://medium.com/feed/@${username}`;
const RSSConverter = `https://corsmedium.herokuapp.com/${RSSUrl}`;
const type = ref(route.params.type);

async function fetchArticle(newType) {
  console.log("fetch");
  type.value = newType;
  state.setIsLoading(true);
  const config = {
    method: "get",
    url: "https://cors-proxy.htmldriven.com/?url=https://medium.com/feed/@chiarapassaro",
    headers: {
      "x-requested-with": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  // try {
  //   console.log(RSSConverter);
  //   const res = await axios({
  //     method: "get",
  //     url: "https://corsmedium.herokuapp.com/https://medium.com/feed/@chiarapassaro",
  //     headers: {
  //       "x-requested-with": "XMLHttpRequest",
  //     },
  //   });

  //   console.log(res);

  //   // if (newType == "all") {
  //   //   state.setIsLoading(false);
  //   //   return state.setArticles(res.data.items);
  //   // }

  //   // state.setArticles(
  //   //   res.data.items.filter((element) => {
  //   //     return element.categories.includes(newType);
  //   //   })
  //   // );

  //   // if (state.articles.length === 0) {
  //   //   state.setError(true);
  //   //   setTimeout(() => {
  //   //     state.setError(false);
  //   //     router.push({
  //   //       name: "home",
  //   //     });
  //   //   }, 4000);
  //   // }
  //   state.setIsLoading(false);
  // } catch (err) {
  //   console.log(err);
  //   router.push({
  //     name: "home",
  //   });
  // }
}

fetchArticle(type.value);

watch(
  () => route.params.aside,
  (newType) => fetchArticle(newType)
);

function filter(content) {
  const div = document.createElement("div");
  div.innerHTML = content;
  return (
    div.textContent.substring(1, 200) || div.innerText.substring(1, 200) || ""
  );
}
</script>

<template>
  <div class="content">
    <h2 class="content__title" v-if="!state.error">
      {{ type.slice(0, 1).toUpperCase() + type.slice(1, type.length) }} Articles
      on <a href="https://medium.com/@chiarapassaro">Medium</a>
    </h2>
    <!-- list articles -->
    <div class="articles__wrapper" v-if="!state.isLoading && !state.error">
      <Article
        v-for="(article, index) in state.articles"
        :title="article.title"
        :link="article.link"
        :thumb="article.thumbnail"
        :key="index"
        :content="filter(article.content)"
      />
    </div>

    <!-- loading -->
    <div class="loading" v-else-if="state.isLoading">
      <Loading :color="color" />
    </div>
    <!-- /loading -->

    <!-- error -->
    <div class="error" v-else-if="state.error">
      <h2 class="content__title">
        The category {{ route.params.type }} not exists.
      </h2>
      <p>You'll be redirected to the home page</p>
    </div>
    <!-- /error -->
  </div>
</template>

<style lang="scss">
@import "../assets/partials/variables";
@import "../assets/partials/commons";

.container .content {
  height: 100%;
  font-size: 1em;
  @media screen and (max-width: $sm) {
    font-size: 0.7em;
  }

  h2.content__title {
    height: 4em;
    margin: 0;
    text-align: left;
  }
}

.articles__wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10%;
}
</style>
