<script setup lang="ts">
// @ts-ignore
import { useStore } from "vuex";
import { ref, onBeforeMount, watch, computed } from "vue";
import { useRouter } from "vue-router";
import ResponsiveContainerLayout from "@/components/layouts/ResponsiveContainerLayout.vue";
import SquircleAvatar from "@/components/elements/SquircleAvatar.vue";
import { Button } from "@/components/ui/button";
import { MutualData } from "@/store/mutuals/mutuals.interface.ts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { XOctagon } from "lucide-vue-next";

interface Character {
  _id: string;
  nickname: string;
  pjname: string;
  header: string;
  avatar: string;
}

const store = useStore();
const pjParam = ref<Character | null>(null);
const router = useRouter();
const currentCharacter = ref(store.state["CHARACTERS"].currentCharacter);

/**
 * Hook de ciclo de vida que se ejecuta antes de montar el componente.
 * Obtiene y asigna los datos del personaje actual.
 */
onBeforeMount(async () => {
  const charactername = router.currentRoute.value.params.nickname as string;
  console.log("mount", charactername);
  pjParam.value = await store.dispatch("CHARACTERS/GET_CHARACTER", charactername);
});

/**
 * Watcher que se ejecuta cuando cambia el parámetro de la ruta.
 * Actualiza los datos del personaje basándose en el nuevo nombre de usuario.
 */
watch(
  () => router.currentRoute.value.params.nickname,
  // @ts-ignore
  async (newCharactername: string) => {
    pjParam.value = await store.dispatch("CHARACTERS/GET_CHARACTER", newCharactername);
    //console.log("currentCharacter", store.state["CHARACTERS"].currentCharacter);
  }
);

/**
 * Función para seguir a un personaje.
 * #throws {Error} - Error al seguir al personaje.
 */
const followCharacter = async () => {
  try {
    await store.dispatch("MUTUALS/CREATE_MUTUAL", {
      id1: store.state["CHARACTERS"].currentCharacter._id,
      id2: pjParam.value?._id,
      relationshipType: "pj",
      status: "pending",
    });
  } catch (error) {
    //console.error("Error al seguir al personaje:", error);
    throw error;
  }
};

/**
 * Función para dejar de seguir a un personaje.
 * #throws {Error} - Error al dejar de seguir al personaje.
 */
const unfollowCharacter = async () => {
  try {
    const params = {
      id1: store.state["CHARACTERS"].currentCharacter._id,
      id2: pjParam.value?._id,
    };

    await store.dispatch("MUTUALS/DELETE_MUTUAL", params);
  } catch (error) {
    throw error;
  }
};

const isMutual = computed(() => {
  return (
    pjParam.value &&
    (store.state["MUTUALS"].mutuals?.some(
      (mutual: MutualData) =>
        mutual.id2 === pjParam.value?._id && mutual.status === "active"
    ) ||
      store.state["MUTUALS"].mutuals.some(
        (mutual: MutualData) =>
          mutual.id1 === pjParam.value?._id && mutual.status === "active"
      ))
  );
});

const isPending = computed(() => {
  console.log("isPending", store.state["MUTUALS"].mutuals, pjParam.value?._id);
  return (
    pjParam.value &&
    store.state["MUTUALS"].mutuals?.some(
      (mutual: MutualData) =>
        mutual.id2 === pjParam.value?._id && mutual.status === "pending"
    )
  );
});

const status = computed(() => {
  const currentCharacter = store.state["CHARACTERS"].currentCharacter;

  return {
    pending: pjParam.value?._id !== currentCharacter?._id && isPending.value,
    active: pjParam.value?._id !== currentCharacter?._id && isMutual.value,
    current: pjParam.value?._id === currentCharacter?._id,
    default:
      !isPending.value &&
      !isMutual.value &&
      !(currentCharacter && pjParam.value && pjParam.value._id === currentCharacter?._id),
  };
});
</script>

<template>
  <!--Character Profile: {{ $route.params.nickname }} -->
  <ResponsiveContainerLayout>
    <div class="h-screen">
      <div class="flex flex-col">
        <!-- PARTE DE ARRIBA -->
        <!-- header imagen like twitter header -->
        <div
          v-if="pjParam?.header"
          id="header"
          class="w-full h-[240px] overflow-hidden flex items-center"
        >
          <img :src="pjParam.header" class="w-full" />
        </div>
        <div
          v-else
          id="header"
          class="w-full h-[240px] dark:bg-[#161618] bg-[#dbdbdb]"
        ></div>

        <!-- PARTE DE ABAJO -->
        <div class="px-10 mt-[-80px]">
          <!-- avatar y editar perfil -->
          <div class="relative grid grid-cols-[auto_auto_1fr] gap-3" v-if="pjParam">
            <div class="row-span-2">
              <SquircleAvatar
                v-if="pjParam?.avatar"
                size="145px"
                :name="($route.params.nickname as string)"
              />
              <SquircleAvatar
                v-else
                size="145px"
                :name="($route.params.nickname as string)"
                :bg="true"
              />
            </div>
            <div class="col-start-2 row-start-2 h-[65px] flex flex-col justify-center">
              <div class="font-extrabold text-xl">{{ pjParam?.pjname }}</div>
              <div class="text-zinc-600 mt-[-2px] ml-[-2px]">
                @{{ $route.params.nickname }}
              </div>
            </div>
            <div class="col-start-3 row-start-2 flex items-center justify-end">
              <!--Button editar perfil -->
              <div v-if="currentCharacter != null">
                <Button v-if="status.current" variant="outline">Editar</Button>
                <Button v-if="status.active" @click="unfollowCharacter" variant="outline"
                  >Mutual</Button
                >
                <Button v-if="status.pending" variant="outline" disabled
                  >Pendiente</Button
                >
                <Button v-if="status.default" @click="followCharacter">Seguir</Button>
              </div>
              <div v-else>
                <Alert class="alert p-2 w-auto bg-traslucent-red border-red-400">
                  <div class="flex items-center gap-x-2">
                    <XOctagon class="h-4 w-4 text-red-300" />
                    <AlertDescription>
                      No puedes seguir un personaje desde una cuenta de usuario.
                    </AlertDescription>
                  </div>
                </Alert>
              </div>
            </div>
          </div>
          <div><!-- Bio --></div>
          <div><!-- Otros datos --></div>
          <div><!-- Cantidad de mutuals --></div>
        </div>
      </div>
    </div>
  </ResponsiveContainerLayout>
</template>
