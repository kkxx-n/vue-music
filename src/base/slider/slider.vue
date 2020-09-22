<template>
  <!-- ref属性 为子组件赋予一个id引用 即可在父组件中调用
     -- >>parent component
    this.$refs.slider 来直接操作这个子组件
  -->
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :key="item" :class="{ active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import { addClass } from "../../common/js/dom";

export default {
  name: "slider",
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  // 是为了让子组件使用父组件的数据  分为静态和动态的props  其为单向数据流 如子组件修改会报错
  props: {
    // props的验证
    loop: {
      type: Boolean,
      default: true,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 4000,
    },
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', ()=> {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    //  isResize 为标志位  代表其在状态改变时其方法是否改变
    _setSliderWidth(isResize) {

      // 使用this声明的变量作用域是其上下文
      this.children = this.$refs.sliderGroup.children

      let width = 0
      // Dom操作 获取包裹slider容器的宽度
      /**
       *  关于js获取元素宽度的为题
       *  offsetWidth 是获取元素尺寸（content + padding + border）
       *  clientWidth 可视宽度 ( content + padding )
       */
      let sliderWidth = this.$refs.slider.clientWidth;

      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, "slider-item")

        child.style.width = sliderWidth + "px"
        width += sliderWidth
      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }

      this.$refs.sliderGroup.style.width = width + "px";
    },
    
    _initDots () {
      this.dots = new Array(this.children.length)
    },

    _initSlider() {
        console.log(this.props)
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
      })

      this.slider.on('scrollEnd', ()=>{
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
            pageIndex -= 1 
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
        }
      })
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>

