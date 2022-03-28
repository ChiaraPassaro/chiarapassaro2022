<template>
  <div>
    <svg
      version="1.1"
      id="Livello_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 162.9 110.1"
      style="enable-background: new 0 0 162.9 110.1"
      xml:space="preserve"
    >
      <path
        id="loading0"
        d="M94.8,82.2H18.3c-7.2,0-13.1-5.9-13.1-13.1V16.6c0-7.2,5.9-13.1,13.1-13.1h76.5c7.2,0,13.1,5.9,13.1,13.1v52.5
	C107.9,76.3,102,82.2,94.8,82.2z"
      />
      <linearGradient
        id="loading-gradient1"
        gradientUnits="userSpaceOnUse"
        x1="20.9684"
        y1="21.2881"
        x2="35.9862"
        y2="6.2702"
      >
        <stop offset="0" :style="`stop-color: ${color.start}`" />
        <stop offset="1" :style="`stop-color: ${color.stop}`" />
      </linearGradient>
      <path
        id="loading1"
        d="M21.7,13.8c0,1.9-1.5,3.4-3.4,3.4c-1.9,0-3.4-1.5-3.4-3.4c0-1.9,1.5-3.4,3.4-3.4C20.2,10.4,21.7,11.9,21.7,13.8
	z M28.5,10.4c-1.9,0-3.4,1.5-3.4,3.4c0,1.9,1.5,3.4,3.4,3.4c1.9,0,3.4-1.5,3.4-3.4C31.9,11.9,30.4,10.4,28.5,10.4z M38.7,10.4
	c-1.9,0-3.4,1.5-3.4,3.4c0,1.9,1.5,3.4,3.4,3.4c1.9,0,3.4-1.5,3.4-3.4C42.1,11.9,40.6,10.4,38.7,10.4z"
      />
      <linearGradient
        id="loading-gradient2"
        gradientUnits="userSpaceOnUse"
        x1="25.0345"
        y1="96.4435"
        x2="118.5796"
        y2="2.8984"
      >
        <stop offset="0" :style="`stop-color: ${color.start}`" />
        <stop offset="1" :style="`stop-color: ${color.stop}`" />
      </linearGradient>
      <path
        id="loading2"
        d="M154.6,39.7l-25.4-6.1c-2.2-0.5-4.3,0.8-4.8,3l-5.7,23.7c-0.5,2.2,0.8,4.3,3,4.8c2.2,0.5,4.3-0.8,4.8-3l4-16.7
	c5.3,6.4,8,14.4,7.4,22.8c-0.6,8.6-4.5,16.4-11,22c-13.4,11.6-33.8,10.2-45.4-3.2c-0.9-1.1-1.8-2.2-2.6-3.4h15.9
	c8,0,14.6-6.5,14.6-14.6V16.6c0-8-6.5-14.6-14.6-14.6H18.3c-8,0-14.6,6.5-14.6,14.6v52.5c0,8,6.5,14.6,14.6,14.6h51.4
	c1.5,3.1,3.4,6,5.8,8.7c5.6,6.4,12.8,10.8,20.9,12.7c2.2,0.5,4.4,0.9,6.6,1c10.7,0.7,21.1-2.7,29.2-9.8c8.1-7,13-16.8,13.7-27.5
	c0.6-8.7-1.6-17.2-6.2-24.4l13.1,3.1c2.2,0.5,4.3-0.8,4.8-3C158.1,42.4,156.7,40.2,154.6,39.7z M6.7,16.6C6.7,10.2,11.9,5,18.3,5
	h76.5c6.4,0,11.6,5.2,11.6,11.6V21H6.7V16.6z M18.3,80.7c-6.4,0-11.6-5.2-11.6-11.6V22h99.7v47.1c0,6.4-5.2,11.6-11.6,11.6H77.2
	c-2.7-5.2-3.9-11-3.5-16.9c0.6-8.6,4.5-16.4,11-22c1.7-1.5,1.8-4,0.4-5.7c-1.5-1.7-4-1.8-5.7-0.4c-8.1,7-13,16.8-13.7,27.5
	c-0.4,6.1,0.5,12,2.7,17.5H18.3z"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps(["color"]);
</script>

<style lang="scss" scoped>
svg {
  position: relative;
  width: 20%;
  animation-name: loading-anim;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
#loading0 {
  fill: none;
}

#loading1 {
  fill: url(#loading-gradient1);
}

#loading2 {
  fill: url(#loading-gradient2);
}
@keyframes loading-anim {
  0% {
    left: 0;
    top: 0;
  }
  50% {
    left: 1em;
    top: 0.4em;
  }
  100% {
    left: 0;
    top: 0;
  }
}
</style>
