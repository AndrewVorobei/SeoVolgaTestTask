<template>
  <div class="main-block">
    <Item v-for="meal of meals" :key="meal.idMeal" :meal="meal" />
  </div>
  <div v-if="!meals.length" class="flex justify-center text-gray-600">
    There Are No Meals
  </div>
</template>

<script setup>
import Item from "../components/Item.vue";
// eslint-disable-next-line vue/no-setup-props-destructure, no-undef
const { meals } = defineProps({
  meals: {
    required: true,
    type: Array,
  },
});
</script>

<style lang="scss" scoped>
.main-block {
  display: flex;
  flex-direction: column;
}
</style>
