<template>
  <div id="app">
    <home-link v-if="isNotHome"> </home-link>
    <router-view />
  </div>
</template>

<script setup>
import { ref } from "vue";
import HomeLink from "./components/HomeLink.vue";
import router from "./router/router";

const isNotHome = ref(false);

router.afterEach((to) => {
  isNotHome.value = to.path !== "/";
});
</script>

<style></style>
