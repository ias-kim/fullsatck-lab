<script>
  export default {
    name: 'Receiver',
    created() {
      this.emitter.on("message", this.receiveHandler);
    },
    data() {
      return {
        textMessage: "",
      }
    },
    methods: {
      receiveHandler(msg) {
        this.textMessage = msg;
      }
    }
  }
</script>

<template>
  <div>
    <h2>Receiver</h2>
    <h2>전송된 텍스트: {{textMessage}}</h2>
  </div>
</template>

<style scoped>

</style>