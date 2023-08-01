<script setup lang="ts"></script>

<template>
	<!-- VERTICAL NAVBAR -->
	<v-navigation-drawer app fixed color="transparent" width="275">
		<v-list density="compact" nav>
			<v-list-subheader>Menu principal</v-list-subheader>
			<v-list-item prepend-icon="fa:fa-regular fa-comments" title="Inicio" value="home" class="rounded-xl" />
			<v-list-item prepend-icon="fa:fa-regular fa-bell" title="Notificaciones" value="notifications" class="rounded-xl" />
			<v-list-item prepend-icon="fa:fa-regular fa-user" title="Perfil" value="Profile" class="rounded-xl" />

			<v-list-subheader>Otras opciones</v-list-subheader>
			<v-list-item prepend-icon="fa:fa-regular fa-envelope" title="Mensajes Privados" value="Messages" class="rounded-xl" />
			<v-list-item prepend-icon="fa:fa-brands fa-bilibili" title="Werplaces" value="Werplaces" class="rounded-xl" />
			<v-list-item prepend-icon="fa:fa-solid fa-gear" title="Configuración" value="Configuration" class="rounded-xl" />

			<!--<v-lit-item>
				<v-btn prepend-icon="fa:fa-regular fa-pen-to-square" color="primary" variant="flat" block rounded xl> Button </v-btn>
			</v-lit-item>-->
		</v-list>
	</v-navigation-drawer>
</template>

<style>
.v-list-subheader__text {
	color: #50515b;
	font-weight: 700;
	font-size: 12px;
	padding: 31px 0px 10px 0px;
	letter-spacing: 0.8px;
}
</style>
