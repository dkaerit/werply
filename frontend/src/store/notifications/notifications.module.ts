// @ts-ignore
import { Commit, Dispatch } from 'vuex'
import axios from 'axios'
import { uri, store } from '../index';
interface Triggers { commit: Commit, dispatch: Dispatch }

interface Request {
   _id: string;
   id1: string;
   id2: string;
   relationshipType: string;
   status: string;
}

export default {
   namespaced: true,
   state: () => ({}),
   mutations: {},
   actions: {
      async GET_PENDINGS({}: Triggers, identifier: string): Promise<Request[]> {
         try {
            const response = await axios.get(`${uri}/mutuals/id:${identifier}`);
            console.log("GET_PENDINGS-response:",response.data);
            const pendingRequests = response.data
               .filter((request: any) => request.status === "pending");

               console.log("GET_PENDINGS-filtered:",pendingRequests);
            return pendingRequests;
         } catch (error) {
            // Manejar errores (por ejemplo, usuario no autenticado)
            throw new Error('Error al obtener las solicitudes pendientes');
         }
      },
   },
}