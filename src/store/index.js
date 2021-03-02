import Vue from "vue";
import Vuex from "vuex";
import home from "./modules/home/";
import bus from "./modules/bus/";
Vue.use(Vuex);
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
  key: "my-app",
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    home,
    bus
  },
  plugins: [vuexPersist.plugin]
});
