<template>
  <div class="home">
    <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
      <swiper-slide class="swiper-item">
        <div class="slide1">
          <div class="slide1_img1 ani" swiper-animate-effect="fadeInLeft">
            <img src="../assets/home/slide1_1.jpg" alt="">
          </div>
          <div class="slide1_img2 ani" swiper-animate-effect="fadeInRight">
            <img src="../assets/home/slide1_2.jpg" alt="">
          </div>
          <div class="slide1_img3 ani" swiper-animate-effect="flip">
            <img src="../assets/home/slide1_3.jpg" alt="">
          </div>
        </div>
        <div class="text ani" swiper-animate-effect="fadeIn">
          <p>樱花盛开的季节，四处洋溢着春天的气息，唯君与百花不可辜负！</p>
          <p class="last">——深圳湾公园游</p>
        </div>
        <div class="flower_wrap">
          <div class="flower" v-for="index in flowerNum" :key="index" :class="'flower_' + index"></div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <canvas id="love"></canvas>
        <div class="love"></div>
        <div class="text_2 ani" swiper-animate-effect="bounceInDown">
          <p>两情若是长久时，也须珍惜朝朝暮暮</p>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <div class="slide2">
          <div class="slide2_img1 ani" swiper-animate-effect="fadeInLeft">
            <img src="../assets/home/three_1.jpg" alt="">
          </div>
          <div class="slide2_img2 ani" swiper-animate-effect="fadeInRight">
            <img src="../assets/home/three_2.jpg" alt="">
          </div>
          <div class="slide2_img3 ani" swiper-animate-effect="flip">
            <img src="../assets/home/three_3.jpg" alt="">
          </div>
        </div>
        <div class="text_2 ani" swiper-animate-effect="bounceInUp">
          <p style="color: orangered">生活不只有眼前的苟且，还有爱人和快乐！</p>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <div class="four ani" swiper-animate-effect="zoomIn" swiper-animate-duration="2s">
          <p>从校服到婚纱，从初中到现在！未来，我们还会牵手一起走下，直到白发斑斑，只愿执子之手与子偕老！</p>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// @ is an alias to /src
import * as swiperAni from '@/assets/swiper.animate.min.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { ParticlePool, Point, canvasOption } from '../class'

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
        },
        on: {
          init: function () {
            swiperAni.swiperAnimateCache(this)
            swiperAni.swiperAnimate(this)
          },
          slideChange: function () {
            swiperAni.swiperAnimate(this)
          }
        }
      },
      setting: {
        canvas: {},
        context: {},
        particles: {},
        particleRate: {},
        time: 0
      },
      flowerNum: 90
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    this.updateAnimate()
    this.createPoint()
    let c = document.getElementById('love')
    this.createCanvas(c)
  },
  methods: {
    updateAnimate () {
      let b = 0
      let c = ['ms', 'moz', 'webkit', 'o']
      for (let a = 0; a < c.length && !window.requestAnimationFrame; a++) {
        window.requestAnimationFrame = window[c[a] + 'RequestAnimationFrame']
        window.cancelAnimationFrame = window[c[a] + 'CancelAnimationFrame'] || window[c[a] + 'CancelRequestAnimationFrame']
      }
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (h) {
          let d = new Date().getTime()
          let f = Math.max(0, 16 - (d - b))
          let g = window.setTimeout(() => {
            h(d + f)
          }, f)
          b = d + f
          return g
        }
      }
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (d) {
          clearTimeout(d)
        }
      }
    },
    createPoint () {
      const point = new Point()
      return point
    },
    createCanvas (canvas) {
      let Qpool = new ParticlePool()
      this.setting.canvas = canvas
      this.setting.context = this.setting.canvas.getContext('2d')
      this.setting.particles = new Qpool(canvasOption.love.length)
      this.setting.particleRate = canvasOption.love.length / canvasOption.love.duration
      window.onresize = this._onResize

      setTimeout(() => {
        this._onResize(this.setting.canvas)
        this.render()
      }, 10)
    },
    _pointOnHeart (t) {
      return new Point(
        160 * Math.pow(Math.sin(t), 3),
        130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
      )
    },
    _to (t) {
      let point = this._pointOnHeart(t)
      point.x = canvasOption.love.size / 2 + point.x * canvasOption.love.size / 350
      point.y = canvasOption.love.size / 2 - point.y * canvasOption.love.size / 350
      return point
    },
    _image () {
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      canvas.width = canvasOption.love.size
      canvas.height = canvasOption.love.size
      context.beginPath()
      let t = -Math.PI
      let point = this._to(t)
      context.moveTo(point.x, point.y)
      while (t < Math.PI) {
        t += 0.01
        point = this._to(t)
        context.lineTo(point.x, point.y)
      }
      context.closePath()
      context.fillStyle = '#ea80b0'
      context.fill()
      let image = new Image()
      image.src = canvas.toDataURL()
      return image
    },
    render () {
      requestAnimationFrame(this.render)
      let newTime = new Date().getTime() / 1000
      let deltaTime = newTime - (this.setting.time || newTime)
      this.setting.time = newTime

      // 清除canvas
      // console.log(this.setting.context)
      this.setting.context.clearRect(0, 0, this.setting.canvas.width, this.setting.canvas.height)

      // 创建新的爱心
      let amount = this.setting.particleRate * deltaTime
      for (let i = 0; i < amount; i++) {
        // console.log(Math.PI - 2 * Math.PI * Math.random())
        let pos = this._pointOnHeart(Math.PI - 2 * Math.PI * Math.random())
        let dir = pos.clone().length(canvasOption.love.velocity)
        this.setting.particles.add(this.setting.canvas.width / 2 + pos.x, this.setting.canvas.height / 2 - pos.y, dir.x, -dir.y)
      }

      this.setting.particles.update(deltaTime)
      this.setting.particles.draw(this.setting.context, this._image())
    },
    _onResize (canvas) {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
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
