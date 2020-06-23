import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import history from './modules/history';
import notes from './modules/notes';

Vue.use(Vuex);

// Adding the Vuex localStorage plugin
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: {
    notes,
    history,
  },
  plugins: [vuexLocal.plugin],
});
