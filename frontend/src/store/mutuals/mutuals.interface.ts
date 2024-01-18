export interface MutualData {
  _id: string;
  userId1: string;
  userId2: string;
  relationshipType: string;
  status: string;
 }

 export interface MutualState {
  mutuals: MutualData[]
 }