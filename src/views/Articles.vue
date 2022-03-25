<template>
  <div class="content">
    <h2>
      {{ type.slice(0, 1).toUpperCase() + type.slice(1, type.length) }} Articles
    </h2>
    <!-- list articles -->
    <Article
      v-for="(article, index) in state.articles"
      :title="article.title"
      :link="article.link"
      :thumb="article.thumbnail"
      :key="index"
    />
  </div>
</template>

<script setup>
import Article from "../components/Article.vue";
import axios from "axios";
import { reactive, watch, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const state = reactive({ articles: [] });

//Medium Feeds
const username = `chiarapassaro`;
const RSSUrl = `https://medium.com/feed/@${username}`;
const RSSConverter = `https://api.rss2json.com/v1/api.json?rss_url=${RSSUrl}`;
const type = ref(route.params.type);

async function fetchArticle(newType) {
  type.value = newType;
  try {
    const res = await axios.get(RSSConverter);
    if (newType == "all") {
      return (state.articles = res.data.items);
    }

    state.articles = res.data.items.filter((element) => {
      return element.categories.includes(newType);
    });
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
// author:"Chiara Passaro"
// categories:Array[5]
// content:""
// enclosure:Object (empty)
// guid:"https://medium.com/p/35def5ea4b4d"
// link:"https://chiarapassaro.medium.com/ergonomia-su-misura-35def5ea4b4d?source=rss-10d8de27fcc9------2"
// pubDate:"2021-05-30 08:10:17"
// thumbnail:"https://cdn-images-1.medium.com/max/1024/1*fJqnPdbKArw4Hpg0CFiAcA.jpeg"
// title:"Ergonomia su misura:"
</script>

<style lang="scss" scoped>
h2 {
  margin: 2em 0;
}
</style>
