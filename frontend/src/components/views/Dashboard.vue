<script setup lang="ts">
// @ts-ignore
import { useStore } from "vuex";
import { ref, watchEffect, onMounted, onUnmounted } from "vue";

// Importar componentes y estilos
import PostInput from "@/components/elements/PostInput.vue";
import LoadingIndicator from "@/components/elements/LoadingIndicator.vue";
import PostBlock from "@/components/elements/PostBlock.vue";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DualColumnLayout from "@/components/layouts/DualColumnLayout.vue";
import { PostData } from "@/store/posts/posts.interface";

const store = useStore();
const activeTab = ref("all");
const allPostsLoaded = ref(false); // sabrá si se han cargado todos los post si dado un page los post devueltos es []
const loadedPosts = ref([] as PostData[]);
const page = ref(1);
const pageSize = ref(10);
const loadingMore = ref(false);
const forLoadPosts = ref([] as PostData[]);

const changeState = (tabValue: string) => {
  activeTab.value = tabValue;
  // Reiniciar la paginación al cambiar de pestaña
  page.value = 1;
  loadedPosts.value = [];
  fetchPosts();
};

// la lista final de post cargados viene dada por la union de la lista de post propios + la de los mutuals
const loadMore = async () => {
  if (!loadingMore.value) {
    loadingMore.value = true;
    page.value++;
    await fetchPosts();
    loadingMore.value = false;
  }
};

const fetchPosts = async () => {
  loadedPosts.value = await store.dispatch("POSTS/FETCH_POSTS", { page: 1, pageSize: 6 });
  console.log("fetchPosts-loadedposts:", loadedPosts.value);
};

// Observar cambios en activeTab y cargar la sigiente pagina
watchEffect(() => {
  fetchPosts();
  allPostsLoaded.value = forLoadPosts.value.length == 0 ? true : false;
});

// controlar la altura del scroll para cargar más posts
const handleScroll = () => {
  const container = document.getElementById("timeline");
  if (container) {
    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !allPostsLoaded.value) {
      loadMore();
    }
  }
};

// Manejar eventos de scroll al montar y desmontar el componente
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleNewPostAdded = () => {
  fetchPosts();
};
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
            ref="timelineContainer"
            @scroll="handleScroll"
          >
            <!-- Post input -->
            <PostInput @new-post-added="handleNewPostAdded" />

            <!-- Bloques grandes -->
            <template v-if="loadedPosts.length !== 0">
              <PostBlock
                v-for="(post, index) in loadedPosts"
                :key="index"
                :value="activeTab"
                :post="post"
                :index="index"
                :authorType="post.authorType"
                :authorId="post.authorId"
              />
            </template>

            <!-- begin Loading -->
            <LoadingIndicator :allPostsLoaded="allPostsLoaded" />
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
