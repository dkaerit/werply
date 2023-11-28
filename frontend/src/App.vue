<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRouter, RouteLocationNormalizedLoaded, NavigationGuardNext } from "vue-router";

const isPhone = ref(true);
const isTablet = ref(false);
const isNetbook = ref(false);
const isLaptop = ref(false);
const isDesktop = ref(false);
const store = useStore();
const router = useRouter();

const handleResize = () => {
	const width = window.innerWidth;
	isPhone.value = width >= 0;
	isTablet.value = width >= 768;
	isNetbook.value = width >= 992;
	isLaptop.value = width >= 1200;
	isDesktop.value = width >= 1820;
};

onMounted(async () => {
	handleResize();
	window.addEventListener("resize", handleResize);

	try {
    await store.dispatch("AUTH/CHECK_TOKEN_EXPIRATION"); // Llama a la acción CHECK_TOKEN_EXPIRATION antes de cargar la ruta.
    //next(); // Continúa con la navegación.
  } catch (error) {
    console.error("Error checking token expiration:", error);
    router.push({ path: 'home' }); // En caso de error, redirige a la página de inicio de sesión
  }
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", handleResize);
});

</script>

<template>
	<v-app>
		<router-view />
	</v-app>
</template>

<style lang="scss">
</style>
