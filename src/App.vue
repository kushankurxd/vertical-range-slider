<template>
  <div class="body">
    <div class="heading">
      <h2 class="title">Vertical Range Slider</h2>
      <p class="subtitle">
        When we think about a slider, we usually imagine an image gallery
        slider, or the infamous carousel, or perhaps off-canvas navigation, with
        the overlay sliding in from the side.
      </p>
    </div>
    <div
      class="slider-conatiner"
      v-for="(slider, index) in accelSliders"
      :key="index"
    >
      <Slider :slider="slider" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slider from "./sliderX/Slider.vue";
import DBSlider from "./sliderX/slider.js";

@Component({
  components: {
    Slider,
  },
})
export default class App extends Vue {
  accelSliders = [
    {
      id: 0,
      bgColor: "#edddd4",
      leftColor: "#2a9d8f",
      rightColor: "#e76f51",
      minValue: 14,
      maxValue: 89,
    },
    {
      id: 1,
      bgColor: "#edddd4",
      leftColor: "#2a9d8f",
      rightColor: "#e76f51",
      minValue: 24,
      maxValue: 78,
    },
    {
      id: 2,
      bgColor: "#edddd4",
      leftColor: "#2a9d8f",
      rightColor: "#e76f51",
      minValue: 10,
      maxValue: 100,
    },
  ];

  initSliders() {
    setTimeout(() => {
      this.accelSliders.map((x: any) => {
        new DBSlider(document.getElementById("svg_v" + x.id), "y");
      });
    }, 10);
  }

  mounted() {
    this.initSliders();
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
* {
  font-family: "Poppins";
}
body {
  background: #3f51b5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 340px;
}

.title {
  font-size: 34px;
  color: #e0f2f1;
  margin: 0;
}

.subtitle {
  font-size: 14px;
  color: #ccc;
}

.slider-conatiner {
  text-align: center;
  color: #fff;
}
</style>