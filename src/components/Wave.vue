<template>
  <div class="wave-container">
    <svg
      id="wave-1"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 4526.1 220.4"
      style="enable-background: new 0 0 4526.1 280.4"
      xml:space="preserve"
    >
      <linearGradient
        id="SVGID_1_"
        gradientUnits="userSpaceOnUse"
        x1="122.7286"
        y1="165.9306"
        x2="4649.0391"
        y2="165.9306"
        gradientTransform="matrix(-1 0 0 -1 4648.8281 297.2099)"
      >
        <stop class="stop" offset="0" style="stop-color: #c85b28" />
        <stop class="stop" offset="0.1" style="stop-color: #bd6335" />
        <stop class="stop" offset="0.14" style="stop-color: #a17857" />
        <stop class="stop" offset="0.26" style="stop-color: #749b8e" />
        <stop class="stop" offset="0.33" style="stop-color: #58b0b0" />
        <stop class="stop" offset="0.68" style="stop-color: #b46a41" />
        <stop class="stop" offset="0.75" style="stop-color: #a67552" />
        <stop class="stop" offset="0.9" style="stop-color: #81907e" />
        <stop class="stop" offset="1" style="stop-color: #66a59f" />
      </linearGradient>
      <path
        style="fill: url(#SVGID_1_)"
        class="st0"
        d="M399,151.1c302,48.5,538.8-28.1,812.8-44.1s435,45.1,600.5,64.6s351.5-2.4,429.8-5.8s368.9,5.1,450.6,18.2
	c302,48.4,444.1-56.6,718.1-72.6s329.4,36.3,719.4,80.3c209.6,23.7,395.8-4.9,395.8-4.9l-0.2-12.3c0,0-76.7,5.5-177.4,9
	c-68.3,2.4-253.8-7.2-595.7-82.8s-592.6,42.3-889.1,24.7c-377.4-22.4-469.4,13.8-620.6,22.7c-147.8,8.7-575.5-24-766.2-62.1
	c-88.2-17.6-387.3-53.4-742.6,18.7c-139,28.2-734.5-3.5-734.5-3.5v27.8C-0.2,129.1,97,102.7,399,151.1z"
      />
    </svg>
    <svg
      id="wave-2"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 4526.311 139.661"
      style="enable-background: new 0 0 4526.311 139.661"
      xml:space="preserve"
    >
      <linearGradient
        id="SVGID_2_"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="73.5719"
        x2="4526.3105"
        y2="73.5719"
      >
        <stop class="stop-2" offset="0" style="stop-color: #58b0b0" />
        <stop class="stop-2" offset="0.2" style="stop-color: #749b8e" />
        <stop class="stop-2" offset="0.6" style="stop-color: #b46a41" />
        <stop class="stop-2" offset="0.7" style="stop-color: #a67552" />
        <stop class="stop-2" offset="0.8" style="stop-color: #81907e" />
        <stop class="stop-2" offset="1" style="stop-color: #66a59f" />
      </linearGradient>
      <path
        class="st1"
        style="fill: url(#SVGID_2_)"
        d="M4192.386,44.613c-302-48.5-546,40.923-820,56.923S2907.113,67.22,2741.617,47.69
	s-379.376-15.874-457.671-12.46c-78.295,3.413-494.466-0.575-576.175-13.694c-302-48.4-336.769,42.462-610.769,58.462
	S822.386,68.613,432.386,24.613C222.758,0.963,0,14.265,0,14.265l0.211,12.324c0,0,76.734-5.459,177.362-9.026
	c68.308-2.421,253.791,7.225,595.703,82.811s592.613-42.327,889.113-24.727c377.4,22.4,469.436-13.821,620.622-22.695
	c147.814-8.676,575.532,24.035,766.223,62.114c88.203,17.613,387.34,53.426,742.625-18.699
	c139.023-28.223,734.451,3.485,734.451,3.485v-27.8C4526.311,72.052,4319.184,68.191,4192.386,44.613z"
      />
    </svg>
  </div>
</template>

<script setup>
import anime from "animejs/lib/anime.es.js";
import { onMounted } from "vue";

onMounted(() => {
  anime
    .timeline({
      duration: 5000,
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    })
    .add({ targets: ".stop", offset: "*=2.5" }, 0);

  anime
    .timeline({
      duration: 5000,
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    })
    .add({ targets: ".stop-2", offset: "*=1.5" }, 0);

  anime({
    targets: ".st0",
    d: [
      {
        value:
          "M573,156.7c302,48.5,364.8-33.7,638.8-49.7s435,45.1,600.5,64.6s543.6-2.4,621.9-5.8s176.9,5.1,258.6,18.2c302,48.4,444.1-56.6,718.1-72.6s329.4,36.3,719.4,80.3c209.6,23.7,395.8-4.9,395.8-4.9l-0.2-12.3c0,0-76.7,5.5-177.4,9c-68.3,2.4-218.1,10.4-560-65.2s-596.2,39.5-892.7,21.9c-377.4-22.4-309.5-0.9-460.7,8c-147.8,8.7-579.3-24-770-62.1c-88.2-17.6-387.3-53.4-742.6,18.7c-139,28.2-922.7-3.5-922.7-3.5v27.8C-0.2,129.1,271,108.3,573,156.7z",
      },
    ],
    duration: 5000,
    direction: "alternate",
    autoplay: true,
    easing: "easeInOutSine",
    loop: true,
  });

  anime({
    targets: ".st1",
    d: [
      {
        value:
          "M4192.386,44.613c-302-48.5-546,40.923-820,56.923S2907.113,67.22,2741.617,47.69s-379.376-15.874-457.671-12.46c-78.295,3.413-399.081,19.425-480.791,6.306c-302-48.4-542.923,37.846-816.923,53.846S822.386,68.613,432.386,24.613C222.758,0.963,0,14.265,0,14.265l0.211,12.324c0,0,62.317,3.13,162.945-0.437c68.308-2.421,128.858-12.509,470.769,63.077s731.964-31.182,1028.464-13.582c377.4,22.4,469.436-13.821,620.622-22.695c147.814-8.676,575.532,24.035,766.223,62.114c88.203,17.613,387.34,53.426,742.625-18.699c139.023-28.223,734.451,3.485,734.451,3.485v-27.8C4526.311,72.052,4319.184,68.191,4192.386,44.613z",
      },
    ],
    duration: 3000,
    direction: "alternate",
    autoplay: true,
    easing: "easeInOutSine",
    loop: true,
  });
});
</script>

<style lang="scss" scoped>
.wave-container {
  position: relative;
  width: 100%;
  #wave-1 {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
  }
  #wave-2 {
    position: absolute;
    top: 20px;
    left: 0;
    z-index: 1;
    width: 100%;
  }
}
</style>
