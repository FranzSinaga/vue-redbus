import axios from "axios";
const state = () => ({
    bus: [],
})
const mutations = {
    setBus: (state, bus) => {
        state.bus = bus;
    }
}
const getters = {
    getForm: state => {
        return state.form;
    },
    getDestination: state => {
        return state.destination;
    },
    getBus: state => {
        return state.bus;
    }
}
const actions = {
    getBus({ commit }, id) {
        axios
            .get(`https://bdbusticket.firebaseio.com/buses/${id}.json`)
            .then(res => {
                commit("setBus", res.data);
            });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}