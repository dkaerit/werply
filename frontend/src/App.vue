<script setup lang="ts">
// @ts-ignore
import { useStore } from "vuex";
import { ref, onMounted, onBeforeMount } from "vue";

const store = useStore();
const isPhone = ref(true);
const isTablet = ref(false);
const isNetbook = ref(false);
const isLaptop = ref(false);
const isDesktop = ref(false);
const state = ref(store.state);

// 1280

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
  document.documentElement.classList.add("dark");
});
</script>

<template>
  <div class="flex justify-center">
    <router-view />
  </div>
</template>

<style lang="scss">
.hugeicon {
  stroke: hsl(var(--foreground));
}

.gray-text {
  color: #3c403b;
}

.svgstroke-gray {
  stroke: #3c403b;
}

.svgfill-gray {
  fill: #3c403b;
}

::-webkit-scrollbar {
  width: 5px;
  border: 10px solid var(--background);
}
::-webkit-scrollbar-thumb {
  //background-color: color-mix(in hsl shorter hue, hsl(0, 0%, 10%) 50%, hsl(var(--border)));
  background-color: hsl(var(--border));
  border-radius: 2px;
  border: 1px solid hsl(var(--background));
}

.svgfill-foreground {
  fill: hsl(var(--foreground));
}

.svgstroke-foreground {
  stroke: hsl(var(--foreground));
}

.bg-lat {
  background: url("@/assets/bg/bg-a.png");
  background-size: cover;
  background-position: center;
}
</style>
