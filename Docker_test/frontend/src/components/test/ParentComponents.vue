<script setup>
import { ref } from 'vue';
import ButtonComponent from './components.vue';

const posts = ref([
  { id: 1, title: 'My journey with Vue' },
  { id: 2, title: 'Blogging with Vue' },
  { id: 3, title: 'Why Vue is so fun' },
]);

const postFontsize = ref(1);

// PascalCase
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `,
};
</script>

<template>
  <h1>Here is a Child component!</h1>
  <ButtonComponent />
  <!-- 별도의 값 유지, 새로운 인스턴스 생성됨 -->

  <template>
    <div :style="{ fontSize: postFontSize + 'em' }">
      <ButtonComponent
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        @enlarge-text="postFontSize += 0.1"
      />
    </div>
  </template>

  <!-- kebab-case -->
  <blog-post post-title="hello!" @update-post="onupdatePost"></blog-post>
</template>

<style scoped></style>
