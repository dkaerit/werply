<script setup lang="ts">
import SquircleAvatar from "@/components/elements/SquircleAvatar.vue";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PostActionDropdown from "@/components/elements/PostActionDropdown.vue"


// Props
const { post, index, personaje } = defineProps(['post', 'index', 'personaje']);

// Methods
const formatRelativeTime = (postDate:any) => {
  const currentDate = Date.now();
  const differenceInSeconds = Math.floor((currentDate - postDate) / 1000);

  if (differenceInSeconds < 86400) {
    // Si ha pasado menos de un día, muestra la diferencia relativa en horas y minutos
    const hours = Math.floor(differenceInSeconds / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);
    return `Hace ${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  } else {
    // Si ha pasado más de un día, muestra la fecha en formato "día mes"
    const options = { day: 'numeric', month: 'short' };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(postDate));
  }
};

</script>


<template>
  <div :id="index" class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-7 rounded-md">
        <CardHeader>
          <div class="grid grid-cols-[auto_auto_1fr] justify-start"> <!-- GRID POST -->
            <!-- Celda 1-1: Avatar -->
            <SquircleAvatar :src="`https://avatar.vercel.sh/${personaje.avatar}`" size="45px" />

            <!-- Celda 2-1: Título y UserID -->
            <div class="col-start-2 pl-4 flex">
              <div>
                <div>
                  <CardTitle>{{ personaje.nombre }}</CardTitle>
                </div>
                <div class="flex items-center gap-[0.275rem] text-[0.875rem]">
                  <div class="graytext">@{{ personaje.pjname }}</div>
                  <div class="graytext">·</div>
                  <div class="graytext">{{ formatRelativeTime(post.date) }}</div>
                  
                </div>
                
                <Separator class="my-2" className="my-2" />

              </div>
            </div>

            <!-- Celda 2-2: Contenido -->
            <div class="row-start-2 pl-4 col-span-2 col-start-2">
              <CardDescription class="text-justify whitespace-pre-line pr-2">
                {{ post.content }}
              </CardDescription>
            </div>

            <!-- Celda 3-1: Dropdown -->
            <div class="row-start-1 col-start-3 pl-4 flex justify-end">
              <PostActionDropdown/>
            </div>
            
          </div>
        </CardHeader>
        <CardContent>
          <!-- Contenido adicional si es necesario -->
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">

.graytext {
  color: hsl(var(--foreground));
  opacity: 0.35;
}
</style>
 

 