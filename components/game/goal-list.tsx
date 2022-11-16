import { Fragment, useEffect, useState } from 'react';
import { Goal } from '../../services/firebase-helpers';
import { firestore } from '../../services/firebase.config';
import { GoalItem } from './goal-item';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (
   list: Iterable<unknown> | ArrayLike<unknown>,
   startIndex: number,
   endIndex: number
) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);

   return result;
};

export const GoalList = (props: {
   goals: Goal[];
   updateGoals: any;
   disabled: boolean;
}) => {
   const [goals, setGoals] = useState(props.goals);
   const [newGoal, setNewGoal] = useState<string>('');
   const [showGoals, setShowGoals] = useState<boolean>(!props.disabled);

   useEffect(() => {
      setShowGoals(!props.disabled);
   }, [props.disabled]);

   function handleToggle() {
      setShowGoals(!showGoals);
   }

   useEffect(() => {
      setGoals(
         props.goals.sort((a, b) => {
            if (a.complete) return 1;
            if (b.complete) return -1;
            else return 1;
         })
      );
   }, [props.goals]);

   function onDragEnd(result) {
      const { source, destination } = result;
      console.log('GOAL DRAG', source, destination);
      if (!destination) {
         return;
      }
      const newGoals = reorder(
         props.goals,
         source.index,
         destination.index
      ) as Goal[];
      props.updateGoals(newGoals);
      setGoals(newGoals);
   }

   const onAddGoal = (event) => {
      event.preventDefault();
      const newGoals = [...props.goals];
      newGoals.push({
         title: newGoal,
         complete: false,
      });
      props.updateGoals(newGoals);
      setNewGoal('');
   };

   const onDelete = (title: string) => {
      const newGoals = [...props.goals];
      const index = newGoals.findIndex((goal) => goal.title === title);
      newGoals.splice(index, 1);
      props.updateGoals(newGoals);
   };

   const onToggle = (event: {
      target: {
         id: string;
         checked: any;
      };
   }) => {
      console.log(event.target.checked);
      console.log(event);

      const newGoals = props.goals.map((goal) => {
         if (goal.title === event.target.id) {
            goal.complete = event.target.checked;
         }
         return goal;
      });
      props.updateGoals(newGoals);
   };

   return (
      <Fragment>
         <div>
            {/* Caret to disable or hide goals */}
            <div className="flex gap-2 mb-2">
               <button onClick={handleToggle} className="text-m font-bold">
                  <svg
                     className={
                        'transition  duration-200 ease-in-out transform ' +
                        (showGoals ? '' : 'rotate-180')
                     }
                     width={20}
                     height={20}
                     viewBox="0 0 256 256"
                     id="Flat"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path d="M128,188a11.96187,11.96187,0,0,1-8.48535-3.51465l-80-80a12.0001,12.0001,0,0,1,16.9707-16.9707L128,159.0293l71.51465-71.51465a12.0001,12.0001,0,0,1,16.9707,16.9707l-80,80A11.96187,11.96187,0,0,1,128,188Z" />
                  </svg>
               </button>
               <h2 className="font-bold">Goals</h2>
            </div>
         </div>

         <div
            // className={
            //    'transition-all duration-1000 max-h-fit ' +
            //    (showGoals ? ' ' : ' max-h-0 opacity-0')
            // }
            style={
               showGoals
                  ? {
                       maxHeight: props.goals.length * 40 + 50 + 'px',
                       opacity: 1,
                       transition: 'max-height 0.25s ease-in-out',
                    }
                  : {
                       maxHeight: '0px',
                       opacity: 0,
                       transition:
                          'max-height 0.25s ease-in-out, opacity 0.25s ease-in-out',
                    }
            }
         >
            <DragDropContext onDragEnd={onDragEnd}>
               <Droppable isDropDisabled={props.disabled} droppableId="goals">
                  {(provided, snapshot) => (
                     <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-col"
                     >
                        {props.goals.map((goal, index) => (
                           <Draggable
                              isDragDisabled={props.disabled}
                              key={goal.title}
                              draggableId={goal.title}
                              index={index}
                           >
                              {(provided, snapshot) => (
                                 <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                 >
                                    <GoalItem
                                       disabled={props.disabled}
                                       goal={goal}
                                       onDelete={onDelete}
                                       onToggle={onToggle}
                                    />
                                 </div>
                              )}
                           </Draggable>
                        ))}
                        {provided.placeholder}
                     </div>
                  )}
               </Droppable>
            </DragDropContext>
            {!props.disabled && (
               <form
                  className="transition-all duration-200"
                  onSubmit={onAddGoal}
               >
                  <input
                     type="text"
                     placeholder="New Goal"
                     value={newGoal}
                     className="border border-gray-300 rounded-md pl-2 pt-1 pb-1 pr-2 focus:border-blue-500 focus:ring-blue-500 "
                     onChange={(event) => setNewGoal(event.target.value)}
                  />
                  <button
                     className=" text-gray-500 font-medium py-2 px-4 rounded hover:text-gray-900"
                     type="submit"
                  >
                     Add Goal
                  </button>
               </form>
            )}
         </div>

         {/* <ul>
            {props.goals.map((goal) => (
               <GoalItem
                  key={goal.title}
                  goal={goal}
                  onToggle={onToggle}
                  onDelete={onDelete}
               />
            ))}
         </ul> */}
      </Fragment>
   );
};
