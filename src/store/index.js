import Vue from 'vue'
import Vuex from 'vuex'
import merchantModule from './modules/merchant/index'
import cffModule from './modules/cff/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    merchant: merchantModule,
    cff: cffModule
  }
})

export default store
