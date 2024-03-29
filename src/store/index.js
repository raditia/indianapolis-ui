import Vue from 'vue'
import Vuex from 'vuex'
import merchantModule from './modules/merchant/index'
import cffModule from './modules/cff/index'
import categoryModule from './modules/category/index'
import warehouseModule from './modules/warehouse/index'
import fleetModule from './modules/fleet/index'
import mapModule from './modules/map/index'
import schedulingModule from './modules/scheduling/index'
import recommendationModule from './modules/recommendation/index'
import warehouseCategoryModule from './modules/warehouse_category/index'
import checkStatusModule from './modules/check_status/index'
import logisticVendorModule from './modules/logistic_vendor/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    merchant: merchantModule,
    cff: cffModule,
    category: categoryModule,
    warehouse: warehouseModule,
    fleet: fleetModule,
    map: mapModule,
    scheduling: schedulingModule,
    recommendation: recommendationModule,
    warehouseCategory: warehouseCategoryModule,
    check_status: checkStatusModule,
    logistic_vendor: logisticVendorModule
  }
})

export default store
