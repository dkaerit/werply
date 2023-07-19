<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Getter y setter para el valor de userEmailOrTlfn en la store
const loginIdentifier = ref('');
const password = ref('');

// Mapa de expresiones regulares y nombres de acciones
const actionsMap = {
  "authenticationActionEmail": /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "authenticationActionTelefono": /^\d+$/,
  "authenticationActionUsername": /.*/
};

/**
 * Función para manejar el evento de inicio de sesión
 * #returns void
 */
const login = (): void => {
  const [action] = Object
    .entries(actionsMap)
    .find(([, regex]) => regex.test(loginIdentifier.value)) || ['authenticationActionUsername'];
  store.dispatch(action, { "identifier": loginIdentifier.value, "password": "" });
};

/**
 * Obtiene las reglas de validación correspondientes según el tipo de identificador de inicio de sesión
 * @param identifier Identificador de inicio de sesión
 * @returns Array de reglas de validación
 */
const getValidationRules = (identifier: string) => {
  for (const [action, regex] of Object.entries(actionsMap)) {
    if (regex.test(identifier)) {
      return action === "authenticationActionUsername" ? [] : ["required", "email"];
    }
  }
  return [];
};
</script>

<template>
    <v-container class="box" id="login-container">
      <v-row id="logo-row">
        <v-col cols="12" class="logo-col">
          <v-img src="/logo.svg" alt="Logo" class="logo"></v-img>
        </v-col>
      </v-row>
  
      <v-row id="login-form">
        <h1 class="title">Inicia sesión en Werply</h1>
        <!--<p>Desata tu creatividad narrativa y construye historias inolvidables junto a otros personajes.</p>-->
  
        <v-col cols="12" class="buttons">
          <v-btn prepend-icon="fa:fa-brands fa-google" variant="flat" rounded xl>Iniciar sesión con Google</v-btn>
          <v-btn prepend-icon="fa:fa-brands fa-microsoft" variant="flat" rounded xl>Iniciar sesión con Microsoft</v-btn>

          <!-- <hr/> -->
  
          <v-form class="form" id="alternative-login" @submit.prevent="login">
            <v-text-field v-model="loginIdentifier" :rules="getValidationRules(loginIdentifier)" label="Teléfono, email o nombre de usuario" name="username" variant="outlined"></v-text-field>
            <v-text-field v-model="password" label="Password" name="password" variant="outlined"></v-text-field>
            <v-btn type="submit" class="primary">Siguiente</v-btn>
            <v-btn class="secondary" id="forgot-password">¿Olvidaste tu contraseña?</v-btn>
          </v-form>
          <v-box class="box" id="additional-info">
            <span class="text">¿No tienes una cuenta?</span>
            <v-btn href="#" rounded xl>Regístrate</v-btn>
          </v-box>
        </v-col>
      </v-row>
    </v-container>
  </template>
  

  
  <style scoped lang="scss">
  .logo {
    height: 35px;
    margin: 15px;
  }
  </style>
  