<template>

  <div class="recommend" ref="recommend">
	  
    <scroll class="recommend-content" ref="scroll" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
			<my-swiper :recommends="recommends"></my-swiper>
        </div>

        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in discList" :key="item.index">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60" />
              </div>
              <div class="text">
                <!-- 更新元素的innerHTML  -->
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from "../../api/recommend";
import { ERR_OK } from "../../api/config";

import Slider from "../../base/slider/slider"
import Scroll from "../../base/scroll/scroll"
import MySwiper from "../../base/swiper/Swiper"
import Loading from "../../base/loading/loading"

import { mapMutations } from 'vuex'

// 引入mixin
import { playlistMixin } from '../../common/js/mixin'

export default {
  name: "Recommend",
  mixins: [playlistMixin],
  components: {
    Slider,
	Scroll,
  MySwiper,
  Loading
  },
  data() {
    return {
      recommends: [],
	  discList: [],
    }
  },
  computed: {

	},
	 mounted() {

    },
  created() {
    this._getRecommend()
    setTimeout(() => {
       this._getDiscList()
    }, 1000);
  },
  methods: {
    handlePlayList(playList) {
       const bottom = playList.length>0? '60px': ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code == ERR_OK) {
		  this.recommends = res.data.slider
        } else {
          console.log("错误")
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code == ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}

.recommend-content {
  height: 100%;
  overflow: hidden;
}

.list-title {
  text-align: center;
  margin: 20px 0 20px 0;
}

.recommend-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 0 10px;
}

.icon {
  flex: 0 0 60px;
  width: 60px;
  padding-right: 20px;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  line-height: 20px;
  overflow: hidden;
  color: #fff;
}
.loading-container{
  position: absoulte;
  width:100%;
  top:50%;
  transform: translateY(-50%);
}
</style>
