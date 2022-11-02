import { MouseEventHandler } from 'react';
import { Goal } from '../../services/firebase-helpers';

export const GoalItem = (props: {
   goal: Goal;
   onToggle: any;
   onDelete: any;
   disabled: boolean;
}) => {
   return (
      <div key={props.goal.title}>
         <div className="flex flex-1 justify-between items-center w-full mb-4">
            <div className="flex items-center h-full">
               <div className="form-check">
                  <input
                     className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer disabled:checked:bg-blue-300 disabled:checked:border-blue-300 disabled:checked:hover:bg-blue-300 disabled:checked:hover:border-blue-300 disabled:bg-gray-200 disabled:hover:bg-gray-200  disabled:cursor-default "
                     type="checkbox"
                     id={props.goal.title}
                     disabled={props.disabled}
                     checked={props.goal.complete}
                     onChange={props.onToggle}
                  />
                  <label
                     className={
                        'text-sm font-medium select-none cursor-grab ' +
                        (props.goal.complete ? 'line-through ' : ' ') +
                        (props.disabled ? 'text-gray-400 ' : 'text-gray-600 ')
                     }
                     htmlFor={props.goal.title}
                  >
                     {props.goal.title}
                  </label>
               </div>
            </div>
            <button
               disabled={props.disabled}
               onClick={() => props.onDelete(props.goal.title)}
               className="ml-2"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                     'h-6 w-6  ' +
                     (props.disabled
                        ? 'text-gray-300 cursor-default'
                        : 'text-red-300 hover:text-red-500')
                  }
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M6 18L18 6M6 6l12 12"
                  />
               </svg>
            </button>
         </div>
      </div>
   );
};
