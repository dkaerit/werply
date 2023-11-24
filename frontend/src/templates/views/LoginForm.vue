<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn
        id="loginBtn"
        variant="outlined"
        v-bind="props"
        class="w-auto ma-2 rounded-xl flex-grow-1"
        >Iniciar sesión</v-btn
      >
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <!-- CLOSER -->
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn class="closer-login rounded-xl" @click="closeLogin(); isActive.value = false"
            ><i class="fa-solid fa-xmark"></i
          ></v-btn>
        </v-card-actions>

        <v-card-title class="text-center">Inicia Sesión en Werply</v-card-title>

        <!-- FORMULARIO LOGIN WITH EMAIL, USERNAME OR PHONE NUMBER -->
        <v-container class="pt-1 pb-0">
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Correo electrónico, nombre de usuario o teléfono"
              variant="outlined"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              variant="outlined"
              required
            ></v-text-field>
            <!--<p class="login-caption mb-5 text-center">
               Al hacer clic en el botón para seguir adelante con el resto de opciones a
               continuación, aceptas las Condiciones de uso y confirmas que has leído la
               Política de privacidad de Werply
             </p>-->
            <v-btn type="submit" class="w-100" color="primary">Siguiente</v-btn>
            <!-- Forgot Password Link -->
            <v-row class="mt-2">
              <v-col class="text-center">
                <router-link
                  class="text-decoration-none text-cyan-lighten-3"
                  to="/forgot-password"
                  >¿Olvidaste tu contraseña?</router-link
                >
              </v-col>
            </v-row>
          </v-form>
        </v-container>

        <!-- DIVIDER or -->
        <v-container class="pt-1 pb-1">
          <v-row align="center">
            <v-col cols="5.5">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="1" class="text-center">o</v-col>
            <v-col cols="5.5">
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-container>

        <!-- BUTTON GOOGGLE LOGIN -->
        <v-container class="pb-1">
          <v-btn
            prepend-icon="fa:fa-brands fa-google"
            variant="tonal"
            value="home"
            class="rounded-xl w-100 bg-white"
            >Iniciar sesión con Google</v-btn
          >
        </v-container>

        <!-- BUTTON GOOGGLE LOGIN -->
        <v-container class="pb-1 pt-1">
          <v-btn
            prepend-icon="fa:fa-brands fa-microsoft"
            variant="tonal"
            value="home"
            class="rounded-xl w-100 bg-white"
            >Iniciar sesión con Microsoft</v-btn
          >
        </v-container>

        <!-- SWITCHER -->
        <v-row class="mt-2">
          <v-col class="text-center">
            ¿Aun no tienes cuenta?
            <v-btn
              variant="text"
              density="compact"
              class="text-decoration-none text-cyan-lighten-3"
              @click="{ isActive.value = false; $emit('toRegister'); }"
              >Regístrate</v-btn
            >
          </v-col>
        </v-row>
        <br />
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';

// Define el estado isActive utilizando ref
const email = ref("");
const password = ref("");
const router = useRouter();
const route = useRoute();

const login = () => {
  // Lógica de inicio de sesión con correo electrónico/usuario y contraseña
  console.log("Iniciar sesión con:", email.value, "Contraseña:", password.value);
  // Aquí debes agregar la lógica real de inicio de sesión
};

const closeLogin = () => {
  const currentParams = { ...route.query }; // Copia de los parámetros actuales
  delete currentParams.form; // Elimina el parámetro 'form' (puede ser 'register' o 'login')
  router.push({ query: currentParams, replace: true });
};
</script>

<style scoped lang="scss">
.closer-login {
  --v-btn-height: 30px !important;
  min-width: 30px !important;
}

.login-caption {
  font-size: 11px;
}
</style>
