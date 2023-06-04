<script setup lang="ts"> 
import InputBox from "../components/InputBox.vue";
import SocialButton from "../components/SocialButton.vue";
</script>

<template>
<div class="box" id="login-container">
  <!-- Fila donde se ecnuentra el logo -->
  <div class="row" id="logo-row">
    <div class="logo-col col-xs-12">
      <img src="/logo.svg" alt="Logo" class="logo"/>
    </div>
  </div>

  <!-- Fila donde se encuentran los botones del login-->
  <div class="row" id="login-form">
    <h1 class="title">Inicia sesión en Werply</h1>
    <p>Desata tu creatividad y construye narrativas inolvidables junto al resto de personajes</p>

    <!-- Caja de botones-->
    <div class="buttons">
      <SocialButton provider="google" type="primary" />
      <SocialButton provider="microsoft" type="primary" />
      <form class="form" id="alternative-login">
        <InputBox label="Teléfono, email o nombre de usuario" name="username" autocomplete="user" />
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
    padding: 15px 10%;
}

</style>
