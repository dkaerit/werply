<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";

// otros
import GoogleIcon from "@/assets/svg/fill/google.svg";
//import { useStore } from "vuex";

// shadcn
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Componentes .vue
import Stepper from "@/components/elements/Stepper.vue";
import Loading from "@/components/elements/Loading.vue";

// zod y vee-validate
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

//const store = useStore();
const currentStep = ref(parseInt(localStorage.getItem("currentStep")) || 0);
const isLoading = ref(false);
const slideSide = ref("right");
const email = ref(localStorage.getItem("email") || "");
const username = ref(localStorage.getItem("username") || "");
const password1 = ref("");
const password2 = ref("");
const fieldStatus = ref<{ [key: string]: boolean }>({
  email: true,
  username: true,
  password1: true,
  password2: true,
});

// zod
const schemas = [
  toTypedSchema(
    z.object({
      email: z
        .string({ required_error: "El email no puede estar en blanco" })
        .email({ message: "Debe ser un email válido" }),
      username: z
        .string({ required_error: "El nombre de usuario no puede estar en blanco" })
        .min(4, { message: "Demasiado corto (mínimo 4 carácteres)" }),
    })
  ),
  toTypedSchema(
    z.object({
      password1: z
        .string()
        .refine((password) => /[0-9]/.test(password), {
          message: "Debe incluir al menos un número",
        })
        .refine((password) => /[A-Z]/.test(password), {
          message: "Debe incluir al menos una letra mayúscula",
        })
        .refine((password) => /[a-z]/.test(password), {
          message: "Debe incluir al menos una letra minúscula",
        })
        .refine((password) => /[-*?!@#$/(){}=.;,]/.test(password), {
          message:
            "Debe incluir al menos un carácter especial: - * ? ! @ # $ / () {} = . , ;",
        })
        .refine((password) => !/(qwerty)|[0-9]{4}/i.test(password), {
          message: "No puede utilizar patrones de teclado o números en secuencia",
        })
        .refine(
          (password) =>
            /^(?!^[0-9]+$)(?!^[A-Z]+$)(?!^[a-z]+$)(?!^.*([A-Za-z0-9])\1{2,}).*$/.test(
              password
            ),
          {
            message:
              "La contraseña no puede consistir únicamente en números, mayúsculas o minúsculas, ni contener caracteres repetidos",
          }
        ),
      password2: z
        .string()
        .refine(() => form.values.password1 === form.values.password2, {
          message: "Passwords don't match",
        }),
    })
  ),
];

const currentSchema = computed(() => {
  return schemas[currentStep.value];
});

const form = useForm({
  validationSchema: currentSchema,
});

const saveState = () => {
  localStorage.setItem("currentStep", currentStep.value.toString());
  localStorage.setItem("email", email.value);
  localStorage.setItem("username", username.value);
  // Puedes agregar más campos según sea necesario
};

const nextStep = async (event: Event) => {
  event.preventDefault();
  await form.validate();
  console.log("event", event);
  console.log("form", form.errors.value);
  console.log("values", form.values);
  if (Object.keys(form.errors.value).length === 0) {
    currentStep.value++;
    saveState();
  }
};

/*
const nextStep = handleSubmit(async (values) => {
  slideSide.value = "right";
  alert("Hola!");
  console.log("Form submitted!", values);

  if (currentStep.value < 3) currentStep.value++;
});*/

const backStep = () => {
  slideSide.value = "left";
  if (currentStep.value > 0) {
    currentStep.value--; // Move to the next step, assuming a maximum of 3 steps
    saveState();
  }
};

watch(
  () => form.errors.value,
  async (newErrors) => {
    for (const key in fieldStatus.value) {
      fieldStatus.value[key] = !(key in newErrors);
    }
  }
);

onMounted(async () => {
  console.log(username.value, email.value);
});
</script>

<template>
  <div class="h-[350px] flex flex-col gap-5">
    <Stepper :nodes="3" :current="currentStep + 1" :direction="slideSide">
      <template #step1>
        <div :class="cn('grid gap-6', $attrs.class ?? '')">
          <form>
            <div class="grid gap-3">
              <div class="grid gap-1">
                <FormField v-slot="{ componentField }" name="email">
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Email"
                        id="email"
                        type="email"
                        auto-capitalize="none"
                        auto-correct="off"
                        v-model="email"
                        v-bind="componentField"
                        :valid="fieldStatus.email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="username">
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Username"
                        id="username"
                        type="text"
                        auto-capitalize="none"
                        auto-correct="off"
                        v-model="username"
                        v-bind="componentField"
                        :valid="fieldStatus.username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <Button :disabled="isLoading" @click="nextStep">
                <Loading v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                Siguiente
              </Button>
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
            <GoogleIcon class="svgfill-foreground mr-2 h-[0.875rem] w-[0.875rem]" />
            Regístrate con Google
          </Button>
        </div>
      </template>
      <template #step2>
        <form>
          <div class="flex flex-col gap-2">
            <FormField v-slot="{ componentField }" name="password1">
              <FormItem>
                <FormControl>
                  <Input
                    label="Contraseña"
                    id="password1"
                    type="password"
                    auto-capitalize="none"
                    auto-correct="off"
                    :disabled="isLoading"
                    :valid="fieldStatus.password1"
                    v-bind="componentField"
                    v-model="password1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password2">
              <FormItem>
                <FormControl>
                  <Input
                    label="Confirmar contraseña"
                    id="password2"
                    type="password"
                    auto-capitalize="none"
                    auto-correct="off"
                    :disabled="isLoading"
                    :valid="fieldStatus.password2"
                    v-bind="componentField"
                    v-model="password2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <br />
          <div class="flex gap-x-2">
            <Button
              @click="backStep"
              variant="outline"
              type="button"
              :disabled="isLoading"
            >
              Volver
            </Button>
            <Button @click="nextStep" variant="outline" :disabled="isLoading">
              <Loading v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              Siguiente
            </Button>
          </div>
        </form>
      </template>
      <template #step3>
        Step 3
        <div class="flex gap-x-2">
          <Button @click="backStep" variant="outline" type="button" :disabled="isLoading">
            Volver
          </Button>
          <Button variant="outline" :disabled="isLoading" type="submit">
            <Loading v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            Siguiente
          </Button>
        </div>
      </template>
    </Stepper>
  </div>
</template>
