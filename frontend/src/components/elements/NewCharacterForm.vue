<script setup lang="ts">
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Crear persoanje</DialogTitle>
      <DialogDescription>
        <ul>
          <li>El personaje que crees estará vinculado a tu cuenta.</li>
          <li>El nombre será aquello con lo que te muesres públicamente.</li>
          <li>El nickname será tu identificador de personaje único.</li>
        </ul>
      </DialogDescription>
    </DialogHeader>
    <div>
      <div class="space-y-4 py-2 pb-4">
        <div class="grid gap-1.5">
          <Input label="Nombre" id="name" placeholder="Nombre" :valid="true" />
          <Input label="Nickname" id="nickname" placeholder="Nickname" :valid="true" />
        </div>
      </div>
    </div>
    <DialogFooter>
      <Button type="submit" @click="continue"> Continue </Button>
    </DialogFooter>
  </DialogContent>
</template>

<style scoped lang="scss">
ul {
  list-style-type: disc; /* o circle, square, etc. */
  padding-left: 20px; /* o el valor que desees */
}
</style>
