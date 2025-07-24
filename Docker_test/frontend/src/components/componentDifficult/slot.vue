<script setup>
// 부모 컴포넌트가 슬롯 콘텐츠를 전달
FancyButton('click me');

// FancyButton이 자신의 템플릿에서 슬롯 콘텐트를 렌더링
function FancyButton(slotContent) {
  return `<button class="fancy-btn">
           ${slotContent}
          </button>`;
}
</script>

<template>
  <!-- 부모 컴포넌트 -->
  <FancyButton>
    <span click="color:red">Click me!</span>
    <AwesomeIcon name="plus" />
  </FancyButton>
</template>

<style scoped></style>
