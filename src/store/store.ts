import { createStore } from 'vuex';

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
}

interface State {
  items: Recipe[];
}

const store = createStore<State>({
  state: {
    items: []
  },
  mutations: {
    setItems(state, items: Recipe[]) {
      state.items = items;
    },
    addItem(state, item: Recipe) {
      state.items.push(item);
    }
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const response = await fetch('/data/recipes.json'); // Ensure this path is correct
        const data = await response.json();
        commit('setItems', data.recipes); // Make sure your JSON structure matches
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    addItem({ commit }, itemData) {
      const newItem: Recipe = {
        id: Date.now(),
        title: itemData.title,
        ingredients: itemData.ingredients,
        instructions: itemData.instructions
      };
      commit('addItem', newItem);
    }
  },
  getters: {
    getItems(state) {
      return state.items;
    }
  }
});

export default store;
