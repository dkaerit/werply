<template>
  <div class="form-group">
    <label :for="inputId" class="form-label">
      <input
        :required="true"
        :type="type"
        :id="inputId"
        class="form-control"
        :name="name"
        :autocomplete="autocomplete"
        :value="modelValue"
        @input="updateValue($event)"
      />
      <span>{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

interface FormGroupProps {
  label: string;
  type?: string;
  name?: string;
  autocomplete?: string;
  modelValue?: string;
}

const props = defineProps<FormGroupProps>();
const emits = defineEmits(['update:modelValue']);
const inputId = computed(() => `input-${props.name}-${Math.random().toString(36).substring(7)}`);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits('update:modelValue', target.value);
};
</script>

  
<style scoped lang="scss">
/* Estilos específicos del componente FormGroup */
.form-group {
  /* Agrega tus estilos personalizados aquí */
  display: auto;
  margin: 10px 0px;
}

label.form-label {
  /* Agrega tus estilos personalizados aquí */
  position: relative;

  input {
      width:100%;
      min-width: 250px;
      padding: 10px;
      background: transparent;
      border: 1px solid #4c5c5d;
      border-radius:10px;
      outline: none;
      transition: 0.1s; 
      &:valid ~ span, &:focus ~ span  {
          transform: translate(10px,-19px);
          font-size: 0.65em;
          padding: 0 5px;
          
      }
      &:valid ~ span  { color: #28aaaa; }
      &:valid { border-color: #28aaaa;  }
  }

  span {
      position: absolute;
      left: 0;
      font-size: 0.8em;
      margin: 9px 9px 9px 15px;
      pointer-events: none;
      transition: 0.1s; 
      background: #050608;
      border-radius: 20px;
  }
}

.form-control {
  /* Agrega tus estilos personalizados aquí */
  display: auto;
}
</style>
  