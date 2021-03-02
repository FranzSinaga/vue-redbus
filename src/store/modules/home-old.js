import axios from "axios";

const state = () => ({
  form: [],
  destination: []
});
const mutations = {
  setForm: (state, form) => {
    state.form = form;
  },
  setDestination: (state, destination) => {
    state.destination = destination;
  }
};
const getters = {
  getForm: state => {
    return state.form;
  },
  getDestination: state => {
    return state.destination;
  }
};
const actions = {
  getForm({ commit }) {
    const formUri = axios.get("http://localhost:3004/form");
    const destinationUri = axios.get("http://localhost:3004/destination");
    axios
      .all([formUri, destinationUri])
      .then(
        axios.spread((...res) => {
          commit("setForm", res[0].data);
          commit("setDestination", res[1].data);
        })
      )
      .catch(err => {
        alert(err);
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
