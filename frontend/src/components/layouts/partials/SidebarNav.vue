<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import CharacterSwitcher from "@/components/elements/CharacterSwitcher.vue";

import HomeIcon from "@/assets/svg/home.svg";
import NotificationIcon from "@/assets/svg/notification.svg";
import UserIcon from "@/assets/svg/user.svg";
import MessageIcon from "@/assets/svg/message.svg";
import SettingIcon from "@/assets/svg/setting.svg";
import SquaresIcon from "@/assets/svg/squares.svg";

interface Item {
  title: string;
  href: string;
  svg: any;
}

const $route = useRoute();

const sidebarNavItems: Item[] = [
  { title: "Inicio", href: "/home", svg: HomeIcon },
  { title: "Notificaciones", href: "/notifications", svg: NotificationIcon },
  { title: "Perfil", href: "#", svg: UserIcon },
  { title: "Mensajes", href: "#", svg: MessageIcon },
  { title: "Werplaces", href: "#", svg: SquaresIcon },
  { title: "Configuración", href: "#", svg: SettingIcon },
];
</script>

<template>
  <!-- Franja superior -->
  <aside class="w-16 lg:w-auto">
    <div class="border-none">
      <div class="flex h-16 items-center px-4">
        <div class="hidden lg:block mr-[-65px] tracking-tight font-bold">
          <CharacterSwitcher />
        </div>

        <MainNav class="mx-6" />
        <div class="ml-auto flex items-center space-x-4">
          <!-- toogle button -->
          <Search />
          <UserNav />
        </div>
      </div>
    </div>

    <nav class="flex flex-col lg:space-x-0 lg:space-y-1 pr-2 lg:pl-5">
      <Button
        v-for="item in sidebarNavItems"
        :key="item.title"
        as="a"
        :href="item.href"
        variant="ghost"
        :class="cn('w-full text-left justify-start', $route.path === `${item.href}.html` && 'bg-muted hover:bg-muted')"
      >
        <component :is="item.svg" class="navicon"></component>
        <span class="hidden lg:block pl-4">{{ item.title }}</span>
      </Button>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.navicon {
  stroke: hsl(var(--foreground));
}
</style>
