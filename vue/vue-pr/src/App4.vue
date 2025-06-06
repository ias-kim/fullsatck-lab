<script>
    import InputName from './components/InputName.vue'
    export default {
      name: "App4",
      components: { InputName },
      data() {
        return { parentName: "" }
      },
      methods: {
        nameChangeHandler(e) {
          this.parentName = e.name;
        }
      }
    }
</script>

<template>
    <div>
      <InputName @nameChanged="nameChangeHandler" />
      <h3>APP 데이터 : {{ parentName }}</h3>
    </div>
</template>

<style scoped>

</style>