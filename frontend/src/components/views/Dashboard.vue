<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";

// Importar componentes y estilos
import PostInput from "@/components/elements/PostInput.vue";
import LoadingIndicator from "@/components/elements/LoadingIndicator.vue";
import PostBlock from "@/components/elements/PostBlock.vue";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DualColumnLayout from "@/components/layouts/DualColumnLayout.vue";

// Carga de posts y usuarios
const users = [
  {
    _id: "u1",
    avatar: "aliciakoch.png",
    nickname: "Alicia Koch",
    username: "aliciakoch",
    email: "aliciakoch@example.com",
    pjs: ["pj1", "pj2"],
  },
  {
    _id: "u2",
    avatar: "emeralstride.jpg",
    nickname: "Emeral Stride",
    username: "emeralstride",
    email: "emeralstride@example.com",
    pjs: ["pj3", "pj4"],
  },
];

const personajes = [
  {
    id: "pj1",
    nombre: "Monkey D. Luffy",
    pjname: "joyboy",
    avatar: "joyboy.png",
    bio:
      "¡Soy Monkey D. Luffy, el Capitán de los Piratas del Sombrero de Paja! Estoy en busca del One Piece para convertirme en el Rey de los Piratas.",
    historia:
      "Comencé mi viaje como un joven pirata con el sueño de convertirme en el Rey de los Piratas.",
    personalidad: "Soy extrovertido, valiente y siempre tengo una actitud positiva.",
    edad: 19,
    raza: "Humano",
  },
  {
    id: "pj2",
    nombre: "Son Goku",
    pjname: "saiyanwarrior",
    avatar: "goku.png",
    bio:
      "¡Hola, soy Son Goku, el guerrero Saiyan! Siempre en busca de desafíos fuertes y listo para proteger la Tierra.",
    historia:
      "Desde que era un niño, he luchado contra enemigos poderosos para convertirme en el guerrero más fuerte.",
    personalidad:
      "Soy amigable y apasionado por la lucha, pero también tengo un apetito insaciable.",
    edad: "Varía (adulto)",
    raza: "Saiyan",
  },
  {
    id: "pj3",
    nombre: "Ichigo Kurosaki",
    pjname: "soulslayer",
    avatar: "ichigo.png",
    bio:
      "Soy Ichigo Kurosaki, un poderoso Cazador de Almas. Mi misión es proteger a los vivos de los espíritus malignos.",
    historia:
      "Después de obtener poderes de un Shinigami, me embarqué en la misión de proteger a los vivos y los muertos.",
    personalidad: "Serio y comprometido, siempre listo para la batalla.",
    edad: 17,
    raza: "Humano con poderes espirituales",
  },
  {
    id: "pj4",
    nombre: "Naruto Uzumaki",
    pjname: "hokageflash",
    avatar: "naruto.png",
    bio:
      "¡Hola, soy Naruto Uzumaki, el futuro Hokage de la Aldea Oculta de la Hoja! Busco ser reconocido y proteger a mis seres queridos.",
    historia:
      "Desde mi infancia, he superado desafíos para convertirme en un ninja poderoso y ser respetado por todos.",
    personalidad:
      "Soy optimista y apasionado, siempre buscando la forma de superar mis límites.",
    edad: 17,
    raza: "Humano con chakra",
  },
  {
    id: "pj5", // Natsu Dragneel
    nombre: "Natsu Dragneel",
    pjname: "firedragon",
    avatar: "natsu.png",
    bio:
      "¡Saludos! Soy Natsu Dragneel, un poderoso Dragon Slayer de fuego. Mi misión es derrotar a los enemigos y proteger a mis amigos.",
    historia:
      "Crecí en el gremio Fairy Tail, donde formé fuertes lazos de amistad. Ahora, busco desafíos y aventuras en cada esquina.",
    personalidad:
      "Soy apasionado, valiente y siempre estoy listo para luchar. ¡Mi fuego nunca se apaga!",
    edad: 21,
    raza: "Humano con habilidades de Dragon Slayer",
  },
];

const mutuals = [
  { pj1: "pj1", pj2: "pj2" },
  { pj1: "pj1", pj2: "pj3" },
  { pj1: "pj1", pj2: "pj4" },
  { pj1: "pj1", pj2: "pj5" },
  // ... otras relaciones mutuals ...
];

const AllPosts = ref<
  Array<{
    _id: string;
    pjId: string;
    content: string;
    date: Date;
  }>
>([
  {
    _id: "post1",
    pjId: "pj4", // Naruto
    content:
      "Naruto Uzumaki se encontraba en medio de un bosque, rodeado de árboles imponentes. La energía en el aire era diferente, y su instinto de ninja le decía que algo extraordinario estaba a punto de suceder.\n\n—¿Dónde estoy ahora? ¡Parece que la diversión está a punto de comenzar! ¡Creo que debería explorar y descubrir qué está pasando aquí!",
    date: new Date("December 27, 2023 22:11:00"),
  },
  {
    _id: "post2",
    pjId: "pj2", // Goku
    content:
      "Goku apareció en el horizonte, flotando en el aire con una sonrisa amigable en su rostro. Sus ropas naranjas ondeaban suavemente con la brisa, y su mirada despreocupada contrastaba con la intensidad de su ki.\n\n—¡Hola, amigo! Soy Son Goku. No sé exactamente dónde estamos, pero este lugar tiene una energía increíble. ¡Oh, carne dices! Eso suena genial, estoy listo para un buen festín. ¿Alguien sabe dónde conseguir algo para comer?",
    date: new Date("December 25, 2023 22:00:00"),
  },
  {
    _id: "post3",
    pjId: "pj3", // Ichigo
    content:
      "Ichigo Kurosaki se materializó con un destello de energía espiritual, su zanpakuto colgando a un lado. Sus ojos color ámbar analizaron a los presentes, manteniendo una actitud reservada.\n\n—¡Vaya, vaya! Parece que hemos terminado en algún lugar interesante. No estoy seguro de qué está pasando, pero mi espada está zumbando. ¿Alguien tiene alguna pista de por qué estamos aquí?",
    date: new Date("December 26, 2023 1:30:00"),
  },
  {
    _id: "post4",
    pjId: "pj4", // Naruto
    content:
      "Naruto Uzumaki saltó de un árbol cercano, aterrizando con agilidad. Sus ojos azules destellaban de emoción mientras miraba a los otros.\n\n—¡Hola, gente! ¡Yo soy Naruto Uzumaki! Esto parece emocionante, ¿no? No tengo ni idea de dónde estamos, pero estoy listo para cualquier cosa. ¿Alguna pista sobre por qué estamos aquí? ¡Y, por supuesto, alguien tiene que haber ramen por aquí!",
    date: new Date("December 26, 2023 2:45:00"),
  },
  {
    _id: "post5",
    pjId: "pj1", // Luffy
    content:
      "Luffy sonrió aún más ampliamente al ver a los recién llegados. Se acercó a Goku con entusiasmo.\n\n—¡Goku, hola! Yo soy Monkey D. Luffy. No sé qué está pasando, ¡pero estoy emocionado! Ichigo y Naruto, ¿verdad? ¡Somos un grupo impresionante! En cuanto a la carne, Goku, seguro encontraremos algo por aquí.",
    date: new Date("December 26, 2023 3:00:00"),
  },
  {
    _id: "post6",
    pjId: "pj3", // Ichigo
    content:
      "Ichigo Kurosaki observó a Luffy con curiosidad, su mano descansando sobre el mango de su zanpakuto. \n\n—Monkey D. Luffy, ¿eh? Interesante. No sé qué está pasando, pero parece que nos hemos reunido un grupo peculiar. ¿Alguna habilidad especial que debamos conocer?",
    date: new Date("December 26, 2023 4:15:00"),
  },
  {
    _id: "post7",
    pjId: "pj4", // Naruto
    content:
      "Naruto Uzumaki se rió animadamente ante la pregunta de Ichigo. \n\n—¡Habilidades especiales, dices! Bueno, tengo el chakra y el modo sabio, ¡y puedo hacer clones de sombra! ¡Ah, y no olvides el Rasengan! ¿Alguien más tiene algunas habilidades geniales que quieran compartir?",
    date: new Date("December 26, 2023 5:00:00"),
  },
  {
    _id: "post8",
    pjId: "pj2", // Goku
    content:
      "Goku miró a Naruto con interés, sus ojos brillando con anticipación. \n\n—¡Vaya, eso suena increíble, Naruto! Yo tengo el Kamehameha, la teletransportación instantánea y, por supuesto, el Super Saiyan. ¡Ah, y me encantaría tener una pequeña competencia amistosa! ¿Alguien se anima?",
    date: new Date("December 26, 2023 6:30:00"),
  },
  {
    _id: "post9",
    pjId: "pj5", // Natsu
    content:
      "Natsu Dragneel apareció entre las sombras, con su característico cabello rosa ardiendo. \n\n—¿Competencia amistosa, dices? ¡Eso suena como mi tipo de diversión! Soy Natsu Dragneel, un Dragon Slayer de fuego. ¡Prepárense para una verdadera explosión de llamas!",
    date: new Date("December 26, 2023 7:15:00"),
  },
  {
    _id: "post10",
    pjId: "pj3", // Ichigo
    content:
      "Ichigo Kurosaki sonrió ante la idea de una competencia amistosa. \n\n—Parece que estamos formando un grupo de lo más peculiar. Aunque no sé qué está pasando, estoy listo para cualquier desafío. ¡Vamos a ver quién tiene la habilidad más impresionante!",
    date: new Date("December 26, 2023 8:00:00"),
  },
  {
    _id: "post11",
    pjId: "pj5", // Natsu
    content:
      "Natsu Dragneel levantó una ceja con entusiasmo al escuchar sobre la competencia amistosa. \n\n—¡Vaya, una competencia! Me encanta la idea. ¿Alguien más se une? ¡Quiero ver qué tan ardientes son sus habilidades!",
    date: new Date("December 26, 2023 9:30:00"),
  },
  {
    _id: "post12",
    pjId: "pj4", // Naruto
    content:
      "Naruto Uzumaki sonrió con confianza ante la propuesta de Natsu. \n\n—¡Claro que sí, Natsu! Estoy listo para mostrar lo que puedo hacer. ¡Preparemos el escenario para esta competencia épica!",
    date: new Date("December 26, 2023 10:15:00"),
  },
  {
    _id: "post13",
    pjId: "pj1", // Luffy
    content:
      "Luffy se emocionó al escuchar sobre la competencia. \n\n—¡Genial! ¡Estoy dentro! Será divertido ver quién puede dar el golpe más fuerte. ¡Vamos a hacerlo!",
    date: new Date("December 26, 2023 11:00:00"),
  },
  {
    _id: "post14",
    pjId: "pj3", // Ichigo
    content:
      "Ichigo Kurosaki asintió con determinación. \n\n—Esta competencia suena interesante. Estoy listo para mostrar el poder de un Shinigami. ¡Que comience la contienda!",
    date: new Date("December 26, 2023 12:45:00"),
  },
  {
    _id: "post15",
    pjId: "pj5", // Natsu
    content:
      "Natsu Dragneel se puso de pie con una sonrisa traviesa. \n\n—¡Perfecto! Encontrémosnos en un lugar amplio para que nadie salga herido. ¡Que empiece la competencia de fuego!",
    date: new Date("December 26, 2023 13:30:00"),
  },
  {
    _id: "post16",
    pjId: "pj2", // Goku
    content:
      "Goku se unió a la conversación con entusiasmo. \n\n—¡Esto suena emocionante! Estoy listo para mostrar mi poder. ¿Cómo jugamos esto? ¿Golpes, energía, o algo más?",
    date: new Date("December 26, 2023 14:15:00"),
  },
  {
    _id: "post17",
    pjId: "pj4", // Naruto
    content:
      "Naruto Uzumaki propuso una idea. \n\n—¿Qué tal si cada uno muestra su habilidad más icónica? Así podemos ver quién tiene la técnica más impresionante. ¿Están de acuerdo?",
    date: new Date("December 26, 2023 14:00:00"),
  },
  {
    _id: "post18",
    pjId: "pj3", // Ichigo
    content:
      "Ichigo Kurosaki asintió con aprobación. \n\n—Suena justo. Mostraré el Getsuga Tensho. ¡Prepárense para sentir su poder!",
    date: new Date("December 26, 2023 14:45:00"),
  },
  {
    _id: "post19",
    pjId: "pj1", // Luffy
    content:
      "Luffy estaba emocionado ante la idea de mostrar su técnica. \n\n—¡Perfecto! Voy a usar el Gear Fourth. ¡Será increíble!",
    date: new Date("December 26, 2023 14:30:00"),
  },
  {
    _id: "post20",
    pjId: "pj5", // Natsu
    content:
      "Natsu Dragneel sonrió, emocionado por la competencia que se avecinaba. \n\n—¡Entonces está decidido! Que comience la gran exhibición de poder. ¡Prepárense para quedar asombrados!",
    date: new Date("December 23, 2023 14:15:00"),
  },
  // Puedes continuar agregando más posts según lo necesites
]);

const FavoritePosts = ref<
  Array<{
    _id: string;
    pjId: string;
    content: string;
    date: Date;
  }>
>([
  {
    _id: "post1",
    pjId: "pj4", // Naruto
    content: "SASUKEEEEEEEEEEEEEEEEEEE",
    date: new Date("December 27, 2023 23:11:00"),
  },
]);

// se carga con los post correspondientes
const currentTimeline = ref<
  Array<{
    _id: string;
    pjId: string;
    content: string;
    date: Date;
  }>
>([]);

// Estado y referencias
const loadedPosts = ref(10);
const timelineContainer = ref<HTMLElement | null>(null);
const selectedPjId = ref(users[0].pjs[0]);
const activeTab = ref("all");

// Métodos de utilidad
const getPjById = (pjId: any) => personajes.find((pj) => pj.id === pjId);
const isMutual = (pjId1: any, pjId2: any) =>
  pjId1 === pjId2 ||
  mutuals.some(
    ({ pj1, pj2 }) => (pj1 === pjId1 && pj2 === pjId2) || (pj1 === pjId2 && pj2 === pjId1)
  );

// Mapa de TabsTrigger a lista de posts
const tabPostsMap = ref({
  all: computed(() =>
    AllPosts.value.filter((post) => isMutual(post.pjId, selectedPjId.value))
  ),
  favorites: computed(() =>
    FavoritePosts.value.filter((post) => isMutual(post?.pjId, selectedPjId.value))
  ),
});

// Método para cambiar la lista de posts según el TabsTrigger activo
const changeTimelinePosts = () => {
  currentTimeline.value = tabPostsMap.value[activeTab.value];
};

const changeState = (tabValue: string) => {
  activeTab.value = tabValue;
};

// Observar cambios en activeTab y actualizar la lista de posts
watchEffect(() => {
  changeTimelinePosts();
  console.log(currentTimeline.value);

  const container = timelineContainer.value;
  container?.addEventListener("scroll", handleScroll);
  return () => {
    container?.removeEventListener("scroll", handleScroll);
  };
});

// posts.value.sort((a:any, b:any) => b.date - a.date);

const allPostsLoaded = computed(() => loadedPosts.value >= currentTimeline.value.length);

const handleScroll = () => {
  const container = timelineContainer.value;
  if (container) {
    const scrollPosition = container.scrollTop + container.clientHeight;
    const totalHeight = container.scrollHeight;

    // Define una posición límite para cargar más publicaciones (por ejemplo, 80% del total)
    const loadMoreThreshold = 1;

    if (scrollPosition / totalHeight >= loadMoreThreshold) {
      // Carga más publicaciones
      setTimeout(() => {
        // Carga más publicaciones
        loadedPosts.value += 10;
      }, 500);
    }
  }
};
</script>

<template>
  <DualColumnLayout>
    <template #firstColumn>
      <div class="flex-col">
        <!-- Franja superior -->
        <Tabs default-value="all" class="space-y-4">
          <div class="border-b">
            <div class="flex h-16 px-4 items-center justify-between">
              <h2 class="text-lg font-bold tracking-tight">Inicio</h2>

              <div class="flex items-center">
                <TabsList class="grid grid-flow-col justify-stretch">
                  <TabsTrigger @click="changeState('all')" value="all">
                    Todo
                  </TabsTrigger>
                  <TabsTrigger @click="changeState('favorites')" value="favorites">
                    Tus favoritos
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </div>

          <div
            id="timeline"
            class="flex-1 overflow-auto space-y-2 p-4 pt-3 h-[calc(99vh_-_4rem)]"
            ref="timelineContainer"
          >
            <!-- Post input -->
            <PostInput />

            <!-- Bloques grandes -->
            <template v-if="currentTimeline.length !== 0">
              <PostBlock
                v-for="(post, index) in currentTimeline.slice(0, loadedPosts)"
                :key="index"
                :value="activeTab"
                :post="post"
                :index="index"
                :personaje="getPjById(post?.pjId)"
              />
            </template>

            <!-- begin Loading -->
            <LoadingIndicator :allPostsLoaded="allPostsLoaded" />
            <!-- end Loading -->
          </div>
        </Tabs>
      </div>
    </template>

    <template #secondColumn>
      <div id="copyright" class="w-[95%] text-[0.775rem] text-justify">
        Derechos reservados. Prohibida la reproducción, distribución o uso no autorizado
        sin consentimiento por escrito del titular de derechos de autor. © 2023 Werply.
      </div>
    </template>
  </DualColumnLayout>
</template>

<style scoped lang="scss">
#timeline {
  margin-top: 0px;
}

#copyright {
  color: hsl(var(--foreground));
  opacity: 0.35;
}

.graytext {
  color: hsl(var(--foreground));
  opacity: 0.35;
}
</style>
