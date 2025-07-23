<script setup>
import { computed, reactive, ref } from 'vue';

const isActive = ref(true);
const hasError = ref(false);
const error = null;

const activeClass = ref('active');
const errorClass = ref('text-danger');

const classObject = reactive({
  active: true,
  'text-danger': false,
});

const classObject1 = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal',
}));

const styleObject = reactive({
  color: 'red',
  fontSize: '20px',
});
</script>

<template>
  <div
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
  ></div>
  <div :class="classObject"></div>
  <div :class="classObject1"></div>

  <div :class="[isActive, hasError]"></div>
  <!-- 삼항연산자 -->
  <div :class="[isActive ? activeClass : '', errorClass]"></div>
  <div :style="styleObject"></div>
</template>

<style scoped></style>
