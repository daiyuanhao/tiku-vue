import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    subjectData: null,
    questionData: null,
    tagsData: null,
    types:['问答题','单选题','多选题']
  },
  mutations: {
    getSubjectData(state,data){
      state.subjectData = data;
    }
  },
  actions: {
    getSubjectData({commit}) {
      axios.get('/api/subject/get').then(res=>{
        commit("getSubjectData", res.data.rows);
      })
    },
  },
  modules: {},
});
