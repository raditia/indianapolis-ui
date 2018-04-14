import Vue from 'vue'
import Vuex from 'vuex'
import merchantModule from './modules/merchant/index'
import cffModule from './modules/cff/index'
import categoryModule from './modules/category/index'
import warehouseModule from './modules/warehouse/index'
import fleetModule from './modules/fleet/index'
import mapModule from './modules/map/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    merchant: merchantModule,
    cff: cffModule,
    category: categoryModule,
    warehouse: warehouseModule,
    fleet: fleetModule,
    map: mapModule
  }
})

export default store
