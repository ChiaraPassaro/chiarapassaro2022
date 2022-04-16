<script setup>
// vue
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loading from "../components/icons/Loading.vue";
import { state } from "../store";

import axios from "axios";

//markdown and highlight
import { marked } from "marked";
import hljs from "highlight.js/lib/core";
import jsHighlight from "highlight.js/lib/languages/javascript";

const route = useRoute();
const router = useRouter();
const name = ref(route.params.name);

const markdown = ref("");
defineProps(["color"]);

onMounted(() => {
  state.setIsLoading(true);

  hljs.registerLanguage("javascript", jsHighlight);
  hljs.highlightAll();
  const filePath = `${location.protocol}//${window.location.host}/md/${name.value}.md`;

  axios
    .get(filePath)
    .then((result) => {
      let markdownResult = marked(result.data, {
        highlight: function (markdown) {
          return hljs.highlightAuto(markdown).value;
        },
        langPrefix: "hljs language-",
      });
      markdownResult = markdownResult.replaceAll("<img", '<img loading="lazy"');
      markdown.value = markdownResult;

      state.setIsLoading(false);
    })
    .catch(() => {
      state.setIsLoading(false);
      state.setError(true);

      setTimeout(() => {
        state.setError(false);

        router.push({
          name: "home",
        });
      }, 4000);
    });
});
</script>

<template>
  <div class="content">
    <div class="project__content" v-if="!state.isLoading && !state.error">
      <h2 class="content__title">
        {{ name.slice(0, 1).toUpperCase() + name.slice(1, name.length) }}
      </h2>
      <div v-html="markdown"></div>
    </div>

    <!-- error -->
    <div class="project__content" v-else-if="state.error">
      <h2 class="content__title">
        This element {{ route.params.name }} not exists.
      </h2>
      <p>You'll be redirected to the home page</p>
    </div>
    <!-- /error -->

    <!-- loading -->
    <div class="loading" v-else>
      <Loading :color="color" />
    </div>
    <!-- /loading -->
  </div>
</template>

<style lang="scss">
@import "../assets/partials/variables";
@import "../assets/partials/commons";

@import "highlight.js/scss/github-dark-dimmed.scss";

.container .content {
  height: 100%;
  font-size: 1em;
  @media screen and (max-width: $sm) {
    font-size: 0.7em;
  }
}

.project__content {
  h1,
  h2,
  h3,
  h4,
  h5 {
    text-align: left;
    margin: 1.6em 0 1em 0;
  }

  .content__title {
    text-align: left;
  }

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
</style>
