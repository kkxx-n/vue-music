<template>
    <div class="singer" ref="singer">
        <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
        <!-- 挂载子路由 -->
        <router-view></router-view>
    </div>
</template>

<script>
import { getSingerList } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import Singer from '../../common/js/singer'
import ListView from '../../base/listview/listview'

// 发送数据
import { mapMutations } from 'vuex'

// minx
import { playlistMixin } from '../../common/js/mixin'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
    name: 'Singer',
    mixins: [playlistMixin],
    data() {
       return {
        singers: []
       }
    },
    components:{
        ListView
    },
    created() {
        this._getSingerList()
    },
    methods: {
        // 完成mixins中的方法
        handlePlayList(playList) {
            const bottom = playList.length>0? '60px': ''
            this.$refs.singer.style.bottom = bottom
            this.$refs.list.refresh()
        },
        selectSinger(singer){
            this.$router.push({
                path: `/singer/${singer.id}`
            })
            this.setSinger(singer)
        },
        _getSingerList() {
            getSingerList().then(res => {
                if (res.code === ERR_OK) {
                    this.singers = this._normallizeSinger(res.data.list)
                } else {
                    console.log('1')
                }
            })
        },
        // 规划数据
        _normallizeSinger(list) {
            let map = {
                hot:{
                    title: HOT_NAME,
                    items: []
                }
            }

            list.forEach((item, index)=>{
                // 取前10条为热门
                if (index < HOT_SINGER_LEN) {
                    map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))
                }
                const key = item.Findex
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))
            })

            // 为了得到有序列表， 需要处理map
            let hot = []
            let ret = []
            for (const key in map) {
              let val = map[key]
              if (val.title.match(/[a-zA-Z]/)) {
                  ret.push(val)
              }else if (val.title === HOT_NAME) {
                  hot.push(val)
              }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        },
        // 向vuestore发送数据
        ...mapMutations({
            setSinger: 'SET_SINGER'
        })
   
   }
}
</script>

<style scoped lang="stylus">
    .singer
        position fixed
        top 88px
        bottom 0
        width 100%
</style>