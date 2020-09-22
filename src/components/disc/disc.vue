<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs='songs'></music-list>
    </transition>
</template>

<script>
import MusicList from '../music-list/music-list'
import { getSongList } from '../../api/recommend'
import { createSong } from '../../common/js/song'
import { ERR_OK } from '../../api/config'

import { mapGetters } from 'vuex'

export default {
    name: 'Disc',
    components: {
        MusicList
    },
    data() {
        return {
            songs: []
        }
    },
    computed: {
        title() {
            return this.disc.dissname
        },
        bgImage() {
            return this.disc.imgurl
        },
        ...mapGetters([
            'disc'
        ])
    },
    methods: {
        _getSongList(){
            if (!this.disc.dissid) {
                this.$router.push('/recommend')
                return
            }
            getSongList(this.disc.dissid).then((res)=> {
                if (res.code === ERR_OK ) {
                    this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                }
            })
        },
         _normalizeSongs(list) {
            let ret = []
            list.forEach((musicData) => {
                if (musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        },
    },
    created() {
        this._getSongList()
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>