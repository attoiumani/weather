import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataSetName: String,
    dataSetTemp: Number,
    dataSetMaxTemp: Number,
    dataSetMinTemp: Number,
    dataSetCondition: String
  },
  mutations: {
    mutateDataSetName(state, payload) {
      state.dataSetName = payload;
    },
    mutateDataSetTemp(state, payload) {
      state.dataSetTemp = payload;
    },
    mutateDataSetMaxTemp(state, payload) {
      state.dataSetMaxTemp = payload;
    },
    mutateDataSetMinTemp(state, payload) {
      state.dataSetMinTemp = payload;
    },
    mutateDataSetCondition(state, payload) {
      state.dataSetCondition = payload;
    }
  },
  actions: {
    commitDataSet(store) {
    return axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&units=metric&appid=4dff50a83aa2145ba555d8f59e9d3ef0"
    )
    .then(response => {
      store.commit('mutateDataSetName', response.data.name)
      store.commit('mutateDataSetTemp', response.data.main.temp)
      store.commit('mutateDataSetMaxTemp', response.data.main.temp_max)
      store.commit('mutateDataSetMinTemp', response.data.main.temp_min)
      store.commit('mutateDataSetCondition', response.data.weather[0].main)
    })
   }
  },
  getters: {
    getStateDataSetName: (state) => state.dataSetName,
    getStateDataSetTemp: (state) => state.dataSetTemp,
    getStateDataSetMaxTemp: (state) => state.dataSetMaxTemp,
    getStateDataSetMinTemp: (state) => state.dataSetMinTemp,
    getStateDataSetCondition: (state) => state.dataSetCondition,
   }
})
