<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-btn
        id="registerBtn"
        variant="flat"
        v-bind="props"
        class="w-auto ma-2 rounded-xl bg-white flex-grow-1"
        >Registrarse</v-btn
      >
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <!-- CLOSER -->
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="closer-login-register rounded-xl"
            @click="{ isActive.value = false; }"
            ><i class="fa-solid fa-xmark"></i
          ></v-btn>
        </v-card-actions>

        <v-card-title class="text-center">¡Forma parte de Werply!</v-card-title>

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

            <v-btn type="submit" class="w-100" color="primary">Crear cuenta</v-btn>
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
            >Regístrate con Google</v-btn
          >
        </v-container>

        <!-- BUTTON GOOGGLE LOGIN -->
        <v-container class="pb-1 pt-1">
          <v-btn
            prepend-icon="fa:fa-brands fa-microsoft"
            variant="tonal"
            value="home"
            class="rounded-xl w-100 bg-white"
            >Regístrate con Microsoft</v-btn
          >
        </v-container>

        <v-row class="mt-2">
          <v-col class="text-center">
            ¿Ya tienes cuenta?
            <v-btn
              ariant="text"
              density="compact"
              class="text-decoration-none text-cyan-lighten-3"
              @click="{ isActive.value = false;  $emit('toLogin');}"
              >Inicia sesión</v-btn
            >
          </v-col>
        </v-row>
        <br />
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, } from "vue";

const email = ref("");
const password = ref("");

const login = () => {
  // Lógica de inicio de sesión con correo electrónico/usuario y contraseña
  console.log("Iniciar sesión con:", email.value, "Contraseña:", password.value);
  // Aquí debes agregar la lógica real de inicio de sesión
};

const loginWithGoogle = () => {
  // Lógica de inicio de sesión con Google
  console.log("Iniciar sesión con Google");
  // Aquí debes agregar la lógica real de inicio de sesión con Google
};
</script>

<style scoped lang="scss">
.col-buttons-login-register {
  margin: 0px !important;
  padding: 0px !important;
}

.closer-login-register {
  --v-btn-height: 30px !important;
  min-width: 30px !important;
}

.login-register-caption {
  font-size: 11px;
}
</style>
