import axios from 'axios'

const getForm = ({ commit }) => {
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

export default {
    getForm
}