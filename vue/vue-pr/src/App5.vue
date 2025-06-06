<script>
  import Sender from "./components/Sender.vue";
  import Receiver from "./components/Receiver.vue";
  export default {
    name: "App5",
    components: {
      Sender, Receiver
    }
  }

</script>

<template>
  <div>
    <Sender />
    <hr />
    <Receiver />
  </div>
</template>

<style scoped>

</style>