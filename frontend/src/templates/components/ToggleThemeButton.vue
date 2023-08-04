<script setup lang="ts">
import { useTheme } from "vuetify";
import { ref, computed } from "vue";

const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "lightTheme" : "darkTheme";
};

const themeIcon = computed(() => {
  return theme.global.current.value.dark ? "fa:fa-solid fa-sun" : "fa:fa-solid fa-moon";
});
</script>

<template>
    <v-btn @click="toggleTheme" class="elevation-0" icon>
        <v-icon>{{ themeIcon }}</v-icon>
    </v-btn>
</template>


  