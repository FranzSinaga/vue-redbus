import axios from 'axios'

const getBus = ({ commit }, id) => {
    axios.get(`https://bdbusticket.firebaseio.com/buses/${id}.json`)
        .then(res => {
            commit("setBus", res.data);
        });
}

export default {
    getBus
}