<script setup lang="ts">
import ResponsiveContainerLayout from "@/components/layouts/ResponsiveContainerLayout.vue";
</script>

<template>
  <ResponsiveContainerLayout>
    Character Profile: {{ $route.params.nickname }}
  </ResponsiveContainerLayout>
</template>
