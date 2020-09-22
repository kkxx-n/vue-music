import state from "./state";

// 相当于计算属性  可以通过属性访问器 store.getter 访问这些值
export const singer = state => state.singer

// 播放状态
export const playing = state => state.playing

// 播放器的显示
export const fullScreen = state => state.fullScreen

// 歌曲列表
export const playList = state => state.playList

// 歌曲序列列表
export const sequenceList = state => state.sequenceList

// 播放模式
export const mode = state => state.mode

// 播放歌曲的索引
export const currentIndex = state => state.currentIndex

// 当前歌曲
export const currentSong = (state) => {
    return state.playList[state.currentIndex] || {}
}

// 歌单数据
export const disc = state => state.disc

// 排行榜数据
export const topList = state => state.topList

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const favoriteList = state => state.favoriteList

/**
 * 快捷方式 
 * mapGetter辅助函数将store中的getter映射到局部的计算属性中 
 * 
 */