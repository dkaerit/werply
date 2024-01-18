<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";

// otros
import GoogleIcon from "@/assets/svg/fill/google.svg";
import { useStore } from "vuex";
import { useToast } from "@/components/ui/toast/use-toast";

// shadcn
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Toaster from "@/components/ui/toast/Toaster.vue";
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
const storedStep = localStorage.getItem("currentStep");
const currentStep = ref(storedStep ? parseInt(storedStep) : 0);
const isLoading = ref(false);
const slideSide = ref("right");
const store = useStore();
const { toast } = useToast();

interface FormDataStep {
  [key: string]: { data: string; status: boolean };
}
const formData = ref<FormDataStep[]>([
  { email: { data: "", status: true }, username: { data: "", status: true } }, // Step 1
  { password1: { data: "", status: true }, password2: { data: "", status: true } }, // Step 2
  // Add more nested objects for additional steps as needed
]);

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
        .string({ required_error: "El campo de la contraseña no puede estar vacío" })
        .refine((password) => /[0-9]/.test(password), {
          message: "Debe incluir al menos un número",
        })
        .refine((password) => /[a-z]/.test(password), {
          message: "Debe incluir al menos una letra minúscula",
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
        .string({ required_error: "El campo de la contraseña no puede estar vacío" })
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
}) as any;

const saveState = () => {
  localStorage.setItem("currentStep", currentStep.value.toString());
};

const nextStep = async (event: Event) => {
  event.preventDefault();
  await form.validate();

  // Si no hubo errores en la validación (form.errors == {})
  if (Object.keys(form.errors.value).length === 0) {
    for (const key in form.values)
      formData.value[currentStep.value][key].data = form.values[key];

    currentStep.value++;
    saveState();
  } else {
    // Mostrar toasts de error para cada campo no válido
    const errorMessages = Object.values(form.errors.value).join(", ");
    toast({
      title: `Error en el formulario`,
      description: `Los siguientes errores fueron encontrados: ${errorMessages}`,
    });
  }
};

const backStep = () => {
  slideSide.value = "left";
  if (currentStep.value > 0) {
    currentStep.value--;
    saveState();
  }
};

const registerUser = async () => {
  try {
    // Realiza la acción de registro llamando a la nueva acción en la store
    isLoading.value = true;
    await store.dispatch("AUTH/REGISTER_USER", {
      avatar: "",
      email: formData.value[0].email,
      nickname: formData.value[0].username,
      username: formData.value[0].username,
      password: formData.value[1].password1,
      pjs: [],
    });
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    if (error instanceof Error) {
      // Manejo de errores y muestra de Toast
      if (error.message) {
        toast({
          title: "Error en el registro",
          description: error.message,
        });
      } else {
        // Manejo de otros errores
        toast({
          title: "Error en el registro",
          description: "Ocurrió un error durante el registro.",
        });
      }
    }
  }
};

onMounted(async () => {});

watch(
  () => form.errors.value,
  async (newErrors) => {
    await form.validate();
    const currentStepData = formData.value[currentStep.value];
    for (const key in currentStepData) {
      currentStepData[key].status = !(key in newErrors);
    }
  }
);
</script>

<template>
  <div class="h-[350px] flex flex-col gap-5">
    <Stepper :nodes="3" :current="currentStep + 1" :direction="slideSide">
      <!-- BEGIN STEP 1 -->
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
                        v-bind="componentField"
                        :valid="formData[0].email.status"
                        :modelValue="formData[0].email.data"
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
                        v-bind="componentField"
                        :valid="formData[0].username.status"
                        :modelValue="formData[0].username.data"
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
          <!-- PARTE DE ABAJO -->
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
      <!-- END STEP 1 -->
      <!-- BEGIN STEP 2 -->
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
                    v-bind="componentField"
                    :valid="formData[1].password1.status"
                    :modelValue="formData[1].password1.data"
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
                    v-bind="componentField"
                    :valid="formData[1].password2.status"
                    :modelValue="formData[1].password2.data"
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
      <!-- END STEP 2 -->
      <!-- BEGIN STEP 3 -->
      <template #step3>
        <ul>
          <li><strong>Email:</strong> {{ formData[0].email.data }}</li>
          <li><strong>Usuario:</strong> {{ formData[0].username.data }}</li>
          <!-- No muestres las contraseñas por razones de seguridad -->
        </ul>
        <br />
        <div class="flex gap-x-2">
          <Button @click="backStep" variant="outline" type="button" :disabled="isLoading">
            Volver
          </Button>
          <Button @click="registerUser" :disabled="isLoading" type="submit">
            <Loading v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            Confirmar
          </Button>
        </div>
      </template>
      <!-- BEGIN STEP 3 -->
    </Stepper>
  </div>
  <div class="absolute"><Toaster /></div>
</template>
