<script setup lang="ts"> 
import { ref, computed } from 'vue'
import { useStore } from 'vuex'; let store = useStore()

// data
let count = computed(() => store.state.count)
let another = ref('')

// props
const props = defineProps({
  msg: String
})

// methods
/** #brief incrementa el contadir */
function increment() {
  //store.commit('INCREMENT')
}

/** #brief incrementa el contadir */
function decrement() {
  //store.commit('DECREMENT')
}

</script>

<template>

  <div>
    <h1>{{ msg }}</h1>

    <div class="card">
      <button type="button" @click="increment">count is {{ count }} </button>
    </div>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
