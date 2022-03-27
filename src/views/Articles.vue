<template>
  <div class="content">
    <h2 class="content__title">
      {{ type.slice(0, 1).toUpperCase() + type.slice(1, type.length) }} Articles
      on <a href="https://medium.com/@chiarapassaro">Medium</a>
    </h2>
    <!-- list articles -->
    <div class="articles__wrapper" v-if="!state.isLoading">
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
    <div class="loading" v-else>
      <Loading :color="color" />
    </div>
    <!-- /loading -->
  </div>
</template>

<script setup>
import Article from "../components/Article.vue";
import axios from "axios";
import { reactive, watch, ref } from "vue";
import { useRoute } from "vue-router";
import Loading from "../components/Loading.vue";

const route = useRoute();
const state = reactive({ articles: [], isLoading: false });
defineProps(["color"]);

//Medium Feeds
const username = `chiarapassaro`;
const RSSUrl = `https://medium.com/feed/@${username}`;
const RSSConverter = `https://api.rss2json.com/v1/api.json?rss_url=${RSSUrl}`;
const type = ref(route.params.type);
//TODO and errors
async function fetchArticle(newType) {
  type.value = newType;
  state.isLoading = true;
  try {
    const res = await axios.get(RSSConverter);
    if (newType == "all") {
      return (state.articles = res.data.items);
    }

    state.articles = res.data.items.filter((element) => {
      return element.categories.includes(newType);
    });

    state.isLoading = false;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}

fetchArticle(type.value);

watch(
  () => route.params.type,
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

<style lang="scss" scoped>
.content {
  height: 100%;
}
h2.content__title {
  height: 4em;
  margin: 0;
  text-align: left;
}
.articles__wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10%;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
