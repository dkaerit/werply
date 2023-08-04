<script setup lang="ts">
import { ref } from "vue";

const items = ref([
   { title: "Click Me" }, 
   { title: "Click Me" }, 
   { title: "Click Me" }, 
   { title: "Click Me 2" }
]);
</script>

<template>
	<v-menu :close-on-content-click="false" persistent no-click-animation>
	  <template v-slot:activator="{ props }">
		<v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
	  </template>
  
	  <v-list>
		<v-list-item v-for="(item, i) in items" :key="i">
		  <v-list-item-title>{{ item.title }}</v-list-item-title>
		</v-list-item>
  
		<!-- Usar la ranura para mostrar contenido adicional -->
		<v-list-item><slot name="toogle-theme"></slot></v-list-item>
	  </v-list>
	</v-menu>
  </template>
  