import Vue from 'vue';
import Vuex from 'vuex';
import data from '../data.json';
import { text } from '../sampleContract';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reader: 0,
    contractPEGTree: data,
    sample: text,
  }
})