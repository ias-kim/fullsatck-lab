<script setup>
function increaseCount(n) {
  count.value += n;
}
</script>

<template>
  <!-- MyComponent -->
  <button @click="$emit('someEvent')">Click me!</button>
  \
  <!-- 부모의 사용 예시 -->
  <MyComponent @some-event="callback" />

  <!-- 이벤트 인자 -->
  <button @click="$emit('increaseBy', 1)">1만큼 주가!</button>
  <!-- 부모의 사용 예시 -->
  <MyButton @increase-by="(n) => (count += n)" />
  <!-- 이벤트핸들러가 메서드 -->
  <MyButton @increase-by="increaseCount" />
</template>

<style scoped></style>
