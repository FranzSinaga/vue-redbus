import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    form: [],
    destination: [],
    bus: [],
  },
  mutations: {
    setForm: (state, form) => {
      state.form = form
    },
    setDestination: (state, destination) => {
      state.destination = destination
    },
    setBus: (state, bus) => {
      state.bus = bus
    }
  },
  getters: {
    getForm: (state) => {
      return state.form
    },
    getDestination: (state) => {
      return state.destination
    },
    getBus: (state) => {
      return state.bus
    }
  },
  actions: {},
  modules: {}
});
