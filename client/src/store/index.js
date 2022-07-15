import Vue from 'vue';
import Vuex from 'vuex';
import data from '../data.json';
import { text } from '../sampleContract2';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reader: 0,
    contractPEGTree: data,
    sample: text,
  }
})