<script>
  export default {
    name: "CheckboxItem",

    props: {
      id: {Number, String},
      name: String,
      checked: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>

<template>
  <li>
    <!-- <input type="checkbox" v-model="checked" /> 옵션1 -->
    <input type="checkbox" :checked="checked" /> {{id}} - {{name}}
  </li>
</template>

<style scoped>

</style>