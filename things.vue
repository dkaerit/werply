<v-navigation-drawer>
    <v-list density="compact" nav>
    <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
    <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
    <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
    </v-list>
</v-navigation-drawer>

<v-container fluid>
  <!-- Columna 1: v-navigation-drawer (visible solo en ancho de PC) -->
  <v-row>
    <v-col v-if="isLaptop" cols="3">
        
    </v-col>

    <!-- Columna 2: Timeline de posts -->
    <v-col :cols="isLaptop ? 6 : 12">
      <!-- Contenido del timeline de posts aquí -->
    </v-col>

    <!-- Columna 3: Área para el searcher y cards apiladas (visible solo en ancho de PC) -->
    <v-col v-if="isLaptop" cols="3">
        <v-card variant="flat">
            <v-text-field
                variant="flat"
                density="compact"
                label="Buscar"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                rounded xl
            ></v-text-field>
            <v-container fluid class="ma-0 pa-0">
                <v-card class="mt-4" title="Card title" text="..." variant="tonal"></v-card>
                <v-card class="mt-4" title="Card title" text="..." variant="tonal"></v-card>
                <v-card class="mt-4" title="Card title" text="..." variant="tonal"></v-card>
            </v-container>
        </v-card>
        
    </v-col>
  </v-row>

  <!-- Columna 1: v-bottom-navigation (visible solo en ancho de móvil) -->
  <v-bottom-navigation mode="grow" :elevation="0" v-if="!isLaptop">
    <v-btn value="recent">
        <v-icon>mdi-history</v-icon> 
    </v-btn>
    <v-btn value="favorites">
        <v-icon>mdi-heart</v-icon> 
    </v-btn>
    <v-btn value="nearby">
        <v-icon>mdi-map-marker</v-icon> 
    </v-btn>
  </v-bottom-navigation>
</v-container>