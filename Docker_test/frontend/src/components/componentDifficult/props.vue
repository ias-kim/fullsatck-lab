<script setup>
import { computed, ref, watch, watchEffect } from 'vue';

const props = defineProps(['foo']);

console.log(props.foo);

defineProps({
  title: String,
  likes: Number,
});

const { foo } = props;
watchEffect(() => {
  // 3.5 이전에는 한 번만 실행
  // 3.5+에서는 "foo" prop이 변경될 때마다 다시 실행
  console.log(foo);
});
watch(foo); // 이는 기대한 대로 동작 X
// watch(props.foo, ...)와 동일

// 단방향 데이터 흐름
const props1 = defineProps(['foo']);
props1.foo = 'bar'; // X 읽기 전용

// 1. prop이 초기값을 전달하는 용도로 사용, 자식 컴포넌트가 이후에 이를 로컬 데이터 속성으로 사용하고 싶을 때
const props2 = defineProps(['initialCounter']);
// counter는 props.initialCounter를 초기값으로만 사용
const counter = ref(props2.initialCounter);
// 2. prop이 변환이 필요한 원시 값으로 전달될 때, prop 값을 사용하는 계산된 속성을 정의
const props3 = defineProps(['size']);
// prop이 변경될 때 자동으로 업데이트되는 계싼된 속성
const normalizedSize = computed(() => props3.size.trim().toLowerCase());
</script>

<template></template>

<style scoped></style>
