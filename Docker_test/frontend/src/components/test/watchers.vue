<script setup>
import { reactive, ref, watch, watchEffect } from 'vue';

const question = ref('');
const answer = ref('질문에는 보통 물음표가 들어 있습니다. ;-)');
const loading = ref(false);

// watch는 ref 직접 사용 불가능
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true;
    answer.value = '생각중..';
    try {
      const res = await fetch('https://yesno.wtf/api');
      answer.value = (await res.json()).anser;
    } catch (error) {
      answer.value = '오류! API에 접근할 수 없습니다. ' + error;
    } finally {
      loading.value = false;
    }
  }
});

const x = ref(0);
const y = ref(0);

// 단일
watch(x, (newX) => {
  console.log(`x는 ${newX}`);
});

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`x + y의 합은: ${sum}`);
  },
);

// 여러 소스의 배열
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x는 ${newX}, y는 ${newY}`);
});

const obj = reactive({ count: 0 });
// 이렇게 하면 동작하지 않는다. watch에 ㅅ굿자를 전달하기 떄문에
watch(obj.count, (count) => {
  console.log(`Count는 ${count}`);
});
// 대신 getter를 사용
watch(
  () => obj.count,
  (count) => {
    console.log(`Count: ${count}`);
  },
);

// depp watchers
watch(obj, (newValue, oldValue) => {
  // 중첩된 속성 변경에도 실행된다.
  // 참고: `newValue`와 `oldValue`는
  // 동일한 객체를 가리키므로 같다.
});
obj.count++;

watch(
  () => state.someObject,
  () => {
    // state.someObject가 교체될 때만 실행
  },
);
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // state.someObject가 교체되지 않는 한
    // newValue와 oldValue는 동일
  },
  { deep: true },
);

// watchEffect()
const todoId = ref(1);
const data = ref(null);

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`,
    );
    data.value = await response.json();
  },
  { immediate: true }, // 즉시 실행 감시자
);
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`,
  );
  data.value = await response.json();
});

watch(id, (newId) => {
  fetch(`/api/${newId}`).then(() => {
    // 콜백 로직
  });
});
</script>

<template>
  <p>
    예/아니오로 대답할 수 있는 질문을 해보세요:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>

<style scoped></style>
