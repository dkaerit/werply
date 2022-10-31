<script lang="ts"> 
export default {
  props: { 
    msg: String
  },
  data: () => ({ 
    count: 0 
  }),
  setup: () => {

  }
}
</script>

<template>

  <div>
    <h1>{{ msg }}</h1>

    <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
    </div>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
