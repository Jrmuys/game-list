import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from './firebase.config';

export interface Game {
   id: string;
   title: string;
   thumbURL: string;
   status: string;
   userId: string;
   percentage: number;
   index: number;
   goals: Goal[];
}

export interface Goal {
   title: string;
   complete: boolean;
}

export const useGameCollection = (userId: string) => {
   const [value, loading, error] = useCollection(
      query(collection(firestore, 'games'), where('userId', '==', userId))
   );

   return [value, loading, error];
};
