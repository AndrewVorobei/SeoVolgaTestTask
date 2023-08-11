<template>
  <AllArticles :meals="meals" />
</template>

<script setup>
import store from "../vuex/index";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import AllArticles from "../components/AllArticles.vue";

const meals = computed(() => store.state.mealsByIngredient);
const route = useRoute();

onMounted(() => {
  store.dispatch("searchMealsByIngredient", route.params.ingredient);
});
</script>
