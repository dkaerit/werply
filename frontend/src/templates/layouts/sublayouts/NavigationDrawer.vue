<script setup lang="ts"></script>

<template>
	<!-- VERTICAL NAVBAR -->
	<v-navigation-drawer app fixed color="transparent">
		<v-list density="compact" nav>
			<v-list-item prepend-icon="fa:fa-regular fa-comments" title="Inicio" value="home" class="rounded-xl" />
			<v-list-item prepend-icon="fa:fa-regular fa-bell" title="Notificaciones" value="notifications" class="rounded-xl" />
			<v-list-item prepend-icon="fa:fa-regular fa-user" title="Perfil" value="Profile" class="rounded-xl" />
			<v-lit-item>
				<v-btn prepend-icon="fa:fa-regular fa-pen-to-square" color="primary" variant="flat" block rounded xl> Button </v-btn>
			</v-lit-item>
		</v-list>
	</v-navigation-drawer>
</template>
