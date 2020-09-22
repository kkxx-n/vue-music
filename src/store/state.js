import { playMode } from '../common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'

// 数据
const state = {
    singer: {},
    // 播放器
    playing: false,
    // 播放器展开或者收起
    fullScreen: false,
    // 歌曲列表 播放模式
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    // 当前索引方法
    currentIndex: -1,
    // disc歌单对象
    disc: {},
    // 排行榜数据
    topList: {},
    // 搜索历史
    searchHistory: loadSearch(),
    playHistory: loadPlay(),
    favoriteList: loadFavorite()
}

export default state