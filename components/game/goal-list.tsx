import { Fragment, useState } from 'react';
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
   const [newGoal, setNewGoal] = useState<string>('');

   function onDragEnd(result) {
      const { source, destination } = result;
      console.log('GOAL DRAG', source, destination);
      if (!destination) {
         return;
      }
      const newGoals = reorder(props.goals, source.index, destination.index);
      props.updateGoals(newGoals);
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
         {props.disabled ? (
            <></>
         ) : (
            <form className="transition-all duration-200" onSubmit={onAddGoal}>
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
      </Fragment>
   );
};
