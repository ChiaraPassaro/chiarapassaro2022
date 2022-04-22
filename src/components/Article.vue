<script setup>
defineProps(["title", "link", "content"]);
</script>

<template>
  <article>
    <div>
      <h3>
        <a :href="link" target="_blank">{{ title }}</a>
      </h3>
      <div v-html="content"></div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import "../assets/partials/variables";

article {
  display: flex;
  align-items: flex-start;
  gap: 10%;
  width: 40%;
  margin-bottom: 2em;
  word-wrap: break-word;
  @media screen and (max-width: $sm) {
    width: 90%;
  }
  h3 {
    font-size: 1.6em;
    margin: 0;
  }
  a {
    color: white;
    text-decoration: none;
    width: 40%;
    height: 100%;
  }
  > div {
    width: 60%;
  }
  img.thumb {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
    filter: grayscale(1) sepia(0.3);
  }
}
</style>
