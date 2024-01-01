<script setup lang="ts">
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircledIcon } from "@radix-icons/vue";

import { LogOut } from "lucide-vue-next";

import { ref, computed } from "vue";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

import { useStore } from "vuex";

const store = useStore();
const logout = async () => {
  await store.dispatch("AUTH/DISMISS_TOKEN"); // Realizar acciones necesarias para cerrar sesión
};

type Team = {
  label: string;
  value: string;
};

const groups = [
  {
    label: "Personal Account",
    teams: [
      {
        label: "Alicia Koch",
        value: "personal",
      },
    ],
  },
  {
    label: "Characters",
    teams: [
      {
        label: "Kisame Hoshigaki",
        value: "Kisame Hoshigaki",
      },
      {
        label: "Trafalgar Law",
        value: "Trafalgar Law",
      },
    ],
  },
];

const open = ref(false);
const selectedTeam = ref<Team>(groups[0].teams[0]);
const showNewTeamDialog = ref(false);

const filterFunction = (list: Team[], search: string) =>
  list.filter((i) =>
    i.label ? i.label.toLowerCase().includes(search.toLowerCase()) : i
  );

const shouldShowSecondImage = computed(() => {
  // Check if the selected team belongs to group[1]
  return groups[1].teams.some((team) => team.value === selectedTeam.value?.value);
});
</script>

<template>
  <Dialog v-model:open="showNewTeamDialog">
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[100%] justify-between"
        >
          <!-- user/pj -->
          <div id="bi-profile" class="flex -space-x-3 rtl:space-x-reverse pr-4">
            <img
              class="w-7 h-6 border-2 border-white rounded-full dark:border-gray-800"
              :src="`https://avatar.vercel.sh/${groups[0].teams[0].label}.png`"
              alt=""
            />
            <img
              v-if="shouldShowSecondImage"
              class="w-6 h-6 border-2 border-white rounded-full dark:border-gray-800"
              :src="`https://avatar.vercel.sh/${selectedTeam.value}.png`"
              alt=""
            />
          </div>
          <span class="text-left pl-1 pr-4 truncate w-36">{{
            selectedTeam ? selectedTeam.label : "Username"
          }}</span>
          <ChevronsUpDown class="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="p-0 w-[237px]">
        <Command :filter-function="filterFunction">
          <CommandInput placeholder="Personaje" />
          <CommandEmpty>Sin coincidencias.</CommandEmpty>
          <CommandList>
            <CommandGroup
              v-for="group in groups"
              :key="group.label"
              :heading="group.label"
            >
              <CommandItem
                class="cursor-pointer"
                v-for="team in group.teams"
                :key="team.value"
                :value="team"
                @select="(ev: any) => {
                selectedTeam = ev.detail.value
                open = false
              }"
              >
                <Avatar class="mr-2 h-5 w-5">
                  <AvatarImage
                    :src="`https://avatar.vercel.sh/${team.value}.png`"
                    :alt="team.label"
                    class="grayscale"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {{ team.label }}
                <Check
                  :class="
                    cn(
                      'ml-auto h-4 w-4',
                      selectedTeam?.value === team.value ? 'opacity-100' : 'opacity-0'
                    )
                  "
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <!-- Create new character -->
          <CommandList>
            <CommandGroup>
              <DialogTrigger as-child>
                <CommandItem
                  class="cursor-pointer"
                  value="create-team"
                  @select="
                    () => {
                      open = false;
                      showNewTeamDialog = true;
                    }
                  "
                >
                  <PlusCircledIcon class="mr-2 h-5 w-5" />
                  Crear personaje
                </CommandItem>
              </DialogTrigger>
            </CommandGroup>
          </CommandList>
          <!-- End create new character -->
          <CommandSeparator />
          <!-- Log out -->
          <CommandList>
            <CommandGroup>
              <CommandItem
                id="logout"
                value="logout"
                class="cursor-pointer"
                @click="logout"
              >
                <LogOut class="mr-2 h-5 w-5" />
                <span>Cerrar sesión</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

    <!-- Create character -->
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Crear persoanje</DialogTitle>
        <DialogDescription>
          Crea un nuevo personaje vinculado a tu cuenta.
        </DialogDescription>
      </DialogHeader>
      <div>
        <div class="space-y-4 py-2 pb-4">
          <div class="grid gap-1.5">
            <Input label="Nombre" id="name" placeholder="Nombre" />
            <Input label="Nickname" id="nickname" placeholder="Nickname" />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="showNewTeamDialog = false"> Cancel </Button>
        <Button type="submit"> Continue </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped lang="scss">
#logout:hover {
  background-color: #f23f42;
  color: #fff;
}
</style>
