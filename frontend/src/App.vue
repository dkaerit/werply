<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  const isPhone = ref(true);
  const isTablet = ref(false);
  const isNetbook = ref(false);
  const isLaptop = ref(false);
  const isDesktop = ref(false);

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
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });
</script>

<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

:root {
  --v-theme-overlay-multiplier: 0.25!important;
}

button:focus, button:focus-visible {
  outline: none;
}

.outlined {
  border-color: rgba(var(--v-border-color), var(--v-border-opacity))!important;
  &.ol-bottom { border-bottom-width: 1px!important; }
  &.ol-top { border-top-width: 1px!important; }
  &.ol-left { border-left-width: 1px!important; }
  &.ol-right { border-right-width: 1px!important; }
}

// vuetify
.v-btn {
  text-transform: none!important;
  letter-spacing: normal!important;
}

.v-btn__content {
    padding-top: 1px;
}

.neatify {
  box-shadow: 
  0 0px 9px -2px rgba(50, 71, 92, 0.02), 
  0 0px 9px 1px rgba(50, 71, 92, 0.02), 
  0 0px 6px 4px rgba(50, 71, 92, 0.02)!important;
    border-radius: 16px;
}

.rounded-xl {
  border-radius: 100%;
}

.v-list-item--variant-plain, 
.v-list-item--variant-outlined, 
.v-list-item--variant-text, 
.v-list-item--variant-tonal {
    padding-left: 14px!important;
    &.v-list-item--variant-plain, 
    &.v-list-item--variant-outlined, 
    &.v-list-item--variant-text, 
    &.v-list-item--variant-tonal {
      font-size: 10px!important;
    }
}
</style>
