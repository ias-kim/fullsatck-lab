<script>
import CheckboxItem2 from './components/CheckboxItem2.vue'
export default {
  name: 'App',
  components: { CheckboxItem2 },
  data() {
    return {
      idols: [
        {id: 1, name:"BTS", checked:true},
        {id: 2, name:"rewhi", checked:true},
        {id: 3, name:"BTS", checked:true},
      ]
    }
  }
}
</script>

<template>
  <div>
    <h2>관심있는 K-POP 가수</h2><hr />
    <ul>
      <CheckboxItem2 v-for="idol in idols" :key="idol.id" :idol="idol" />
    </ul>
  </div>
</template>

<style scoped>

</style>