<template>
  <article>
    <img :src="thumb" :alt="title" />
    <h3>
      <a :href="link" target="_blank">{{ title }}</a>
    </h3>
  </article>
</template>

<script setup>
defineProps(["title", "thumb", "link"]);
</script>

<style lang="scss" scoped>
article {
  display: flex;
  align-items: flex-start;
  gap: 1em;
}
a {
  color: white;
  text-decoration: none;
}
img {
  width: 20%;
  height: 80px;
  object-fit: cover;
  margin-bottom: 1em;
}
</style>
