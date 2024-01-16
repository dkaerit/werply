<script setup lang="ts">
import ImageIcon from "@/assets/svg/image.svg";
import TagIcon from "@/assets/svg/tag.svg";
import DiceIcon from "@/assets/svg/dice.svg";
import EmojiIcon from "@/assets/svg/emoji.svg";

import { ref, watch } from "vue";
import { AvlTree } from "@datastructures-js/binary-search-tree";

// shadcn
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const palabras = ref(0);
const caracteres = ref(0);
const postContent = ref("");
const categoria = ref("corto");

const cotas = new AvlTree<{ cota: number; tag: string }>((a, b) => a.cota - b.cota, {
  key: "cota",
})
  .insert({ cota: 0, tag: "corto" })
  .insert({ cota: 40, tag: "medio" })
  .insert({ cota: 200, tag: "extenso" });

watch(postContent, (written: string) => {
  const words = written
    .trim()
    .split(/\s+/)
    .filter((word: string) => word !== "").length;
  const characters = written.length;

  categoria.value = cotas.lowerBoundKey(words)?.getValue().tag as string;
  palabras.value = words;
  caracteres.value = characters;
});

const submitPost = async () => {};
</script>

<template>
  <div
    class="border rounded-md border-input focus-visible:ring-1 focus-visible:ring-ring overflow-auto resize-y min-h-[164px]"
  >
    <Textarea
      v-model="postContent"
      class="p-4 min-h-28 h-[calc(100%-50px)]"
      placeholder="¡Empieza a rolear!"
    />
    <div class="flex p-2 justify-between items-center">
      <div class="flex items-center gap-4 px-2">
        <div title="Añadir imagen">
          <ImageIcon
            class="svgstroke-foreground scale-75 opacity-65 cursor-pointer hover:opacity-75"
          />
        </div>
        <div title="Etiquetar a alquien">
          <TagIcon
            class="svgstroke-foreground scale-75 opacity-65 cursor-pointer hover:opacity-75"
          />
        </div>
        <div title="Asignar tirada de dados">
          <DiceIcon
            class="svgstroke-foreground scale-75 opacity-65 cursor-pointer hover:opacity-75"
          />
        </div>
        <div title="Añadir Emoji">
          <EmojiIcon
            class="svgstroke-foreground scale-75 opacity-65 cursor-pointer hover:opacity-75"
          />
        </div>
      </div>

      <div class="flex items-center gap-x-4">
        <div class="flex items-center text-xs text-gray-500 gap-x-2">
          <div>
            {{ palabras }} {{ palabras === 1 ? "palabra" : "palabras" }} /
            {{ caracteres }}
            {{ caracteres === 1 ? "caracter" : "caracteres" }}
          </div>
          <Badge variant="outline" class="text-gray-500">{{ categoria }}</Badge>
        </div>

        <button class="border px-4 py-1 rounded" @click="submitPost">Enviar</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
