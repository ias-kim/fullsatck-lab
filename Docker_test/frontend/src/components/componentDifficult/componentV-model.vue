<script setup>
// child.vue
const model = defineModel(); // 반환 값 ref

function update() {
  model.value++;
}
</script>

<template>
  <!-- child.vue -->
  <div>부모에 바인딩된 v-model 값: {{ model }}</div>
  <button @click="update">증가</button>

  <!-- Parent.vue -->
  <Child v-model="countModel" />
</template>

<style scoped></style>
