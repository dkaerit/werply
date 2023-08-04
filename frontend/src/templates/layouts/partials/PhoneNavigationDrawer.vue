<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isVerticalMenuOpen = computed(() => store.state.MENU.isVerticalMenuOpen);

const toggleMenu = () => {
    store.commit('MENU/SET_VERTICAL_MENU_STATE', !isVerticalMenuOpen.value);
};

const closeMenu = () => {
    store.commit('MENU/SET_VERTICAL_MENU_STATE', false);
};
</script>

<template>
    <div>
        <!-- Capa de fondo oscuro -->
        <div v-if="isVerticalMenuOpen" class="overlay" @click="closeMenu"></div>

        <v-app-bar-nav-icon class="d-flex d-sm-none" icon="fa:fa-solid fa-bars" @click="toggleMenu" />
        <v-navigation-drawer v-model="isVerticalMenuOpen" app fixed color="transparent" width="275">
            <!-- Contenido del menú aquí -->
        </v-navigation-drawer>
    </div>
</template>
  

  
<style>
/* Estilos para el fondo oscuro */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Fondo negro translúcido */
    z-index: 999;
    /* Asegura que el fondo esté por encima del contenido */
}
</style>
