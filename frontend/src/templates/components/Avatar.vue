<template>
  <svg class="squircle" :width="size" :height="size" viewBox="0 0 200 200">
    <defs>
      <pattern :id="id.toString()" patternUnits="userSpaceOnUse" width="200" height="200">
        <image :xlink:href="image" x="0" y="0" width="200" height="200" />
      </pattern>
    </defs>

    <path
      d="M100,200c43.8,0,68.2,0,84.1-15.9C200,168.2,200,143.8,200,100s0-68.2-15.9-84.1C168.2,0,143.8,0,100,0S31.8,0,15.9,15.9C0,31.8,0,56.2,0,100s0,68.2,15.9,84.1C31.8,200,56.2,200,100,200z"
      :fill="`url(#${id})`"
    />
  </svg>
</template>

<script setup lang="ts">
import { ref, defineProps, onBeforeMount } from "vue";
import DOMPurify from "dompurify";

const props = defineProps({
  size: {
    type: String,
    default: "50px",
  },
});

const id = ref("");
const image = ref("");

async function generateRandomAlphanumeric() {
  const minLength = 1;
  const maxLength = 36;
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
}

async function generateRandomId() {
  let res = "";
  for (let i = 0; i < 6; i++) {
    res += Math.random().toString(36).substring(2, 8);
  }
  return res;
}

function calculateNumericId(str: String, arrayLength: number) {
  let numericId = 0;
  for (let i = 0; i < str.length; i++) numericId += str.charCodeAt(i);

  numericId %= arrayLength;
  return numericId;
}

async function loadImages() {
  const imageArray = Object.values(import.meta.glob("@/assets/avatares/*.png"));
  id.value = await generateRandomAlphanumeric();
  const nid = calculateNumericId(id.value, imageArray.length);
  const loadedImage = await imageArray[nid]();
  return DOMPurify.sanitize((loadedImage as any)?.default || "");
}

onBeforeMount(async () => {
  image.value = await loadImages();
});
</script>

<style lang="scss" scoped>
.squircle {
  height: v-bind("$props.size");
  width: v-bind("$props.size");
}
</style>
