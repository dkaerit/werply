<script setup lang="ts">
// @ts-ignore
import { useStore, mapGetters } from "vuex";
import { ref, watchEffect } from "vue";

// Importar componentes y estilos
import PostInput from "@/components/elements/PostInput.vue";
import LoadingIndicator from "@/components/elements/LoadingIndicator.vue";
import PostBlock from "@/components/elements/PostBlock.vue";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DualColumnLayout from "@/components/layouts/DualColumnLayout.vue";
//import { PostData } from "@/store/posts/posts.interface";

const store = useStore();
const activeTab = ref("all");
const allPostsLoaded = ref(false); // sabrá si se han cargado todos los post si dado un page los post devueltos es []
const page = ref(1);
const fetchPosts = (page: number) =>
  store.dispatch("POSTS/FETCH_POSTS", { page: page, pageSize: 10 });

const changeState = (tabValue: string) => {
  activeTab.value = tabValue;
  page.value = 1; // Reiniciar la paginación al cambiar de pestaña
  fetchPosts(page.value);
};

// la lista final de post cargados viene dada por la union de la lista de post propios + la de los mutuals
const loadMore = async () => {
  if (!allPostsLoaded.value) {
    page.value++;
    fetchPosts(page.value); // llegará el punto en que retorne []
    alert("espera");
  }
};

const handleNewPostAdded = () => {
  fetchPosts(page.value);
};

watchEffect(() => {
  fetchPosts(page.value);
});
</script>

<template>
  <DualColumnLayout>
    <template #firstColumn>
      <div class="flex-col">
        <!-- Franja superior -->
        <Tabs default-value="all" class="space-y-4">
          <div class="border-b">
            <div class="flex h-16 px-4 items-center justify-between">
              <h2 class="text-lg font-bold tracking-tight">Inicio</h2>

              <div class="flex items-center">
                <TabsList class="grid grid-flow-col justify-stretch">
                  <TabsTrigger @click="changeState('all')" value="all">
                    Todo
                  </TabsTrigger>
                  <TabsTrigger @click="changeState('favorites')" value="favorites">
                    Tus favoritos
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </div>

          <div
            id="timeline"
            class="flex-1 overflow-auto space-y-2 p-4 pt-3 h-[calc(99vh_-_4rem)]"
          >
            <!-- Post input -->
            <PostInput @new-post-added="handleNewPostAdded" />

            <!-- Bloques grandes -->
            <template v-if="store.state['POSTS'].posts.length !== 0">
              <PostBlock
                v-for="(post, index) in store.state['POSTS'].posts"
                :key="index"
                :value="activeTab"
                :post="post"
                :index="index"
                :authorType="post.authorType"
                :authorId="post.authorId"
              />
            </template>

            <!--<Button :click="loadMore">Cargar más</Button>-->

            <!-- begin Loading -->
            <!--<LoadingIndicator :allPostsLoaded="allPostsLoaded" />-->
            <!-- end Loading -->
          </div>
        </Tabs>
      </div>
    </template>

    <template #secondColumn>
      <div id="copyright" class="w-[95%] text-[0.775rem] text-justify">
        Derechos reservados. Prohibida la reproducción, distribución o uso no autorizado
        sin consentimiento por escrito del titular de derechos de autor. © 2023 Werply.
      </div>
    </template>
  </DualColumnLayout>
</template>

<style scoped lang="scss">
#timeline {
  margin-top: 0px;
}

#copyright {
  color: hsl(var(--foreground));
  opacity: 0.35;
}

.graytext {
  color: hsl(var(--foreground));
  opacity: 0.35;
}
</style>
