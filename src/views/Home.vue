<template>
  <div class="select-bus">
    <!-- <div class="overlap"></div> -->
    <div class="container">
      <div class="row justify-content-center pb-5 pt-3">
        <div class="col-md-5 mt-3 card ">
          <form @submit="submitForm($event)" class="card-body">
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
                  <option
                    v-for="form in getForm"
                    v-bind:key="form.lf"
                    :value="form.lf"
                    :id="form.lf"
                  >
                    {{ form.lf }}
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
                    {{ gt }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-12">
                <label>Departing On</label>
                <input
                  type="date"
                  v-model="date"
                  required
                  class="form-control form-control-sm ng-untouched ng-pristine ng-invalid"
                />
              </div>
            </div>
            <button
              type="submit"
              :disabled="gt === ''"
              class="btn btn-block mt-3 btn-search btn-sm btn-primary"
            >
              Search Busses
            </button>
          </form>
        </div>

        <div class="col-md-5 slider mt-3 ">
          <img
            class="img-fluid"
            id="bussImage"
            src="../assets/logo.png"
            alt="red-bus"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Home",
  data: () => {
    return {
      lf: "",
      gt: "",
      gtList: [],
      date: ""
    };
  },
  components: {},
  created() {
    this.$store.dispatch("home/getForm");
  },
  computed: {
    getForm: function() {
      return this.$store.getters["home/getForm"];
    },
    getDest: {
      get: function() {
        return this.gtList;
      },
      set: function(lf) {
        this.gtList = lf;
      }
    }
  },
  methods: {
    selectLeaveFrom() {
      this.$store.getters["home/getForm"].forEach(element => {
        if (this.lf === "") {
          this.getDest = [];
        } else if (element.lf === this.lf) {
          this.getDest = element.gt;
        }
      });
    },

    submitForm(e) {
      e.preventDefault();
      const data = this.$store.getters["home/getDestination"];
      const id = data.filter(e => {
        if (e.name === this.gt) {
          return e.id;
        }
      });
      let query = {
        date: this.date,
        id: id[0].id,
        lf: this.lf,
        gt: this.gt
      };
      router.push({ name: "Busses", query: query });
    }
  }
};
</script>
