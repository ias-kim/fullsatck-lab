<script setup>
import MyComponent from './global.vue';
// 가져온 컴포넌트 등록 및 메서드 체이닝도 가능
app
  .component('MyComponent', MyComponent)
  .component('MyComponent2', MyComponent)
  .component('MyComponent3', MyComponent);
</script>

<template>
  <MyComponent />
</template>

<style scoped></style>
