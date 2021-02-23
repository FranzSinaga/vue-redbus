import Vue from "vue";
import Vuex from "vuex";
import home from './modules/home/'
import bus from './modules/bus/'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    bus
  }
});
