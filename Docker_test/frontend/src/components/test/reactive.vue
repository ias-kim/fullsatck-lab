<script setup>
import { reactive, ref } from 'vue';

const count = ref(0); // 내부 값을 객체로 감싸기
const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar'],
});

const state = reactive({ count: 0 }); // 객체를 반응형으로 생성

const raw = {};
const proxy = reactive(raw);
console.log(proxy === raw); // false

console.log(count);
console.log(count.value);

function increment() {
  count.value++;
}

function mutateDeeply() {
  obj.value.nested.count++;
  obj.value.arr.push('baz');
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>

  <button @click="state.count++">
    <!-- 반응형 객체의 모든 속성과 변경을 가로챌 수 있음 -->
    {{ state.count }}
  </button>
</template>

<style scoped></style>
