<script>
  export default{
    name: "Sender",
    methods: {
      sendMessage() {
        this.emitter.emit("message", Date.now() + "에 발신된 메세지")
      }
    }
  }
</script>

<template>
  <div>
    <h2>Sender</h2><hr/>
    <button @clicked="sendMessage">메세지 수신</button>
  </div>
</template>

<style scoped>

</style>