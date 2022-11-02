import { Game } from '../../services/firebase-helpers';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { GameItem } from './game-item';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../services/firebase.config';
import { runTransaction } from 'firebase/firestore';

const filterGamesByStatus = (games: { [id: string]: Game }, status: string) => {
   return Object.values(games)
      .filter((game) => game.status === status)
      .sort((a, b) => a.index - b.index);
};

export function GameList(props: { games: { [id: string]: Game } }) {
   console.log(props.games);

   const [state, setState] = useState([
      filterGamesByStatus(props.games, 'Not Started'),
      filterGamesByStatus(props.games, 'In Progress'),
      filterGamesByStatus(props.games, 'Complete'),
   ]);

   useEffect(() => {
      console.log('GAME LIST', props.games);
      // Update the games lists
      setState([
         filterGamesByStatus(props.games, 'Not Started'),
         filterGamesByStatus(props.games, 'In Progress'),
         filterGamesByStatus(props.games, 'Complete'),
      ]);
   }, [props.games]);

   function onDragEnd(result) {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
         return;
      }
      const sInd = +source.droppableId;
      const dInd = +destination.droppableId;
      try {
         runTransaction(firestore, async (transaction) => {
            if (sInd === dInd) {
               const items = reorder(
                  state[sInd],
                  source.index,
                  destination.index
               );

               items.forEach((game) => {
                  // Update the game index
                  transaction.update(doc(firestore, 'games', game.id), {
                     index: items.indexOf(game) + 1,
                  });
               });

               const newState = [...state];
               newState[sInd] = items;
               setState(newState);
            } else {
               const result = move(
                  state[sInd],
                  state[dInd],
                  source,
                  destination
               );
               const newState = [...state];
               newState[sInd] = result[sInd];
               newState[dInd] = result[dInd];
               setState(newState);
               result[sInd].forEach((game) => {
                  // Update the game index
                  transaction.update(doc(firestore, 'games', game.id), {
                     index: result[sInd].indexOf(game) + 1,
                  });
               });

               result[dInd].forEach((game) => {
                  // Update the game index
                  transaction.update(doc(firestore, 'games', game.id), {
                     index: result[dInd].indexOf(game) + 1,
                  });
               });

               if (dInd === 2) {
                  // Update the status of the game
                  const game = result[dInd][destination.index];
                  transaction.update(doc(firestore, 'games', game.id), {
                     status: 'Complete',
                  });
               } else if (dInd === 1) {
                  // Update the status of the game
                  const game = result[dInd][destination.index];
                  transaction.update(doc(firestore, 'games', game.id), {
                     status: 'In Progress',
                  });
               } else if (dInd === 0) {
                  // Update the status of the game
                  const game = result[dInd][destination.index];
                  transaction.update(doc(firestore, 'games', game.id), {
                     status: 'Not Started',
                  });
               }
            }
         });
         console.log('Transaction successfully committed!');
      } catch (error) {
         console.log(error);
      }

      // Update the game order in the database
   }

   return (
      <Fragment>
         <div>
            <div className="flex flex-1 gap-2 mt-4">
               <DragDropContext onDragEnd={onDragEnd}>
                  {state.map((status, index) => (
                     <div className="flex flex-col gap-2">
                        <Droppable droppableId={`${index}`} key={index}>
                           {(provided, snapshot) => (
                              <div
                                 className=" bg-gray-100 p-4 rounded-lg m-2"
                                 {...provided.droppableProps}
                                 style={{ width: '400px' }}
                                 ref={provided.innerRef}
                              >
                                 <div className="font-medium mb-2 ">
                                    {index == 0
                                       ? 'Not Started'
                                       : index == 1
                                       ? 'In Progress'
                                       : 'Complete'}
                                 </div>
                                 <div className="flex flex-col \">
                                    {status.map((game, index) => (
                                       <Draggable
                                          key={game.id}
                                          draggableId={game.id}
                                          index={index}
                                       >
                                          {(provided, snapshot) => (
                                             <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                             >
                                                <GameItem
                                                   game={game}
                                                   dragHandleProps={
                                                      provided.dragHandleProps
                                                   }
                                                />
                                             </div>
                                          )}
                                       </Draggable>
                                    ))}
                                    {provided.placeholder}
                                 </div>
                              </div>
                           )}
                        </Droppable>
                     </div>
                  ))}
               </DragDropContext>
            </div>
         </div>
      </Fragment>
   );
}

// a little function to help us with reordering the result
const reorder = (list: Game[], startIndex: number, endIndex: number) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);

   return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
   // some basic styles to make the items look a bit nicer
   userSelect: 'none',
   padding: grid * 2,
   margin: `0 0 ${grid}px 0`,

   // change background colour if dragging
   background: isDragging ? 'lightgreen' : 'grey',

   // styles we need to apply on draggables
   ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
   background: isDraggingOver ? 'lightblue' : 'lightgrey',
   padding: grid,
   width: 250,
});

/**
 * Moves an item from one list to another list.
 */
const move = (
   source: Iterable<unknown> | ArrayLike<unknown>,
   destination: Iterable<unknown> | ArrayLike<unknown>,
   droppableSource: any,
   droppableDestination: any
) => {
   const sourceClone = Array.from(source);
   const destClone = Array.from(destination);
   const [removed] = sourceClone.splice(droppableSource.index, 1);

   destClone.splice(droppableDestination.index, 0, removed);

   const result: { [index: string]: any } = {};
   result[droppableSource.droppableId] = sourceClone;
   result[droppableDestination.droppableId] = destClone;

   return result;
};
