<script setup></script>

<template>
  <h3 class="content__title">Who</h3>
  <div class="content__content">
    <h4>I am a full stack web developer.</h4>
    <p>
      My career began as a <strong>graphic</strong> and
      <strong>web designer</strong> in 2000, five years later I approached
      <strong>front-end development</strong> and in 2019 I switched to the dark
      side <i class="fa-regular fa-face-grin-wink"></i>
      <strong> back-end development</strong>. <br />
      Since 2019 I have been <strong>teaching</strong> at Boolean Careers and
      managing several teams of teachers at the same time.
    </p>
    <p>
      My daily work consists of creating lessons and exercises, guiding students
      during the course, but also supporting the teachers for five months of
      intensive work.
    </p>
    <p>
      <i class="fa-regular fa-face-grin"></i> Essentially,
      <strong>I prevent and resolve problems</strong>, as I always tell my
      students.
    </p>
    <p>
      <em
        >I enjoy among other things writing, coding, and reading in my spare
        time.</em
      >
    </p>
  </div>

  <h3 class="content__title">Dev Skills</h3>
  <ul class="content__content">
    <li>
      <i class="fa-brands fa-html5"></i> HTML -
      <i class="fa-brands fa-css3"></i> CSS -
      <i class="fa-brands fa-sass"></i> SASS
    </li>
    <li>
      <i class="fa-brands fa-js-square"></i> Javascript -
      <i class="fa-brands fa-vuejs"></i> Vuejs
    </li>
    <li>
      <i class="fa-brands fa-php"></i> PHP -
      <i class="fa-brands fa-laravel"></i> Laravel
    </li>
  </ul>

  <h3 class="content__title">Graphic Skills</h3>
  <ul class="content__content">
    <li>Illustrator</li>
    <li>Photoshop</li>
    <li>Indesign</li>
  </ul>
  <h3 class="content__title">Graph node</h3>
  <div>
    <h4>What is?</h4>
    <p>
      A graph of my interest and projects<br />
      <i class="fa-regular fa-circle-down"></i> Click on node to read more.
    </p>
  </div>
  <h3 class="content__title">Contacts</h3>
  <p>
    <a href="mailto:chiara.passaro@chiarapassaro.dev" target="_blank"
      ><i class="fa-regular fa-envelope"></i> chiara.passaro@chiarapassaro.dev
    </a>
    <br />
    <a
      href="https://www.linkedin.com/in/chiara-passaro-90812b10"
      target="_blank"
      ><i class="fa-brands fa-linkedin"></i> Linkedin
    </a>
  </p>
  <h3 class="content__title">My repos</h3>
  <p>
    <a href="https://github.com/ChiaraPassaro" target="_blank"
      ><i class="fa-brands fa-github"></i> Github
    </a>
  </p>
</template>

<style lang="scss">
:root {
  --start: "";
  --stop: "";
}

//Mixins
@mixin radial {
  text-align: right;
  animation: alternate;
  animation-duration: 2s;
  animation-name: gradient;
  animation-iteration-count: infinite;
  background: radial-gradient(circle, var(--start) 0, var(--stop) 100%);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

a {
  filter: invert(1);
  @include radial;
  text-decoration: none;
  svg {
    color: var(--start);
  }
}

a.mail {
  text-align: left;
}
ul {
  list-style: none;
  li {
    margin-bottom: 0.5em;
  }
}
p {
  margin-bottom: 1em;
}
</style>
