<script setup lang="ts">
// @ts-ignore
import { useStore } from "vuex";
import SquircleAvatar from "@/components/elements/SquircleAvatar.vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PostActionDropdown from "@/components/elements/PostActionDropdown.vue";
import { ref, watchEffect, onMounted, onUnmounted, onBeforeMount, computed } from "vue";
import { Character } from "@/store/characters/characters.interfaces";
import { UserState } from "@/store/users/users.interfaces";

// Props y variales de estado
//const { post, index, authorType,  } = defineProps(["post", "index", "author"]);

interface CharacterOrUser {
  _id: string;
  type: string;
  avatar: string;
  nickname: string;
  username: string;
  ownerId: string;
  bio: string;
  pjname: string;
}

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  authorType: {
    // "user" o "character"
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});

const store = useStore();
const author = ref({ type: props.authorType } as CharacterOrUser); // + lo que se obtenga por hacer get

const getUser = async (id: string) => {
  console.log("getUser", id);
  return await store.dispatch("USERS/GET_USER_BY_ID", id);
};
const getPj = async (id: string) => {
  console.log("getPj", id);
  return await store.dispatch("CHARACTERS/GET_CHARACTER_BY_ID", id);
};

console.log(author, props.post);

// Methods
const formatRelativeTime = (postDate: any) => {
  const parsedPostDate = new Date(postDate);
  const currentDate = Date.now();
  const differenceInSeconds = Math.floor((currentDate - parsedPostDate.getTime()) / 1000);

  if (differenceInSeconds < 86400) {
    // Si ha pasado menos de un día, muestra la diferencia relativa en horas y minutos
    const hours = Math.floor(differenceInSeconds / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);
    return `Hace ${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
  } else {
    // Si ha pasado más de un día, muestra la fecha en formato "día mes"
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
    return new Intl.DateTimeFormat("es-ES", options).format(
      new Date(props.post.createdAt)
    );
  }
};

onBeforeMount(async () => {
  author.value =
    props.authorType == "character"
      ? await getPj(props.authorId)
      : await getUser(props.authorId);
  author.value["type"] = props.authorType as string;
});
</script>

<template>
  <div :id="`${index}`" class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-7 rounded-md">
        <CardHeader>
          <div class="grid grid-cols-[auto_auto_1fr] justify-start">
            <!-- GRID POST -->
            <!-- Celda 1-1: Avatar -->
            <SquircleAvatar
              size="45px"
              :name="author.type == 'character' ? author.nickname : author.username"
            />

            <!-- Celda 2-1: Título y UserID -->
            <div class="col-start-2 pl-4 flex">
              <div>
                <div>
                  <CardTitle>{{
                    author.type == "character" ? author.pjname : author.nickname
                  }}</CardTitle>
                </div>
                <div class="flex items-center gap-[0.275rem] text-[0.875rem]">
                  <div class="graytext">
                    @{{ author.type == "character" ? author.nickname : author.username }}
                  </div>
                  <div class="graytext">·</div>
                  <div class="graytext">
                    {{ formatRelativeTime(props.post.createdAt) }}
                  </div>
                </div>

                <Separator class="my-2" className="my-2" />
              </div>
            </div>

            <!-- Celda 2-2: Contenido -->
            <div class="row-start-2 pl-4 col-span-2 col-start-2">
              <CardDescription class="text-justify whitespace-pre-line pr-2">
                {{ post.content }}
              </CardDescription>
            </div>

            <!-- Celda 3-1: Dropdown -->
            <div class="row-start-1 col-start-3 pl-4 flex justify-end">
              <PostActionDropdown />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <!-- Contenido adicional si es necesario -->
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.graytext {
  color: hsl(var(--foreground));
  opacity: 0.35;
}
</style>
