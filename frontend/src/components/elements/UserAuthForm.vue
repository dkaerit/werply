<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

import Loading from "@/components/elements/Loading.vue"
import GoogleIcon from "@/assets/svg/fill/google.svg"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Proceso de autenticación
const isLoading = ref(false);
const store = useStore(); // Agrega esta línea para obtener acceso al store de Vuex
const email = ref("");
const password = ref("");

const actionsMap = {
  AUTHENTICATION_ACTION_EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  AUTHENTICATION_ACTION_TELEFONO: /^\d+$/,
  AUTHENTICATION_ACTION_USERNAME: /.*/,
};

const login = async () => {
  try {
    // Lógica de inicio de sesión con correo electrónico/usuario y contraseña
    // Llama a la acción de autenticación del módulo de Vuex
    await store.dispatch("AUTH/AUTHENTICATION_ACTION_EMAIL", {
      identifier: email.value,
      password: password.value,
    });

    console.log(`Token de sesión: ${store.state.AUTH.token}`); // Muestra un alert con el token
  } catch (error) { // Manejo de errores, por ejemplo, mostrar un mensaje de error
    console.error("Error al iniciar sesión:", error);
  }
};

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);

  login();
}

const handlePasswordInput = () => {
  
};
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1 mb-1">
          <!--<Label class="sr-only" for="email"> Email </Label>-->
          <Input
            label="Email"
            id="email"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            v-model="email"
            :disabled="isLoading"
          />
          <Input
            label="Password"
            id="password"
            type="password"
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            :disabled="isLoading"
            v-model="password"
            @input="handlePasswordInput"
          />
        </div>
        <Button :disabled="isLoading">
          <Loading v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Siguiente
        </Button>
        <a href="/forgot-password" class="text-center text-sm">¿Olvidaste tu contraseña?</a>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground"> o </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading">
      <GoogleIcon class="svgfill-foreground mr-2 h-[0.875rem] w-[0.875rem]"/>
      Inicia sesión con Google
    </Button>
  </div>
</template>
