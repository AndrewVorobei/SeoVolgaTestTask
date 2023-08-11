<template>
  <router-link :to="{ name: 'mainPage' }">
    <button class="btn btn-info m-2">Вернуться на главную страницу</button>
  </router-link>
</template>

<script setup></script>

<style lang="scss" scoped>
.btn {
  left: 0;
  position: absolute;
  width: 10%;
  height: 10%;
  border: none;
  text-shadow: rgb(233, 210, 121) 1px 0 10px;
  background: linear-gradient(0.25turn, #ffffff, #ffffff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
