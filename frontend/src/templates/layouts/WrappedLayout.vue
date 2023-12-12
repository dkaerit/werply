<script setup lang="ts">
import HorizontalNavbar from "./partials/HorizontalNavbar.vue";
import NavigationDrawer from "./partials/NavigationDrawer.vue";
import LoginRegister from "../views/LoginRegister.vue";
</script>

<template>
  <LoginRegister />
  <v-layout id="app-layout" app>
    <NavigationDrawer />
    <HorizontalNavbar />
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>
