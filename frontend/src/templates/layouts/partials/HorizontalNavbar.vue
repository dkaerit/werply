<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
const toggleTheme = () => (theme.global.name.value = theme.global.current.value.dark ? "lightTheme" : "darkTheme");
</script>

<template>
	<!-- HORIZONTAL NAVBAR -->
	<v-app-bar class="outline-bot" color="transparent" flat app fixed>
		<template v-slot:prepend>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>
		</template>

		<v-app-bar-title>Inicio</v-app-bar-title>

		<template v-slot:append>
			<v-btn @click="toggleTheme" icon="fa:fa-solid fa-circle-half-stroke"></v-btn>
			<v-btn icon="mdi-dots-vertical"></v-btn>
		</template>
	</v-app-bar>
</template>
