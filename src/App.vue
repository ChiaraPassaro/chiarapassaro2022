<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Wave from "@/components/Wave.vue";
</script>

<template>
  <header>
    <Header></Header>

    <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
  </header>
  <div class="wave">
    <Wave></Wave>
  </div>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/style.scss";
</style>
