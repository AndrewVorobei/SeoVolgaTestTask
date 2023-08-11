<template>
  <div class="main bg-white shadow rounded-xl">
    <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" class="p-3" />
      <div class="p-3">
        <h3 class="font-bold my-3">{{ meal.strMeal }}</h3>
      </div>
    </router-link>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef, vue/no-setup-props-destructure
const { meal } = defineProps({
  meal: {
    required: true,
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  background: linear-gradient(
    0.25turn,
    #456c7859,
    #ebf8e1,
    rgba(246, 156, 60, 0.4235294118)
  );

  a {
    display: flex;
    text-decoration: none;
    background: linear-gradient(0.25turn, #a4a8ac, #383f33, #16bbbb6c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }
}
</style>
