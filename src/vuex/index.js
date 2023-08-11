import { createStore } from "vuex";
import axiosClient from "../axiosClient";

const store = createStore({
  state() {
    return {
      mealsByIngredient: [],
    };
  },
  mutations: {
    setMealsByIngredient(state, meals) {
      state.mealsByIngredient = meals || [];
    },
  },

  actions: {
    searchMealsByIngredient({ commit }, ingredient) {
      axiosClient.get(`filter.php?i=${ingredient}`).then(({ data }) => {
        commit("setMealsByIngredient", data.meals);
      });
    },
  },
});

export default store;
