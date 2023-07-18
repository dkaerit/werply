<template>
    <button :class="['social', 'primary', provider]">
      <i :class="['fa-brands', faClass[provider]]"></i>
      <span>Iniciar sesión con {{ capitalizedProvider }}</span>
    </button>
  </template>
  
<script setup lang="ts">
    import { ref } from 'vue';

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                             //
    //                                          PROPS                                              //
    //                                                                                             //
    /////////////////////////////////////////////////////////////////////////////////////////////////

    const props = defineProps({
    provider: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                             //
    //                                  VARIABLES REACTIVAS                                        //
    //                                                                                             //
    /////////////////////////////////////////////////////////////////////////////////////////////////

    const provider = ref(props.provider);
    const capitalizedProvider = ref(provider.value ? provider.value.charAt(0).toUpperCase() + provider.value.slice(1) : '');
    const faClass: { [key: string]: string } = {
    google: 'fa-google',
    microsoft: 'fa-microsoft',
    // Agrega configuraciones adicionales según tus necesidades
    };

    
</script>

<style scoped lang="scss">
span {
    margin: 0px 10px;
}
</style>
  
  