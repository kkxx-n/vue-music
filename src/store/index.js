// 初始化VueX
import Vue from 'vue'
import VueX from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 使用mutations修改state时候会在控制台 打印日志
import createLogger from 'vuex/dist/logger'

Vue.use(VueX)

// 严格模式 必须使用mutations修改state中的数据
const debug = process.env.NODE_ENV !== 'production'

export default new VueX.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})