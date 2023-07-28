<script setup lang="ts">
import HorizontalNavbar from "../layouts/sublayouts/HorizontalNavbar.vue";
import NavigationDrawer from "../layouts/sublayouts/NavigationDrawer.vue";

// Función para sincronizar los desplazamientos
const syncScroll = async () => {
	var newCol1 = document.querySelector("#col1");
	var newCol2 = document.querySelector("#col2");

	if (newCol2 && newCol1) {
		newCol2.scrollTop = newCol1.scrollTop * 0.3;
		if (newCol1.scrollTop <= newCol2.scrollTop) newCol1.scrollTop = newCol2.scrollTop;
	}
};
</script>

<template>
	<v-container class="pa-0">
		<v-row>
			<!-- Column 1 -->
			<v-col id="col1" cols="md-8 12" class="pa-0 overflow-y-auto scrollable-container" style="max-height: 90vh" @scroll="syncScroll">
				<template v-for="index in 9">
					<div fluid class="pa-5 outline-bot">
						<h3 class="mb-3">Card title</h3>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
						<br/><br/>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem! 
					</div>
				</template>
			</v-col>

			<!-- Column 2 -->
			<v-col id="col2" class="d-none outline-left d-md-flex pr-4 overflow-y-auto scrollable-container" style="min-height: 91.5vh" @scroll="syncScroll">
				<v-container>
					zxczczxc
				</v-container>
			</v-col>
		</v-row>
	</v-container>
</template>

<style>
/* ... Estilos de las columnas ... */
/* Estilos personalizados para ocultar el scrollbar */
.scrollable-container {
	scrollbar-width: none; /* Oculta el scrollbar de Firefox */
}

.scrollable-container::-webkit-scrollbar {
	width: 0; /* Oculta el scrollbar de webkit (Chrome, Safari, Opera) */
}
</style>
