import Link from 'next/link';
import Modal from '../add-game/modal';
export const Layout = (props: { children: any }) => {
   return (
      <div className="flex flex-col min-h-screen bg-gray-800  ">
         <div className="flex flex-col flex-1 w-full">
            <header>
               <div className="bg-white dark:bg-gray-700 shadow">
                  <div className="container px-6 py-3 mx-auto">
                     <div className="flex items-center justify-between">
                        <div>
                           <Link
                              className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                              href="/"
                           >
                              Game List
                           </Link>
                        </div>
                        <div className="flex">
                           <Modal />
                        </div>
                     </div>
                  </div>
               </div>
            </header>

            <main className="flex flex-col flex-1 w-full">
               <div className="container flex flex-col flex-1 mx-auto md:px-4">
                  {props.children}
               </div>
            </main>
         </div>
      </div>
   );
};
