<template>
  <div class="aside__content">
    <h2>
      <div v-html="markdown"></div>
    </h2>
  </div>
</template>

<script setup>
// vue
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import axios from "axios";

//markdown and highlight
import { marked } from "marked";
import hljs from "highlight.js/lib/core";
import jsHighlight from "highlight.js/lib/languages/javascript";

const route = useRoute();
const name = ref(route.params.name);
const markdown = ref("");

onMounted(() => {
  hljs.registerLanguage("javascript", jsHighlight);
  hljs.highlightAll();
  axios
    .get(`http://${window.location.host}/md/${name.value}.md`)
    .then((result) => {
      markdown.value = marked(result.data, {
        highlight: function (markdown) {
          return hljs.highlightAuto(markdown).value;
        },
        langPrefix: "hljs language-",
      });
    });
});
</script>

<style lang="scss">
@import "highlight.js/scss/github-dark-dimmed.scss";
.aside__content {
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
</style>
