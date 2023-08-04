<script setup lang="ts">
import ToggleThemeButton from "@/templates/components/ToggleThemeButton.vue";
import BtnMenu from "@/templates/components/BtnMenu.vue";
import Searcher from "@/templates/components/Searcher.vue";
import {ref} from 'vue';

const drawer = ref(false);

</script>

<template>
	<!-- HORIZONTAL NAVBAR -->
	<v-app-bar class="outline-bot" color="transparent" flat app fixed>
		<!--<template v-slot:prepend>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>
		</template>-->
		<v-app-bar-nav-icon 
		@click="drawer = true"
		class="d-flex d-sm-none" 
		icon="fa:fa-solid fa-bars"
		screen>
		</v-app-bar-nav-icon>

		<v-app-bar-title>Inicio</v-app-bar-title>
		<v-spacer></v-spacer>
		<Searcher />

		<template v-slot:append>
			<BtnMenu>
				<template #toogle-theme>
					<ToggleThemeButton />
				</template>
			</BtnMenu>
		</template>
	</v-app-bar>
</template>

<style lang="scss">
svg.iOS-svg {
	height: 100px;
	width: 100px;
}

i.fa-solid.fa-bars.v-icon.notranslate.v-icon--size-default {
    font-size: 17px;
}
</style>
