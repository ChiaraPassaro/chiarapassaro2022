<script setup>
import Article from "../components/Article.vue";
import axios from "axios";
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loading from "../components/icons/Loading.vue";
import { state } from "../store";
import useXml2Json from "../composables/useXml2Json";
const route = useRoute();
const router = useRouter();
defineProps(["color"]);

//Medium Feeds Setup
const username = `chiarapassaro`;
const RSSUrl = `https://medium.com/feed/@${username}`;
const RSSConverter = `https://corsmedium.herokuapp.com/${RSSUrl}`;
const type = ref(route.params.type);

async function fetchArticle(newType) {
  type.value = newType;
  state.setIsLoading(true);

  try {
    const res = await axios({
      method: "get",
      url: "https://api.allorigins.win/get?url=https://medium.com/feed/@chiarapassaro",
    });

    const parser = new DOMParser();
    const xml = parser.parseFromString(res.data.contents, "application/xml");

    const data = useXml2Json(xml).rss.channel.item;
    if (newType == "all") {
      state.setIsLoading(false);
      return state.setArticles(data);
    }

    state.setArticles(
      data.filter((element) => {
        return element.category.includes(newType);
      })
    );

    if (state.articles.length === 0) {
      state.setError(true);
      setTimeout(() => {
        state.setError(false);
        router.push({
          name: "home",
        });
      }, 4000);
    }
    state.setIsLoading(false);
  } catch (err) {
    router.push({
      name: "home",
    });
  }
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
    div.textContent.substring(0, 200) || div.innerText.substring(0, 200) || ""
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
