<template>
  <v-container v-if="!tokenSession" class="login-register-poster">
    <v-container class="login-register-poster">
      <v-row align="center">
        <v-col
          cols="0"
          md="8"
          class="login-register-caption hidden-sm-and-down text-left"
        >
          <h2>¡A qué esperas para unirte!</h2>
          <p>Los usuarios de werply siempre encuentran con quien rolear</p>
        </v-col>
        <v-col cols="12" md="4" class="col-buttons-login-register">
          <LoginForm @to-register="toRegister()" />
          <RegisterForm @to-login="toLogin()" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const tokenSession = ref(localStorage.TokenSession);

const toRegister = () => {
  document.getElementById("registerBtn")?.click();
  router.push({ query: { form: "register" } });
};

const toLogin = () => {
  document.getElementById("loginBtn")?.click();
  router.push({ query: { form: "login" } });
};
</script>

<style scoped lang="scss">
.login-register-poster {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0f8093; /* Ajusta el color de fondo según tus preferencias */
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1); /* Agrega una sombra sutil */
  padding: 0px; /* Ajusta el relleno según tus preferencias */
  text-align: center;
  z-index: 910;
  color: white;
}

.login-register-caption {
  padding-left: 15em;
}
</style>
