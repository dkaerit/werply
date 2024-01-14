// @ts-ignore
import { Commit, Dispatch } from 'vuex'
import axios from 'axios'

import { uri } from '../index';
interface Triggers { commit: Commit, dispatch: Dispatch }
import { Character, RootCharacterState } from "./characters.interfaces"

export default {
   namespaced: true,
   state: () => ({
     characters: [],
   } as RootCharacterState),
 
   mutations: {
     /**
      * Setea la lista completa de personajes en el estado de la tienda.
      * #param state RootCharacterState del módulo de personajes.
      * #param characters Lista de personajes.
      */
     setCharacters(state: RootCharacterState, characters: Character[]): void {
       state.characters = characters;
     },
 
     /**
      * Añade un personaje al estado de la tienda.
      * #param state RootCharacterState del módulo de personajes.
      * #param character Personaje a añadir.
      */
     addCharacter(state: RootCharacterState, character: Character): void {
       state.characters.push(character);
     },
 
     /**
      * Actualiza un personaje en el estado de la tienda.
      * #param state RootCharacterState del módulo de personajes.
      * #param updatedCharacter Personaje actualizado.
      */
     updateCharacter(state: RootCharacterState, updatedCharacter: Character): void {
       const index = state.characters.findIndex(c => c._id === updatedCharacter._id);
       if (index !== -1) {
         state.characters[index] = updatedCharacter;
       }
     },
 
     /**
      * Elimina un personaje del estado de la tienda.
      * #param state RootCharacterState del módulo de personajes.
      * #param characterId Identificador del personaje a eliminar.
      */
     deleteCharacter(state: RootCharacterState, characterId: string): void {
       state.characters = state.characters.filter(c => c._id !== characterId);
     },
   },
 
   actions: {
     /**
      * Recupera la lista de personajes desde el servidor.
      * #param triggers Objeto conteniendo commit y dispatch de Vuex.
      */
     async FETCH_CHARACTERS({ commit }: Triggers): Promise<void> {
       try {
         const response = await axios.get(`${uri}/characters`);
         commit('setCharacters', response.data);
       } catch (error) {
         throw new Error('Error fetching characters:');
       }
     },
 
     /**
      * Crea un nuevo personaje en el servidor y lo añade al estado de la tienda.
      * #param triggers Objeto conteniendo commit y dispatch de Vuex.
      * #param character Personaje a crear.
      */
     async CREATE_CHARACTER({ commit }: Triggers, character: Character): Promise<void> {
       try {
         const response = await axios.post(`${uri}/characters/create`, character);
         commit('addCharacter', response.data);
       } catch (error) {
         throw new Error('Error creating character:');
       }
     },
 
     /**
      * Actualiza un personaje en el servidor y en el estado de la tienda.
      * #param triggers Objeto conteniendo commit y dispatch de Vuex.
      * #param payload Objeto con characterId (identificador del personaje) y update (datos a actualizar).
      */
     async UPDATE_CHARACTER({ commit }: Triggers, { characterId, update }: { characterId: string, update: Character }): Promise<void> {
       try {
         const response = await axios.put(`${uri}/characters/update:${characterId}`, update);
         commit('updateCharacter', response.data);
       } catch (error) {
         throw new Error('Error updating character:');
       }
     },
 
     /**
      * Elimina un personaje en el servidor y en el estado de la tienda.
      * #param triggers Objeto conteniendo commit y dispatch de Vuex.
      * #param characterId Identificador del personaje a eliminar.
      */
     async DELETE_CHARACTER({ commit }: Triggers, characterId: string): Promise<void> {
       try {
         await axios.delete(`${uri}/characters/delete/${characterId}`);
         commit('deleteCharacter', characterId);
       } catch (error) {
         throw new Error('Error deleting character:');
       }
     },

    /**
     * Verifica la existencia de un nickname para un personaje.
     * #param {Triggers} triggers Objeto que contiene commit y dispatch para gestionar las acciones en Vuex.
     * #param {string} pjname El nickname del personaje a verificar.
     * #throws {Error} Lanza un error si el nickname ya está en uso.
     * #returns {Promise<boolean>} Devuelve true si el nickname no está en uso, de lo contrario, lanza un error.
     */
     async CHECK_NICKNAME_EXISTENCE({}: Triggers, pjname:string): Promise<boolean> {
      try {
        // Realiza una llamada al backend para verificar la existencia del nickname
        const response = await axios.get(`${uri}/characters/check:${pjname}`);
        //console.log("response: ", response.data)
        // Si el nickname ya está en uso, lanza un error
        if (response.data.exists) 
        throw new Error("El nickname ya está en uso");
    
        // Si no hay problemas, devuelve true indicando que el nickname no está en uso
        return false;
      } catch (error) {
        // Captura y relanza el error
        throw new Error("Error inesperado");
      }
     }
   },
 };