import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  pending: new Map()
};

const getters = {
  getPending(state) {
    return state.pending;
  }
};

const mutations = {
  setPending(state, pending) {
    state.pending = pending;
  }
};

const store = new Vuex.Store({ state, getters, mutations });
export default store;
