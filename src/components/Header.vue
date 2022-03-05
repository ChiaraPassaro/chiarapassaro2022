<script setup>
import Wave from "./Wave.vue";
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <header class="header d-flex align-items-center">
    <h1 class="header__title">Chiara Passaro</h1>
    <h2 class="header__subtitle">
      Team Manager, Teacher and <br />
      FULL STACK WEB DEVELOPER
    </h2>
    <Wave class="wave"></Wave>
  </header>
</template>

<style lang="scss">
@use "@/assets/partials/_commons.scss";
.wave {
  position: relative;
}
</style>
