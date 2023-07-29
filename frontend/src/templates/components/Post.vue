<script setup lang="ts">
import { onMounted } from 'vue';
import Avatar from "@/templates/components/Avatar.vue";

const updateGridVariables = () => {
  const gridContainer = document.querySelector('.d-grid') as HTMLElement;
  if (gridContainer) {
    const columns = gridContainer.getAttribute('data-columns') || '2';
    const rows = gridContainer.getAttribute('data-rows') || '2';

    gridContainer.style.setProperty('--grid-columns', columns);
    gridContainer.style.setProperty('--grid-rows', rows);
  }
};

onMounted(updateGridVariables);
</script>

<template>
	<div fluid class="pa-5 outline-bot">
		<div class="d-grid gap-10" data-columns="2" data-rows="1">
			<!-- p1 -->
			<Avatar size="50px" class="gc1-1 gr1-1" />

         <!-- p2 -->
			<div class="gc2-2">
            <h3 class="mb-2">Card title</h3>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
				<br /><br />
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
			</div>
		</div>
	</div>
</template>

<style></style>
