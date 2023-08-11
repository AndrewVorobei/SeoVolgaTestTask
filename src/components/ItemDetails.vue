<template>
  <div class="item-details-block max-w-[800px] mx-auto font-monospace">
    <h1 class="text-5xl font-bold">{{ meal.strMeal }}</h1>
    <img :src="meal.strMealThumb" :alt="meal.strMeal" class="" />

    <div class="grid grid-cols-1 sm:grid-cols-3 text-lg py-2">
      <div>
        <strong class="font-bold">Category:</strong> {{ meal.strCategory }}
      </div>
      <div><strong class="font-bold">Area:</strong> {{ meal.strArea }}</div>
      <div><strong class="font-bold">Tags:</strong> {{ meal.strTags }}</div>
    </div>

    <div class="my-3 d-flex flex-column">
      <span>
        {{ meal.strInstructions }}
      </span>
      <button class="btn w-25 btn-dark my-4" @click="saveDescription">
        Сохранить
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2">
      <div>
        <h2 class="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul>
          <template v-for="(el, ind) of new Array(20)" :key="el">
            <li v-if="meal[`strIngredient${ind + 1}`]">
              {{ ind + 1 }}. {{ meal[`strIngredient${ind + 1}`] }}
            </li>
          </template>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2">Measures</h2>
        <ul>
          <template v-for="(el, ind) of new Array(20)" :key="el">
            <li v-if="meal[`strMeasure${ind + 1}`]">
              {{ ind + 1 }}. {{ meal[`strMeasure${ind + 1}`] }}
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import axiosClient from "../axiosClient";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const meal = ref({});

onMounted(() => {
  axiosClient.get(`lookup.php?i=${route.params.id}`).then(({ data }) => {
    meal.value = data.meals[0] || {};
  });
});
const saveDescription = () => {
  const request = indexedDB.open("foodDatabase", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains("foods")) {
      db.createObjectStore("foods", { autoIncrement: true });
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["foods"], "readwrite");
    const store = transaction.objectStore("foods");

    const foodData = {
      name: meal.value.strMeal,
      description: meal.value.strInstructions,
    };

    const addRequest = store.add(foodData);

    addRequest.onsuccess = () => {
      console.log("Description added to IndexedDB successfully");
    };

    addRequest.onerror = (error) => {
      console.error("Error adding description to IndexedDB:", error);
    };
  };
};
</script>

<style lang="scss" scoped>
.item-details-block {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(0.5turn, #252204, #2a4714, #58340d6c);
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.404);
    border-radius: 10px;
    background: linear-gradient(0.25turn, #9dadb4, #ebf8e1, #f69c3c6c);
  }
  &::-webkit-scrollbar:horizontal {
    display: none;
  }
  img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
  }
}
</style>
