<script setup>
import { ref } from 'vue';

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <!-- 텍스트 보간 -->
  <span>메시지: {{ msg }}</span>
  <!-- 원시 HTML -->
  <p>텍스트 보간 사용: {{ rawHtml }}</p>
  <p>v-html 디렉티브 사용 <span v-html="rawHtml"></span></p>
  <!-- 속성 바인딩 -->
  <div v-bind:id="dynamicId"></div>
  <!-- 축약 -->
  <div :id="dynamicId"></div>
  <!-- 불린 속성 -->
  <button :disabled="isButtonDisabled">버튼</button>
  <!-- 함수 호출 -->
  <time :title="toTitleDate(date)" :datetime="date">
    {{ formatDate(date) }}
  </time>
  <!-- 디렉티브 -->
  <p v-if="seen">이제 나를 볼 수 있습니다.</p>
  <!-- 인자 -->
  <a v-bind:href="url">....</a>
  <!-- 축약 -->
  <a :href="url">///</a>
  <a @click="doSomething">~~~</a>
  <!-- 동적인자 -->
  <a v-bind:[attributeName]="url">/./</a>
  <a @:[eventName]="dosomeThing">...</a>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
