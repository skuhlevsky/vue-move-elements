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
  },
  actions: {
    async fetchNotes(ctx, noteName) {
      const res = await fetch('https://jsonplaceholder.typicode.com/albums');
      const responce = await res.json();
      ctx.commit('updateNotes', { elementsRes: responce, name: noteName });
    },
  },
  mutations: {
    updateNotes(state, { elementsRes, name }) {
      // Create Note Object with new name
      // Add isMoved flag
      // Remove items level
      let noteObj = {
        id: state.notes.length,
        title: name,
        elements: elementsRes.map(({ title }) => ({
          id: getUniqueID(),
          name: title.substring(0, 20),
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

      const objectsFromItems = noteObj.elements.reduce((objects, obj) => {
        obj.items.forEach((ii) => {
          objects.push(ii);
        });
        return objects;
      }, []);

      // Remove items level
      noteObj.elements = noteObj.elements.map(
        // eslint-disable-next-line no-unused-vars
        ({ items, ...rest }) => rest
      );

      noteObj.elements.push(...objectsFromItems);
      state.notes.push(noteObj);
    },
  },
  getters: {
    allNotes(state) {
      return state.notes;
    },
    notesCount(state, getters) {
      return getters.allNotes.length;
    },
  },
};
