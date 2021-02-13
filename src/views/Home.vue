<template>
  <div class="select-bus">
        <!-- <div class="overlap"></div> -->
        <div class="container">
          <div class="row justify-content-center pb-5 pt-3">
            <div class="col-md-5 block mt-3">
              <form @submit="submitForm($event)">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label>Leaving From</label>
                    <select
                      v-model="lf"
                      class="form-control form-control-sm"
                      name="leaving_from"
                      v-on:change="selectLeaveFrom()"
                    >
                      <option value="">Select Place</option>
                      <option v-for="(form) in getForm" v-bind:key="form.lf" :value="form.lf" :id="form.lf">
                          {{form.lf}}
                      </option>
                    </select>
                  </div>

                  <div class="form-group col-md-6">
                    <label>Going To</label>
                    <select
                      class="form-control form-control-sm"
                      name="going_to"
                      v-model="gt"
                    >
                      <option value="">Select Place</option>
                        <option v-for="(gt, i) in getDest" v-bind:key="i" :value="gt">
                            {{gt}}
                        </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-12">
                    <label>Departing On</label>
                    <input type="date" v-model="date" required class="form-control form-control-sm ng-untouched ng-pristine ng-invalid">
                  </div>
                </div>
                <button
                  type="submit"
                  :disabled="gt === ''"
                  class="btn btn-block mt-3 btn-search btn-sm"
                >
                  Search Busses
                </button>
              </form>
            </div>

            <div class="col-md-5 slider mt-3 ">
              <img class="img-fluid" src="../assets/logo.png" alt="red-bus" />
            </div>
            <!-- <p style="color:white;background-color:black">{{getDest}}</p>
            <br><br>
            <p style="color:white;background-color:black">{{getForm}}</p> -->
          </div>
        </div>
      </div>
</template>

<script>
import axios from "axios";
import router from "../router"
export default {
  name: "Home",
  data: () => {
    return {
      lf: "",
      gt: "",
      gtList: [],
      date: "",
    };
  },
  components: {
  },
  mounted() {
    const formUri = axios.get("http://localhost:3004/form")
    const destinationUri = axios.get("http://localhost:3004/destination")
    axios.all([formUri, destinationUri]).then(axios.spread((...res) => {
      this.$store.commit("setForm", res[0].data)
      this.$store.commit("setDestination", res[1].data) 
    })).catch(err => {
      alert(err)
    })
  },
  computed: {
    getForm: function() {
      return this.$store.state.form
    },
    getDest: { 
      get: function () {
        return this.gtList
      },
      set: function (lf) {
        this.gtList = lf
      }
    }
  },
  methods: {
    selectLeaveFrom() {
      const data = this.$store.state.form
        data.forEach(element => {
          if(this.lf === ""){
            this.getDest = []
          } else if(element.lf === this.lf){
            this.getDest = element.gt
          }
        }); 
    },
    
    submitForm(e) {
      e.preventDefault()
      const data = this.$store.state.destination;
      const id = data.filter(e => {
        if(e.name === this.gt) {
          return e.id
        }
      })
      let query = {
        date: this.date,
        id: id[0].id,
        lf: this.lf,
        gt: this.gt
      }
      router.push({name: 'Busses', query: query})
    }
  }
};
</script>
