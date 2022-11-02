import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import Head from 'next/head';
import Image from 'next/image';
import React, { Fragment, useEffect } from 'react';
import { GameList } from '../components/game/game-list';
import { Game, Goal, useGameCollection } from '../services/firebase-helpers';

import dynamic from 'next/dynamic';

function Home() {
   let user = localStorage.getItem('userId');
   if (!user) {
      user = '';
   }
   console.log('user', user);

   const [value, loading, error] = useGameCollection(user);

   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return (
         <Fragment>
            <div>An error occurred...</div>
         </Fragment>
      );
   }

   return (
      <div>
         <div>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value && (
               <Fragment>
                  <GameList
                     games={(value as QuerySnapshot<DocumentData>).docs.reduce(
                        (acc, doc) => {
                           acc[doc.id] = doc.data() as Game;
                           return acc;
                        },
                        {} as { [id: string]: Game }
                     )}
                     // games={(value as QuerySnapshot<DocumentData>).docs.map(
                     //    (doc) => {
                     //       const data = doc.data();
                     //       return {
                     //          title: data.title,
                     //          thumbURL: data.thumbURL,
                     //          status: data.status,
                     //          userId: data.userId,
                     //          percentage: data.percentage,
                     //          goals: data.goals as Goal[],
                     //       } as Game;
                     //    }
                     // )}
                  />
                  {(value as QuerySnapshot<DocumentData>).docs.length < 1 && (
                     <div className="block">
                        <div className="text-gray-800 ml-2 bg-red-200 border-red-500 border-2 p-4 w-auto inline-block mt-4 rounded">
                           <div className="font-medium text-xl ">
                              No games found
                           </div>
                           <span>Please click "Add Game" to get started</span>
                           <br />
                        </div>
                        <br />
                        <div className="text-gray-800 ml-2 bg-blue-200 border-blue-500 border-2 p-4 w-auto inline-block mt-4 rounded">
                           <span className="mb-4">
                              <span className="font-medium text-xl">Note</span>
                              <br /> You can go to{' '}
                              <a
                                 className="text-blue-600 hover:underline"
                                 href="https://steamdb.info/"
                                 target="_blank"
                                 rel="noreferrer noopener"
                              >
                                 SteamDB
                              </a>{' '}
                              to find a thumbnail URL for your game
                           </span>
                           <Image
                              src="/images/steamdb.png"
                              height={300}
                              width={500}
                              className="rounded mt-2 "
                              alt=""
                           />
                        </div>
                     </div>
                  )}
               </Fragment>
               //  <span>
               //     Collection:{' '}
               //     {(value as QuerySnapshot<DocumentData>).docs.map((doc) => (
               //        <React.Fragment key={doc.id}>
               //           {JSON.stringify(doc.data())},{' '}
               //        </React.Fragment>
               //     ))}
               //  </span>
            )}
         </div>
      </div>
   );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
