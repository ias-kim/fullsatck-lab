<script setup>
import { inject, provide } from 'vue';

provide('message', 'hello!');

const message = inject('message');
// 선택적 값이 사용되지 않을 때, 불필요한 연산이나 부작용을 피하려면 팩토리 함수 생성
const value = inject('key', () => new ExpensiveClass(), true);
</script>

<template></template>

<style scoped></style>
