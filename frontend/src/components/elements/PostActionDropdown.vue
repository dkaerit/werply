<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Trash, BookText } from "lucide-vue-next";

import MoreIcon from "@/assets/svg/more-horizontal.svg";
import StoryPlotIcon from "@/assets/svg/fill/story-plot.svg";

const props = defineProps(["postId"]);

const editPost = () => {
  console.log("Edit Post:", props.postId);
};

const deletePost = () => {
  // Lógica para eliminar el post con el ID props.postId
  console.log("Delete Post:", props.postId);
};

const startPlot = () => {
  // Lógica para iniciar un hilo relacionado con el post con el ID props.postId
  console.log("Start Thread:", props.postId);
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="h-fit p-[3px] rounded-[100%] border-0">
        <MoreIcon class="svgstroke-gray" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <!-- Start Thread -->
      <DropdownMenuItem @click="startPlot">
        <BookText class="mr-2 h-4 w-4" />
        <span>Iniciar trama</span>
      </DropdownMenuItem>

      <!-- Edit Post -->
      <DropdownMenuItem @click="editPost">
        <Edit class="mr-2 h-4 w-4" />
        <span>Editar</span>
      </DropdownMenuItem>

      <!-- Delete Post -->
      <DropdownMenuItem @click="deletePost">
        <Trash class="mr-2 h-4 w-4" />
        <span>Borrar</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
