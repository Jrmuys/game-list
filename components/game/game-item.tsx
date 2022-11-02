import { Game, Goal } from '../../services/firebase-helpers';
import Image from 'next/image';
import { Progress } from './progress';
import { GoalList } from './goal-list';
import { firestore } from '../../services/firebase.config';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useDocument, useDocumentOnce } from 'react-firebase-hooks/firestore';

export const GameItem = (props: { game: Game; dragHandleProps: any }) => {
   const deleteHandler = () => {
      // Delete the game
      deleteDoc(doc(firestore, 'games', props.game.id))
         .then(() => {
            console.log('Game deleted');
         })
         .catch((error) => {
            console.error('Error deleting game', error);
         });
   };

   const handleUpdateGoals = (newGoals: Goal[]) => {
      console.log(newGoals);
      // Calculate percentage
      const percentage = newGoals.reduce((acc, goal) => {
         if (goal.complete) {
            acc += (1 / newGoals.length) * 100;
         }
         return acc;
      }, 0);
      updateDoc(doc(firestore, 'games', props.game.id), {
         goals: newGoals,
         percentage: percentage,
         status:
            percentage === 100
               ? 'Complete'
               : percentage > 0
               ? 'In Progress'
               : props.game.status,
      })
         .then(() => {
            console.log('Document successfully updated!');
         })
         .catch((error) => {
            console.error('Error updating document: ', error);
         });
   };

   return (
      <div className="max-w-sm mb-4 bg-white rounded overflow-hidden shadow-lg ">
         <div
            {...props.dragHandleProps}
            className="w-full h-44 relative overflow-hidden"
         >
            <img
               className=" object-cover"
               src={props.game.thumbURL}
               alt={props.game.title}
            />
         </div>
         <div className="px-6 py-4">
            <div className="flex items-center justify-between">
               <div className="font-bold text-xl mb-2">{props.game.title}</div>
               <div>
                  {/* Trash button */}
                  <button onClick={deleteHandler} className="ml-auto ">
                     <svg
                        style={{ color: '#f3da35' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                     >
                        {' '}
                        <path
                           d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                           fill="red"
                        ></path>{' '}
                        <path
                           fill-rule="evenodd"
                           d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                           fill="red"
                        ></path>{' '}
                     </svg>
                  </button>
               </div>
            </div>
            <Progress
               percentage={props.game.percentage}
               status={props.game.status}
               disabled={props.game.status === 'Complete'}
            />
            <div>
               <GoalList
                  disabled={props.game.status === 'Complete'}
                  goals={props.game.goals}
                  updateGoals={handleUpdateGoals}
               />
            </div>
         </div>
      </div>
   );
};
