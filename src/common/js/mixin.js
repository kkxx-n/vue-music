// 如果在组件中实现methods中的handlePlayList函数他将会覆盖掉mixin中的这个函数
// mixin 混入

import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/until'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playList'
        ])
    },
    mounted() {
        this.handlePlayList(this.playList)
    },
    // keep-alive组件钩子
    activated() {
        this.handlePlayList(this.playList)
    },
    watch: {
        playList(newVal) {
            this.handlePlayList(newVal)
        }
    },
    methods: {
        handlePlayList() {
            throw new Error('component must implement handlePlayList methods')
        }
    }
}

export const playerMixin = {
    computed: {
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            'sequenceList',
            'currentSong',
            'playList',
            'mode',
            'favoriteList'
        ])
    },
    methods: {
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList
            }
            this.resetCurrentIndex(list)
            this.setPlayList(list)
        },
        resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        // 搜藏功能
        getFavoriteItem(song) {
            if (this.isFavorite(song)) {
                return 'icon-favorite'
            }
            return 'icon-not-favorite'
        },
        toggleFavorite(song) {
            if (this.isFavorite(song)) {
                this.deleteFavoriteList(song)
            } else {
                this.saveFavoriteList(song)
            }

        },
        isFavorite(song) {
            const index = this.favoriteList.findIndex((item) => {
                return item.id === song.id
            })
            return index > -1
        },
        ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST'
        }),
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList'
        ])
    }

}

export const searchMixin = {
    data() {
        return {
            query: '',
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ])
    },
    methods: {
        blurInput() {
            // this.$refs.searchBox.blur()
        },
        saveSearch() {
            this.saveSearchHistory(this.query)
        },
        onQueryChange(query) {
            this.query = query
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory'
        ])
    }
}