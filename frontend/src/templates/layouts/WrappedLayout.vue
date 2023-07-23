<script setup lang="ts">
import HorizontalNavbar from "./partials/HorizontalNavbar.vue";
import NavigationDrawer from "./partials/NavigationDrawer.vue";
</script>

<template>
   <v-layout app>
      <NavigationDrawer/>
      <HorizontalNavbar/>
      <v-main>
         <router-view/>
      </v-main>
   </v-layout>
</template>