export default {
  state: {
    history: [],
  },

  mutations: {
    addActions(state, { historyObj, isMoved }) {
      state.history.push({
        time: Date.now(),
        obj: historyObj,
        isMoved: isMoved,
      });
    },
  },

  getters: {
    historyCount(state) {
      if (state.history.length) return true;
      else return false;
    },
    fullHistory(state) {
      return state.history;
    },
  },
};
