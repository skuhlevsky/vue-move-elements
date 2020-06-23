export default {
  state: {
    undo: [],
  },

  mutations: {
    addActions(state, historyObj) {
      state.undo.push({ time: Date.now(), obj: historyObj });
    },
    clearUndo(state) {
      state.undo = [];
    },
  },

  getters: {
    undoCount(state) {
      if (state.undo.length) return true;
      else return false;
    },
    fullHistory(state) {
      return state.undo;
    },
  },
};
