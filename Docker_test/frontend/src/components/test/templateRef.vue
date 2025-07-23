<script setup>
import { onMounted, ref, useTemplateRef } from 'vue';

// 첫 번째 인자는 템플릿의 ref 값과 일치해야 한다.
const input = useTemplateRef('my-input');

onMounted(() => {
  input.value.focus();
});

const list = ref([
  /* ... */
]);

const itemRefs = useTemplateRef('items');

onMounted(() => console.log(itemRefs.value));
</script>

<template>
  <input ref="my-input" />
  <!-- 컴포넌트에서도 사용가능! -->

  <!-- ref는 Array -->
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>

<style scoped></style>
