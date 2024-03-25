<script setup lang="ts">
// @ts-ignore
import { useStore } from "vuex";
import { ref, onBeforeMount } from "vue";
import { Tabs } from "@/components/ui/tabs";
import DualColumnLayout from "@/components/layouts/DualColumnLayout.vue";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-vue-next";
import SquircleAvatar from "@/components/elements/SquircleAvatar.vue";

interface RelationData {
  idRelacion: string;
  idActor: string;
  avatar: string;
  name: string;
  alias: string;
  routeType: string;
}

const store = useStore();
const pendings = ref();
const idSelf = ref();
const relationDataList = ref<RelationData[]>([]);

onBeforeMount(async () => {
  idSelf.value = store.getters["USERS/getSelected"]._id;
  pendings.value = await store.dispatch("NOTIFICATIONS/GET_PENDINGS", idSelf.value);

  const tag = store.getters["USERS/getTypeSelected"];

  for (const pending of pendings.value) {
    const idOther = pending.id1 == idSelf.value ? pending.id2 : pending.id1;
    let actor = await getActorInfo(idOther, tag);
    relationDataList.value.push({
      idRelacion: pending._id,
      idActor: idOther,
      avatar: actor.avatar,
      name: tag == "user" ? actor.username : actor.nickname,
      alias: tag == "user" ? actor.nickname : actor.pjname,
      routeType: tag == "user" ? "user" : "pj",
    });
  }
});

const getActorInfo = async (id: string, type: string) => {
  return type === "user"
    ? await store.dispatch("USERS/GET_USER_BY_ID", id)
    : await store.dispatch("CHARACTERS/GET_CHARACTER_BY_ID", id);
};

const accept = () => {};
const deny = () => {};
</script>

<template>
  <DualColumnLayout>
    <template #firstColumn>
      <div class="flex-col">
        <Tabs default-value="all">
          <div class="border-b">
            <div class="flex h-16 px-4 items-center justify-between">
              <h2 class="text-lg font-bold tracking-tight">Solicitudes</h2>
            </div>
          </div>

          <!-- Renderizar los datos de la relación -->
          <div
            v-for="relationData in relationDataList"
            :key="relationData.idRelacion"
            class="flex items-center space-x-4 border-b py-4"
          >
            <!-- Columna 1: Avatar -->
            <div class="pl-5">
              <router-link
                :to="`/profile/${relationData.routeType}/${relationData.name}`"
              >
                <SquircleAvatar
                  size="45px"
                  :src="relationData.avatar"
                  :name="(relationData.name as string)"
                />
              </router-link>
            </div>

            <!-- Columna 2: Nombre y Alias -->
            <div class="flex flex-col">
              <router-link
                :to="`/profile/${relationData.routeType}/${relationData.name}`"
              >
                <div class="font-semibold">{{ relationData.name }}</div>
                <div class="graytext text-[0.875rem]">@{{ relationData.alias }}</div>
              </router-link>
            </div>

            <!-- Columna 3: Botones -->
            <div class="flex items-center space-x-2 ml-[auto!important] pr-5">
              <Button
                @click="accept"
                variant="outline"
                size="icon"
                type="submit"
                class="rounded-full"
              >
                <Check class="w-4 h-4" />
              </Button>
              <Button
                @click="deny"
                variant="outline"
                size="icon"
                type="submit"
                class="rounded-full"
              >
                <X class="w-4 h-4" />
              </Button>
            </div>
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
