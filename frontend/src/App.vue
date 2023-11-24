<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

const isPhone = ref(true);
const isTablet = ref(false);
const isNetbook = ref(false);
const isLaptop = ref(false);
const isDesktop = ref(false);
const store = useStore();

const handleResize = () => {
	const width = window.innerWidth;
	isPhone.value = width >= 0;
	isTablet.value = width >= 768;
	isNetbook.value = width >= 992;
	isLaptop.value = width >= 1200;
	isDesktop.value = width >= 1820;
};

onMounted(() => {
	handleResize();
	window.addEventListener("resize", handleResize);
	console.log(`Token de sesión: ${store.state.AUTH.token}`);
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
