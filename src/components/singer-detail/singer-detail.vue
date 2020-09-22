<template>
<transition name="slide">    
    <div class="singer-detail">
        <music-list :songs="songs"  :title="title" :bg-image="bgImage"></music-list>
    </div>
</transition>
</template>

<script>
// 取数据
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../../api/singer'
// 处理数据
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'

import { ERR_OK } from '../../api/config'

import MusicList from '../music-list/music-list'

export default {
    name: 'SingerDetail',
    components:{
      MusicList
    },
    data() {
        return {
            songs: []
        }
    },
    computed: {
      title () {
        return this.singer.name
      },
      bgImage(){
        return this.singer.avatar
      },
        ...mapGetters([
            'singer'
        ])
    },
    created(){
        this._getSingerDetail()
    },
    methods: {
        _getSingerDetail() {
            if (!this.singer.id) {
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.id).then( (res)=> {
                if (res.code === ERR_OK) {
                    processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
                    this.songs = songs
            })
          }
            })
        },
        _normalizeSongs (list) {
        let ret = []
        list.forEach((item) => {
          let { musicData } = item
          if (isValidMusic(musicData)) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.singer-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background

.slide-enter-active, .slide-leave-active
  transition: all 0.3s
    
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0);

   
</style>