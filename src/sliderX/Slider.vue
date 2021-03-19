<template>
  <div class="text-center">
    <svg id="theDefs">
      <defs>
        <path id="thumbx" d="M0,0m-2.5,-5h5v10h-5z" />
        <path id="thumby" d="M0,0m-5,-2.5v5h10v-5z" />
      </defs>
    </svg>

    <form id="theForm">
      <input type="text" id="ymin" value="0" />
      <input type="text" id="ymax" value="0" />
    </form>

    <svg
      :id="'svg_v' + slider.id"
      viewBox="-10 -10 68 120"
      width="100%"
      height="40vh"
    >
      <rect id x="24" y="0" width="2" height="100" :fill="slider.bgColor" />
      <g
        :transform="`translate(25,${slider.minValue})`"
        :fill="slider.leftColor"
        class="left"
      >
        <path d="M-6,0h-20v-15h16v10z" :fill="slider.leftColor" />
        <text transform="translate(-18,-5)" fill="#fff">
          {{ slider.minValue }}
        </text>
        <use xlink:href="#thumby" />
      </g>
      <g
        :transform="`translate(25,${slider.maxValue})`"
        :fill="slider.rightColor"
        class="right"
      >
        <path d="M-6,0h-20v15h16v-10z" :fill="slider.rightColor" />
        <text transform="translate(-18,10)" fill="#fff">
          {{ slider.maxValue }}
        </text>
        <use xlink:href="#thumby" />
      </g>
    </svg>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Slider extends Vue {
  @Prop() slider!: any;
}
</script>

<style scoped>
svg {
  overflow: visible;
}

#theDefs {
  width: 0;
  height: 0;
  position: absolute;
  left: -100px;
}
path {
  cursor: pointer;
}

text {
  text-anchor: middle;
  font-size: 8px;
  font-family: "Poppins";

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
svg text::selection {
  background: none;
}

form {
  display: none;
}
</style>