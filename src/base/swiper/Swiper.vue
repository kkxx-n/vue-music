<template>
    <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="slider-item" v-for="item in recommends" :key="item.index">
            <a :href="item.linkUrl">
                <img :src="item.picUrl">
            </a>
        </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          // Some Swiper option/callback...
        }
      }
    },
    props:{
        recommends:{
            type:Array,
            default: []
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      this.swiper.slideTo(3, 1000, false)
    }
}

</script>

<style scoped>
    .swiper-slide img{
        display: block;
        width: 100%;
    }
</style>