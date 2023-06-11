<script setup lang="ts">
import { ref } from 'vue';
import InputBox from "../components/InputBox.vue";
import SocialButton from "../components/SocialButton.vue";
import { useStore } from 'vuex';

const store = useStore();

// Getter y setter para el valor de userEmailOrTlfn en la store
const loginIdentifier = ref('');

// Mapa de expresiones regulares y nombres de acciones
const actionsMap = {
  authenticationActionEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  authenticationActionTelefono: /^\d+$/,
  authenticationActionUsername: /.*/
};

/**
 * Función para manejar el evento de inicio de sesión
 * #returns void
 */
 const login = (): void => {
  const [action] = Object
  .entries(actionsMap)
  .find(([, regex]) => regex.test(loginIdentifier.value)) || ['authenticationActionUsername'];

  store.dispatch(action, { value: loginIdentifier.value });
};

</script>

<template>
  <div class="box" id="login-container">
    <div class="row" id="logo-row">
      <div class="logo-col col-xs-12">
        <img src="/logo.svg" alt="Logo" class="logo"/>
      </div>
    </div>

    <div class="row" id="login-form">
      <h1 class="title">Inicia sesión en Werply</h1>
      <p>Desata tu creatividad narrativa y construye historias inolvidables junto a otros personajes.</p>

      <div class="buttons">
        <SocialButton provider="google" type="primary" />
        <SocialButton provider="microsoft" type="primary" />
        <br/>
        <form class="form" id="alternative-login" @submit.prevent="login">
          <InputBox label="Teléfono, email o nombre de usuario" name="username" autocomplete="user" v-model="loginIdentifier" />
          <button type="submit" class="primary">Siguiente</button>
          <button class="secondary" id="forgot-password">¿Olvidaste tu contraseña?</button>
        </form>
        <div class="box" id="additional-info">
          <span class="text">¿No tienes una cuenta?</span>
          <a href="#" class="link">Regístrate</a>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
img.logo {
  height: 35px;
  margin: 15px;
}

.box#login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-col {
    display: flex;
    justify-content: center;
}

#login-form {
  display: flex;
  justify-content: center;
  padding: 0px 35px 35px 35px;
  margin: 40px 0px 40px 0px;
  flex-direction: column;
  text-align: center;
  max-width: 600px;
  align-items: center;
}

#logo-row {
    display: flex;
    justify-content: center;
}

h1.title {
  margin: 19px 0px 19px 0px;
  font-size: 25px;
}

form#alternative-login {
    display: flex;
    flex-direction: column;
}

.buttons {
    display: flex;
    flex-direction: column;
    padding: 15px 7%;
    width: fit-content;
}

</style>
