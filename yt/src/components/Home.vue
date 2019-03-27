<template>
  <div class="home">
    <swiper :options="swiperOption" class="swiper-box">
      <swiper-slide class="swiper-item">
        <div class="slide1">
          <div class="slide1_img1 animated fadeInLeft">
            <img src="../assets/home/slide1_1.jpg" alt="">
          </div>
          <div class="slide1_img2 animated fadeInRight">
            <img src="../assets/home/slide1_2.jpg" alt="">
          </div>
          <div class="slide1_img3 animated flip">
            <img src="../assets/home/slide1_3.jpg" alt="">
          </div>
        </div>
        <div class="flower_wrap">
          <div class="flower" v-for="index in flowerNum" :key="index" :class="'flower_' + index"></div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-item">Slide 2</swiper-slide>
      <swiper-slide class="swiper-item">Slide 3</swiper-slide>
      <swiper-slide class="swiper-item">Slide 4</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'home',
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 1,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      flowerNum: 90
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="less">
  @import "../style/home";
</style>
