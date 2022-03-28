<script setup>
// vue
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import Loading from "../components/icons/Loading.vue";

import axios from "axios";

//markdown and highlight
import { marked } from "marked";
import hljs from "highlight.js/lib/core";
import jsHighlight from "highlight.js/lib/languages/javascript";

const route = useRoute();
const name = ref(route.params.name);
const state = reactive({ isLoading: false });

const markdown = ref("");
defineProps(["color"]);

onMounted(() => {
  state.isLoading = true;

  hljs.registerLanguage("javascript", jsHighlight);
  hljs.highlightAll();
  axios
    .get(`https://${window.location.host}/md/${name.value}.md`)
    .then((result) => {
      let markdownResult = marked(result.data, {
        highlight: function (markdown) {
          return hljs.highlightAuto(markdown).value;
        },
        langPrefix: "hljs language-",
      });
      markdownResult = markdownResult.replaceAll("<img", '<img loading="lazy"');
      markdown.value = markdownResult;
      state.isLoading = false;
    });
});
</script>

<template>
  <div class="content">
    <div class="project__content" v-if="!state.isLoading">
      <h2>
        <div v-html="markdown"></div>
      </h2>
    </div>
    <!-- loading -->
    <div class="loading" v-else>
      <Loading :color="color" />
    </div>
    <!-- /loading -->
  </div>
</template>

<style lang="scss">
@import "highlight.js/scss/github-dark-dimmed.scss";
.content {
  height: 100%;
}
.project__content {
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 1.6em 0 1em 0;
  }
  font-size: 0.8em;
  pre {
    white-space: pre-wrap; /* css-3 */
    word-wrap: break-word;
  }
  img {
    width: 50%;
  }
  figure video {
    width: 80%;
  }
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
