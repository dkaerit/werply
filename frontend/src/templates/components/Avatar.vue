<template>
	<svg class="squircle" viewBox="0 0 200 200">
		<defs>
			<pattern id="squircle" patternUnits="userSpaceOnUse" width="200" height="200">
				<image :xlink:href="gravatarUrl" x="0" y="0" width="200" height="200" />
			</pattern>
		</defs>

		<path d="M100,200c43.8,0,68.2,0,84.1-15.9C200,168.2,200,143.8,200,100s0-68.2-15.9-84.1C168.2,0,143.8,0,100,0S31.8,0,15.9,15.9C0,31.8,0,56.2,0,100s0,68.2,15.9,84.1C31.8,200,56.2,200,100,200z" fill="url(#squircle)" />
	</svg>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
	size: {
		type: String,
		default: "50px",
	},
});

const patternId = ref("");
const gravatarUrl = ref("");

function generateRandomId() {
  var res = "";
  for (let i = 0; i < 6; i++) {
    res += Math.random().toString(36).substring(2, 8);
  }
  return res;
}

onMounted(() => {
	patternId.value = generateRandomId();
	//gravatarUrl.value = `https://www.gravatar.com/avatar/${patternId.value}?d=retro&f=y&s=128`;
   gravatarUrl.value = `https://avatar.marktion.cn//api/avatar/${patternId.value}?t=window`;
   
});
</script>

<style lang="scss" scoped>
.squircle {
	height: v-bind("$props.size");
	width: v-bind("$props.size");
}
</style>
