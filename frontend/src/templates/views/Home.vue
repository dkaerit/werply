<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify'

// Función para sincronizar los desplazamientos
const syncScroll = async () => {
  var newCol1 = document.querySelector("#col1");
  var newCol2 = document.querySelector("#col2");

  if(newCol2 && newCol1) {
    newCol2.scrollTop = newCol1.scrollTop*0.3;
    if(newCol1.scrollTop <= newCol2.scrollTop) newCol1.scrollTop = newCol2.scrollTop;
  }
};

const theme = useTheme();
const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme';
</script>

<template>
  <v-app>
    <v-layout app >

      <!-- VERTICAL NAVBAR -->
      <v-navigation-drawer app fixed color="transparent">
        <v-list density="compact" nav>
          <v-list-item prepend-icon="fa:fa-regular fa-comments" title="Inicio" value="home" class="rounded-xl"/>
          <v-list-item prepend-icon="fa:fa-regular fa-bell" title="Notificaciones" value="notifications" class="rounded-xl"/>
          <v-list-item prepend-icon="fa:fa-regular fa-user" title="Perfil" value="Profile" class="rounded-xl"/>
          <v-lit-item><v-btn prepend-icon="fa:fa-regular fa-pen-to-square" color="primary" variant="flat" block rounded xl>Button</v-btn></v-lit-item>
        </v-list>
      </v-navigation-drawer>

      <!-- HORIZONTAL NAVBAR -->
      <v-app-bar class="outlined ol-bottom" color="transparent" flat app fixed>
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Inicio</v-app-bar-title>
        

        <template v-slot:append>
          <v-btn @click="toggleTheme" icon="fa:fa-solid fa-circle-half-stroke"></v-btn>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row>
            <!-- Column 1 -->
            <v-col id="col1" cols="8" class="pl-4 overflow-y-auto scrollable-container" 
            style="max-height: 90vh;" @scroll="syncScroll">
                <v-sheet text="" class="neatify pa-5" color="surface" rounded xl>
                  <h3 class="mb-3">Card title</h3>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
                  <v-divider class="mt-3 mb-3"></v-divider>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
                </v-sheet><br/>
                <v-sheet text="" class="neatify pa-5" color="surface" rounded xl>
                  <h3 class="mb-3">Card title</h3>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
                  <v-divider class="mt-3 mb-3"></v-divider>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
                </v-sheet><br/>
                <v-sheet text="" class="neatify pa-5" color="surface" rounded xl>
                  <h3 class="mb-3">Card title</h3>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
                  <v-divider class="mt-3 mb-3"></v-divider>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
                </v-sheet><br/>
                <v-sheet text="" class="neatify pa-5" color="surface" rounded xl>
                  <h3 class="mb-3">Card title</h3>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
                  <v-divider class="mt-3 mb-3"></v-divider>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
                </v-sheet><br/>
            </v-col>

            <!-- Column 2 -->
            <v-col id="col2" cols="4" class="pr-4 overflow-y-auto scrollable-container" 
            style="max-height: 90vh;" @scroll="syncScroll">
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>

  </v-app>
</template>


<style>
  /* ... Estilos de las columnas ... */
  /* Estilos personalizados para ocultar el scrollbar */
  .scrollable-container {
    scrollbar-width: none; /* Oculta el scrollbar de Firefox */
  }

  .scrollable-container::-webkit-scrollbar {
    width: 0; /* Oculta el scrollbar de webkit (Chrome, Safari, Opera) */
  }
</style>
  

  