<script setup>
import { ref } from 'vue';

const count = ref(0);
defineProps(['title']);
defineEmits(['enlarge-text']);
</script>

<template>
  <button @click="count++">You Clicked Me {{ count }}</button>

  <template>
    <div class="blog-post">
      <h4>{{ title }}</h4>
      <button @click="$emit('enlarge-text')">Enlarge Text</button>
    </div>
  </template>
</template>

<style scoped></style>
