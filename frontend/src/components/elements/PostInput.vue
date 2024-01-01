<script setup lang="ts">
   import ImageIcon from "@/assets/svg/image.svg";
   import TagIcon from "@/assets/svg/tag.svg";
   import DiceIcon from "@/assets/svg/dice.svg";
   import EmojiIcon from "@/assets/svg/emoji.svg";

   import { Textarea } from "@/components/ui/textarea";

   import { ref } from 'vue';

   const postContent = ref('');
</script>

<template>
  <div class="border rounded-md border-input focus-visible:ring-1 focus-visible:ring-ring">
    <Textarea v-model="postContent" class="p-4 min-h-28" placeholder="¡Empieza a rolear!" />
    <div class="flex p-2 justify-between items-center">
      <div class="flex gap-4 px-2">
        <div title="Añadir imagen">
          <ImageIcon class="svgstroke-foreground scale-75 opacity-65 cursor-pointer hover:opacity-75"/>
        </div>
        <div title="Etiquetar a alquien">
          <TagIcon class="svgstroke-foreground scale-75 opacity-65 cursor-pointer hover:opacity-75"/>
        </div>
        <div title="Asignar tirada de dados">
          <DiceIcon class="svgstroke-foreground scale-75 opacity-65 cursor-pointer hover:opacity-75"/>
        </div>
        <div title="Añadir Emoji">
          <EmojiIcon class="svgstroke-foreground scale-75 opacity-65 cursor-pointer hover:opacity-75"/>
        </div>
      </div>
      <button class="border px-4 py-1 rounded" @click="submitPost">Enviar</button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
