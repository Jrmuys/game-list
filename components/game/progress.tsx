export const Progress = (props: {
   percentage: number;
   status: string;
   disabled: boolean;
}) => {
   return (
      <div>
         <div className="flex items-center justify-between select-none">
            <div className="flex items-center">
               <div className="text-sm">
                  <p className="text-gray-600 dark:text-gray-400">
                     {props.status}
                  </p>
               </div>
            </div>
            <div className="text-sm">
               <p className="text-gray-600 dark:text-gray-400">
                  {props.percentage.toPrecision(3)}%
               </p>
            </div>
         </div>
         <div className="relative pt-1">
            <div
               className={
                  'overflow-hidden h-2 mb-4 text-xs flex rounded ' +
                  (props.disabled ? 'bg-gray-200' : 'bg-green-200')
               }
            >
               <div
                  style={{ width: props.percentage + '%' }}
                  className={
                     'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-200 rounded' +
                     (props.disabled ? ' bg-gray-400' : '')
                  }
               ></div>
            </div>
         </div>
      </div>
   );
};
