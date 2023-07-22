<script setup lang="ts">
import HorizontalNavbar from "./sublayouts/HorizontalNavbar.vue";
import NavigationDrawer from "./sublayouts/NavigationDrawer.vue";
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