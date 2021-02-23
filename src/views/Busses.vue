<template>
  <div class="container mt-4 ">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="row text-center">
          <h6 class=" text-capitalize col-md-12 mb-3 text-center">
            {{ this.$route.query.lf }} - {{ this.$route.query.gt }} On
            {{ this.$route.query.date }}
          </h6>
        </div>
        <!-- <p>{{this.getBus}}</p> -->
        <div class="row mb-3 card card-body">
          <div class="row">
            <div class="col-md-4 text-right">
              <p>Filter By</p>
            </div>
            <div class="form-group col-md-4">
              <select class="form-control form-control-sm">
                <option>By Bus</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <select class="form-control form-control-sm">
                <option>By Type</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row search-result mb-5 pb-5 text-center">
          <table class="table table-responsive-md" style="min-width:100%">
            <thead>
              <tr>
                <th>Bus Name</th>
                <th>Dept. Time</th>
                <th>Coach Type</th>
                <th>Seats Availiable</th>
                <th>Fare</th>
                <th>View Seat</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bus, i) in getBus" v-bind:key="i">
                <td>{{ bus.name }}</td>
                <td>{{ bus.time }}</td>
                <td>{{ bus.coach_type }}</td>
                <td>{{ bus.seat }}</td>
                <td>{{ bus.fare }}</td>
                <td>
                  <button
                    type="button"
                    @click="fare = bus.fare"
                    class="btn btn-danger"
                    data-toggle="modal"
                    data-target="#detail"
                  >
                    View Seats
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="detail"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <!-- <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> -->
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModal()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <h5>Select Seat</h5>
                  <div style="border: solid 1px lightgray;" class="p-2 mt-5">
                    <img src="../assets/handle.png" class="float-right m-2" />
                    <table
                      class="table text-center"
                      v-for="(line, idx) in getSeats"
                      :key="idx"
                    >
                      <tr>
                        <td v-for="(cell, i) in line" :key="i">
                          <img
                            style="cursor:pointer;"
                            src="../assets/bseat.png"
                            :alt="cell"
                            @click="onSelectSeat(cell)"
                            :id="cell"
                          />
                          {{ cell }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="col-md-6">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Seats</th>
                        <th>Fare</th>
                        <th>Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="seat in seatSelected" :key="seat">
                        <td>{{ seat }}</td>
                        <td>{{ fare }}</td>
                        <td>Economy</td>
                      </tr>
                    </tbody>
                  </table>
                  <h6>
                    Total: {{ this.seatSelected.length * this.fare || 0 }}
                  </h6>
                  <div
                    v-if="this.errMessage"
                    class="alert alert-danger mt-2"
                    style="width: 100%"
                    role="alert"
                  >
                    You can buy only 4 seats in one time
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModal()"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seatSelected: [],
      errMessage: false
    };
  },
  mounted() {
    let id = this.$route.query.id;
    this.$store.dispatch("bus/getBus", id);
  },
  computed: {
    getBus: function() {
      return this.$store.getters['bus/getBus'];
    },
    getSeats: function () {
      return this.$store.getters['bus/getSeats']
    }
  },
  methods: {
    closeModal() {
      this.err = false;
      this.seatSelected.map(e => {
        document.getElementById(e).src = require("../assets/bseat.png");
      });
      this.seatSelected = [];
    },
    onSelectSeat(seat) {
      if (this.seatSelected.length < 4) {
        if (this.seatSelected.length === 0) {
          this.seatSelected.push(seat);
        } else {
          let isExist = this.seatSelected.filter(e => {
            return seat === e;
          });
          console.log(isExist)
          if (isExist.length === 0) {
            this.seatSelected.push(seat);
          }
        }
        document.getElementById(seat).src = require("../assets/fseat.png");
      } else {
        this.errMessage = true;
      }
    }
  }
};
</script>

<style></style>
