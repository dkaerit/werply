<script setup lang="ts">
// @ts-ignore
import { useStore } from "vuex";
import { ref, onBeforeMount } from "vue";

const store = useStore();
const pendings = ref();

onBeforeMount(() => {
  pendings.value = store.dispatch(
    "NOTIFICATIONS/GET_PENDINGS",
    store.getters["USERS/getSelected"]._id
  );
});
</script>

<template>
  <DualColumnLayout>
    <template #firstColumn>
      <div class="flex-col">{{ pendings }}</div>
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
