<script setup lang="ts">
import { ref } from "vue";

const search = ref("");
const data = ["Manzana", "Banana", "Naranja", "Pera", "Uva"];
</script>

<template>
  <v-autocomplete 
  clearable
  class="searchbar" 
  prepend-inner-icon="mdi-magnify" 
  variant="flat"
  density="compact" 
  placeholder="Buscar"
  bg-color="inside" 
  overlay-color="rgba(0, 0, 0, 0.5)"
  filled
  :items="data"
  v-model="search" />
</template>

<style lang="scss">
.searchbar {
	.v-field__prepend-inner {
		margin: 0px 10px 0px 5px;
	}

	.v-input__details {
		display: none;
	}
}
</style>
