export default {
  state: {
    undo: [],
  },

  mutations: {
    addActions(state, historyObj) {
      state.undo.push({ time: Date.now(), obj: historyObj });
    },
    inActiveUndo(state, action) {
      state.undo[0].actual = !action;
      state.redo[0].actual = action;
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
