// Universally Unique Identifiers (UUID) based on IETF RFC 4122
const getUniqueID = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

const getRandomUserName = () =>
  Math.random()
    .toString(36)
    .substring(3);

export default {
  state: {
    notes: [],
    noteState: [],
  },
  actions: {
    async fetchNotes(ctx, noteName) {
      const res = await fetch('http://jsonplaceholder.typicode.com/albums');
      const responce = await res.json();
      ctx.commit('updateNotes', { todosRes: responce, name: noteName });
    },
  },
  mutations: {
    createCurrentState(state, id) {
      state.noteState = [];
      const currentNote = state.notes.find((x) => x.id === id);
      state.noteState.todos = [];
      state.noteState.id = currentNote.id;
      state.noteState.title = currentNote.title;
      currentNote.todos.forEach(function(obj, i) {
        state.noteState.todos.push({ ...currentNote.todos[i] });
      });
    },
    createTodo(state, { id, name }) {
      const todoObj = { name: name };
      const currentNote = state.notes.find((x) => x.id === id);
      todoObj['id'] = getUniqueID();
      todoObj['isDone'] = false;
      todoObj['isDeleted'] = false;
      currentNote.todos.push(todoObj);
    },

    updateNotes(state, { todosRes, name }) {
      // Create Note Object with new name
      // Add isMoved flag
      let noteObj = {
        id: state.notes.length,
        title: name,
        todos: todosRes.map(({ title }) => ({
          id: getUniqueID(),
          name: title.substring(0, 15),
          items: [
            {
              id: getUniqueID(),
              name: getRandomUserName(),
              isMoved: false,
            },
            {
              id: getUniqueID(),
              name: getRandomUserName(),
              isMoved: false,
            },
          ],
          isMoved: false,
        })),
      };

      const objectsFromItems = noteObj.todos.reduce((objects, obj) => {
        obj.items.forEach((ii) => {
          objects.push(ii);
        });
        return objects;
      }, []);

      // Remove items level
      noteObj.todos = noteObj.todos.map(
        // eslint-disable-next-line no-unused-vars
        ({ items, ...rest }) => rest
      );

      noteObj.todos.push(...objectsFromItems);
      state.notes.push(noteObj);
    },

    undoTodos(state, { id, todoObj }) {
      const currentNote = state.notes.find((x) => x.id === id);
      const currentTodo = currentNote.todos.find(
        (x) => x.id === todoObj.obj.id
      );
      currentTodo.name = todoObj.obj.name;
      currentTodo.isDone = todoObj.obj.isDone;
      currentTodo.isDeleted = todoObj.obj.isDeleted;
    },
    cancelEditing(state) {
      const currentNote = state.notes.find((x) => x.id === state.noteState.id);
      currentNote.title = state.noteState.title;
      currentNote.todos.forEach(function(obj, i) {
        obj.name = state.noteState.todos[i].name;
        obj.isDone = state.noteState.todos[i].isDone;
        obj.isDeleted = state.noteState.todos[i].isDeleted;
      });
    },
    deleteTodo(state, { id, todoObj }) {
      const currentNote = state.notes.find((x) => x.id === id);
      currentNote.todos.find((t) => {
        return t.id === todoObj.id;
      }).isDeleted = true;
    },
    deleteNote(state, id) {
      const noteIndex = state.notes.findIndex((x) => x.id === id);
      state.notes.splice(noteIndex, 1);
    },
  },
  getters: {
    allNotes(state) {
      return state.notes;
    },
    oneNote: (state) => (id) => {
      return state.notes.find((t) => {
        return t.id === Number(id);
      });
    },
    notesCount(state, getters) {
      return getters.allNotes.length;
    },
    noteStateCount(state, id) {
      if (Array.isArray(state.noteState[id])) return true;
    },
  },
};
