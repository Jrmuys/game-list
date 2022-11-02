import { addDoc, query, collection, setDoc, doc } from 'firebase/firestore';
import { useState, useRef, useEffect } from 'react';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Game } from '../../services/firebase-helpers';
import { firestore } from '../../services/firebase.config';
export default function AddGameModal() {
   const [open, setOpen] = useState(false);

   const titleRef = useRef<HTMLInputElement>();
   const imageUrlRef = useRef<HTMLInputElement>();

   useEffect(() => {
      if (open && titleRef.current) {
         titleRef.current.focus();
      }
   }, [open]);

   const handleOpen = () => {
      setOpen(true);
      console.log('open');
   };

   const handleClose = () => {
      setOpen(false);
      console.log('close');
   };

   const handleAddGame = () => {
      if (
         titleRef &&
         imageUrlRef &&
         titleRef.current &&
         imageUrlRef.current &&
         titleRef.current.value &&
         imageUrlRef.current.value
      ) {
         const game: Game = {
            title: titleRef.current.value,
            thumbURL: imageUrlRef.current.value,
            percentage: 0,
            id: uuidv4(),
            goals: [],
            index: 0,
            status: 'Not Started',
            userId: localStorage.getItem('userId') || '',
         };
         console.log(game);
         // Add game to firebase
         setDoc(doc(firestore, 'games', game.id), game);
         handleClose();
      }
   };

   return (
      <Fragment>
         <button
            onClick={handleOpen}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
         >
            <span className="flex items-center gap-2">
               Add Game
               {/* Add game icon */}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
               </svg>
            </span>
         </button>
         {open ? (
            <div className="fixed z-10 inset-0 overflow-y-auto">
               <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                     className="fixed inset-0 transition-opacity"
                     aria-hidden="true"
                  >
                     <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span
                     className="hidden sm:inline-block sm:align-middle sm:h-screen"
                     aria-hidden="true"
                  >
                     &#8203;
                  </span>
                  <div
                     className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                     role="dialog"
                     aria-modal="true"
                     aria-labelledby="modal-headline"
                  >
                     <form onSubmit={handleAddGame}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                           <div className="sm:flex sm:items-start">
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                 <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-headline"
                                 >
                                    Add Game
                                 </h3>
                                 <div className="mt-2">
                                    <div className="mb-4">
                                       <label
                                          className="block text-gray-700 text-sm font-bold mb-2"
                                          htmlFor="title"
                                       >
                                          Title
                                       </label>
                                       <input
                                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                          id="title"
                                          type="text"
                                          placeholder="Title"
                                          name="title"
                                          ref={titleRef}
                                       />
                                    </div>

                                    <div className="mb-4">
                                       <label
                                          className="block text-gray-700 text-sm font-bold mb-2"
                                          htmlFor="image"
                                       >
                                          Image Url
                                       </label>
                                       <input
                                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                          id="image"
                                          type="text"
                                          placeholder="Image"
                                          name="image"
                                          ref={imageUrlRef}
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                           <button
                              type="submit"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                           >
                              Add Game
                           </button>
                           <button
                              onClick={handleClose}
                              type="button"
                              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                           >
                              Cancel
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         ) : null}
      </Fragment>
   );
}
