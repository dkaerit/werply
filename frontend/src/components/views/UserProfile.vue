<script setup lang="ts">
// @ts-ignore
import { useStore } from "vuex";
import { ref, onBeforeMount, watch, computed } from "vue";
import { useRouter } from "vue-router";
import ResponsiveContainerLayout from "@/components/layouts/ResponsiveContainerLayout.vue";
import SquircleAvatar from "@/components/elements/SquircleAvatar.vue";
import { Button } from "@/components/ui/button";
import { MutualData } from "@/store/mutuals/mutuals.interface.ts";

interface User {
  _id: string;
  nickname: string;
  header: string;
  avatar: string;
}

const store = useStore();
const userParam = ref<User | null>(null);
const router = useRouter();
const currentCharacter = ref(store.state["CHARACTERS"].currentCharacter);

/**
 * Hook de ciclo de vida que se ejecuta antes de montar el componente.
 * Obtiene y asigna los datos del usuario actual.
 */
onBeforeMount(async () => {
  const username = router.currentRoute.value.params.username as string;
  userParam.value = await store.dispatch("USERS/GET_USER", username);
});

/**
 * Watcher que se ejecuta cuando cambia el parámetro de la ruta.
 * Actualiza los datos del usuario basándose en el nuevo nombre de usuario.
 */
watch(
  () => router.currentRoute.value.params.username,
  // @ts-ignore
  async (newUsername: string) => {
    if (newUsername !== undefined)
      userParam.value = await store.dispatch("USERS/GET_USER", newUsername);
  }
);

/**
 * Función para seguir a un usuario.
 * #throws {Error} - Error al seguir al usuario.
 */
const followUser = async () => {
  try {
    await store.dispatch("MUTUALS/CREATE_MUTUAL", {
      id1: store.state["USERS"].user._id,
      id2: userParam.value?._id,
      relationshipType: "user",
      status: "pending",
    });
  } catch (error) {
    console.error("Error al seguir al usuario:", error);
    throw error;
  }
};

/**
 * Función para dejar de seguir a un usuario.
 * #throws {Error} - Error al dejar de seguir al usuario.
 */
const unfollowUser = async () => {
  try {
    const params = {
      id1: store.state["USERS"].user._id,
      id2: userParam.value?._id,
    };

    const mutualRes = await store.dispatch("MUTUALS/DELETE_MUTUAL", params);
    console.log("Unfollow exitoso:", mutualRes);
  } catch (error) {
    console.error("Error al dejar de seguir al usuario:", error);
    throw error;
  }
};

const isMutual = computed(() => {
  return (
    userParam.value &&
    (store.state["MUTUALS"].mutuals?.some(
      (mutual: MutualData) =>
        mutual.id2 === userParam.value?._id && mutual.status === "active"
    ) ||
      store.state["MUTUALS"].mutuals.some(
        (mutual: MutualData) =>
          mutual.id1 === userParam.value?._id && mutual.status === "active"
      ))
  );
});

const isPending = computed(() => {
  return (
    userParam.value &&
    store.state["MUTUALS"].mutuals?.some(
      (mutual: MutualData) =>
        mutual.id2 === userParam.value?._id && mutual.status === "pending"
    )
  );
});

const status = computed(() => {
  const currentUser = store.state["USERS"].user;

  return {
    pending: userParam.value?._id !== currentUser._id && isPending.value,
    active: userParam.value?._id !== currentUser._id && isMutual.value,
    current: userParam.value?._id === currentUser._id,
    default:
      !isPending.value &&
      !isMutual.value &&
      !(currentUser && userParam.value && userParam.value._id === currentUser._id),
  };
});
</script>

<template>
  <!--User Profile: {{ $route.params.username }} -->
  <ResponsiveContainerLayout>
    <div class="h-screen">
      <div class="flex flex-col">
        <!-- PARTE DE ARRIBA -->
        <!-- header imagen like twitter header -->
        <div
          v-if="userParam?.header"
          id="header"
          class="w-full h-[240px] overflow-hidden flex items-center"
        >
          <img :src="userParam.header" class="w-full" />
        </div>
        <div
          v-else
          id="header"
          class="w-full h-[240px] dark:bg-[#161618] bg-[#dbdbdb]"
        ></div>

        <!-- PARTE DE ABAJO -->
        <div class="px-10 mt-[-80px]">
          <!-- avatar y editar perfil -->
          <div class="relative grid grid-cols-[auto_auto_1fr] gap-3" v-if="userParam">
            <div class="row-span-2">
              <SquircleAvatar
                v-if="userParam?.avatar"
                size="145px"
                :name="($route.params.username as string)"
              />
              <SquircleAvatar
                v-else
                size="145px"
                :name="($route.params.username as string)"
                :bg="true"
              />
            </div>
            <div class="col-start-2 row-start-2 h-[65px] flex flex-col justify-center">
              <div class="font-extrabold text-xl">{{ userParam?.nickname }}</div>
              <div class="text-zinc-600 mt-[-2px] ml-[-2px]">
                @{{ $route.params.username }}
              </div>
            </div>
            <div class="col-start-3 row-start-2 flex items-center justify-end">
              <!--Button editar perfil -->
              <div v-if="currentCharacter == null">
                <Button v-if="status.current" variant="outline">Editar</Button>
                <Button v-if="status.active" @click="unfollowUser" variant="outline"
                  >Mutual</Button
                >
                <Button v-if="status.pending" variant="outline" disabled
                  >Pendiente</Button
                >
                <Button v-if="status.default" @click="followUser">Seguir</Button>
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
