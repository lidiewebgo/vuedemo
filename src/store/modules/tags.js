import * as types from './mutation-types';
const state = {
  tagList: [{
    path: '/',
    name: 'Dashboard',
    label: '首页'
  }]
}

const mutations = {
  [types.SET_TAG](state, payload) {
    if (payload.name === null) { // 这里可以用来过滤页面
      return
    }

    if (payload.name !== 'home') {
      const result = state.tagList.findIndex(item => item.name === payload.name)
      if (result === -1) state.tagList.push(payload)
    }
  },
  [types.CLOSE_TAG](state, payload) {
    /**
     * payload 参数说明
     * index - 当前点击的tag的索引 也就是从tagList数组的第几个开始删除
     * delCount - 要删除的个数。点击关闭时默认为1，关闭全部时为tagList.length - 1
     */
    state.tagList.splice(payload.index, payload.delCount)
  }
}

const actions = {
  setTag: ({
    commit
  }, payload) => {
    
    if(payload.label!="undefined"){
        commit(types.SET_TAG, payload)
    }
   
  },
  closeTag: ({
    commit
  }, payload) => {
    commit(types.CLOSE_TAG, payload)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions

}
