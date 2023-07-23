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
	<v-container fluid>
		<v-row>
			<!-- Column 1 -->
			<v-col id="col1" cols="md-8 12" class="pl-4 overflow-y-auto scrollable-container" style="max-height: 90vh" @scroll="syncScroll">
				<template v-for="index in 9">
					<v-sheet class="shadowed pa-5 med-rounded" color="surface" xl>
						<h3 class="mb-3">Card title</h3>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
						<v-divider class="mt-3 mb-3"></v-divider>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem! </v-sheet
					><br />
				</template>
			</v-col>

			<!-- Column 2 -->
			<v-col id="col2" class="d-none d-md-flex pr-4 overflow-y-auto scrollable-container" style="max-height: 90vh" @scroll="syncScroll">

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
