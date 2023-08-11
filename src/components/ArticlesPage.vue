<template>
  <div class="main-layout d-flex flex-column">
    <header class="articles-header">
      <h1>Список статей</h1>
    </header>
    <main class="main-block">
      <ul>
        <input
          v-model="keyword"
          type="text"
          class="rounded border-2 w-full mb-3"
          placeholder="Search for ingredients"
          disabled
        />
        <router-link
          :to="{
            name: 'article',
            params: { ingredient: ingredient.strIngredient },
          }"
          v-for="ingredient of computedIngredients.slice(0, 25)"
          :key="ingredient.idIngredient"
          class="card"
        >
          <h3 class="text-2xl font-bold m-2 fw-bold">
            {{ ingredient.strIngredient }}
          </h3>
          <p class="font-monospace m-2 fw-semibold">
            {{ ingredient.strDescription }}
          </p>
        </router-link>
      </ul>
    </main>
  </div>
  <div class="articlesDb">
    <h1>Статьи для вывода</h1>
    <ul v-for="article in savedArticles" :key="article.id">
      <li v-if="savedArticles.length">
        <h3>{{ article.name }}</h3>
        <p class="font-monospace">{{ article.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import axiosClient from "../axiosClient";

import { computed, onMounted, ref } from "vue";

const keyword = ref("");
const ingredients = ref([]);
const savedArticles = ref([]);

const computedIngredients = computed(() => {
  // eslint-disable-next-line vue/no-ref-as-operand
  if (!computedIngredients) return ingredients;

  return ingredients.value.filter((i) =>
    i.strIngredient.toLowerCase().includes(keyword.value.toLowerCase())
  );
});

onMounted(() => {
  axiosClient.get("list.php?i=list").then(({ data }) => {
    ingredients.value = data.meals;
  });
  getSavedArticles();
});

const getSavedArticles = () => {
  const request = indexedDB.open("foodDatabase", 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["foods"], "readonly");
    const store = transaction.objectStore("foods");

    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => {
      savedArticles.value = getAllRequest.result;
    };

    getAllRequest.onerror = (error) => {
      console.error("Error getting saved articles:", error);
    };
  };
};
</script>

<style lang="scss" scoped>
.main-layout {
  width: 50%;
  align-items: center;

  .articles-header {
    display: flex;
    gap: 20px;
    margin: 20px 20px;
  }
  .main-block {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: scroll;
    align-items: center;

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
    ul {
      display: flex;
      flex-direction: column;
      gap: 1em;

      input {
        border: none;
        background: linear-gradient(0.25turn, #c6ced1, #ebf8e1, #f69c3c6c);
        &::placeholder {
          background: linear-gradient(0.25turn, #c6ced1, #ebf8e1, #f69c3c6c);
        }
      }
    }

    ul * {
      text-decoration: none;
      color: rgba($color: #29272779, $alpha: 1);
    }

    ul a {
      background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69c3c6c);
    }
  }
}
.articlesDb {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  width: 30%;
  height: 100%;
  margin-left: 30px;

  h1 {
    margin: 20px 20px;
  }
  ul {
    display: flex;
    height: 300px;
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

    li {
      display: flex;
      flex-direction: column;
      list-style: none;

      h3 {
        background: linear-gradient(0.25turn, #707274, #383f33, #16bbbb6c);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      p {
        background: linear-gradient(0.25turn, #030303, #080808, #000000);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
</style>
