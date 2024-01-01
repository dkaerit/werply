<script setup lang="ts">
import { useAttrs, ref } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

import SearchIcon from "@/assets/svg/search.svg";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  type?: string;
  label?: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const { class: className, ...rest } = useAttrs();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

</script>

<template>
  <div class="flex items-center">
    <SearchIcon
      v-if="props.type === 'search'"
      class="hugeicon absolute w-11 pl-[10px] mt-[2px]"
    />
    <div class="label-float w-full" :class="[
        { 'pt-[4px]': props.type !== 'search' },
      ]">
      <input
        v-model="modelValue"
        :type="type"
        :class="[
          cn(`
          flex h-9 w-full rounded-md border 
          border-input bg-transparent px-3 py-1 text-sm shadow-sm 
          transition-colors 
          
          file:border-0 file:bg-transparent file:text-sm file:font-medium 
          
          focus-visible:outline-none 
          focus-visible:ring-1 focus-visible:ring-ring 
          
          disabled:cursor-not-allowed disabled:opacity-50
          
          placeholder:text-muted-border`, className ?? ''
          ),
          { 'pl-[35px]': props.type === 'search' },
          { 'transparent-placeholder': label },
        ]"
        v-bind="rest"
        :placeholder="label ? '' : String(rest.placeholder)"
      />
      <label><div class="bg"/><span>{{ label }}</span></label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hugeicon {
  transform: scale(0.52);
}

::placeholder {
  color: #3c403b;
  opacity: 1; /* Firefox */
}

.transparent-placeholder::placeholder {
  color: transparent;
}

.label-float {
  position: relative;

  & input {
    border-radius: 5px;
    outline: none;
    min-width: 250px;
    font-size: 16px;
    transition: all 0.1s linear;
    -webkit-transition: all 0.1s linear;
    -moz-transition: all 0.1s linear;

    &:required:invalid + label { color: red; }
    &:required:invalid + label:before { content: "*";}
    &:focus:required:invalid { border: 2px solid red; }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px #2c3b1d inset !important;
      -webkit-text-fill-color: #cce9af !important;
      border: 1px solid #ccff55;
    }

    &:focus { 
      border: 1px solid #b1b3ae;
      --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) hsl(var(--foreground));
      --tw-ring-color: hsl(var(--foreground)); }
    &:focus + label,
    &:not(:placeholder-shown) + label, &:-webkit-autofill ~ label {
      font-size: 13px;
      top: -7px;
      color: hsl(var(--foreground));
      font-weight: 400;

      .bg {
        background: hsl(var(--background));
        transition: 0.1s;
        width: 100%; 
      }
    }
  }

  & label {
    pointer-events: none;
    position: absolute;
    top: calc(50% - 10px);
    left: 15px;
    transition: all 0.1s linear;
    -webkit-transition: all 0.1s linear;
    -moz-transition: all 0.1s linear;
    color: #3c403b;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    padding: 0px 4px;

    .bg { 
      margin-top: 4px;
      background-color: transparent; 
      height: 2px;
      position: absolute;
      width: 90%; 
      z-index: -1;
      transition: 0.1s;
    }
  }
}
</style>
