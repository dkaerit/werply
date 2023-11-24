<script setup lang="ts">
import { ref } from "vue";
import HorizontalNavbar from "../layouts/sublayouts/HorizontalNavbar.vue";
import NavigationDrawer from "../layouts/sublayouts/NavigationDrawer.vue";
import Avatar from "../components/Avatar.vue";
import Post from "@/templates/components/Post.vue";

// Definir una lista de items de ejemplo

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
		<v-row class="centered">
			<!-- Column 1 -->
			<v-col id="col1" class="col-posts pa-0 overflow-y-auto" cols="md-8 12"
				@scroll="syncScroll">
				<template v-for="index in 9">
					<Post />
				</template>
			</v-col>

			<!-- Column 2 -->
			<v-col id="col2" class="col-widgets d-none outline-left d-md-flex pr-4 overflow-y-auto scrollable-container"
				@scroll="syncScroll">
				<v-container>

					<div class="text-disabled text-body-2 text-justify">
						Condiciones de Servicio Política de Privacidad Política de cookies Accesibilidad Información de
						anuncios Más opciones<br />
						© 2023 Werply.
					</div>
				</v-container>
			</v-col>
		</v-row>
	</v-container>
</template>


<style lang="scss">
/* ... Estilos de las columnas ... */
/* Estilos personalizados para ocultar el scrollbar */
.scrollable-container {
	scrollbar-width: none;
	/* Oculta el scrollbar de Firefox */
}

.scrollable-container::-webkit-scrollbar {
	width: 0;
	/* Oculta el scrollbar de webkit (Chrome, Safari, Opera) */
}

.col-posts {
	max-height: 90vh;
	&::-webkit-scrollbar { width: 3px; }
	&::-webkit-scrollbar-thumb { background-color: rgb(88, 88, 88); border-radius: 2px;}
	margin-right: 2px;
}

.col-widgets {
	min-height: 91.5vh;
	//flex: 0 0 350px!important;
	//max-width: 350px!important;
}
</style>
