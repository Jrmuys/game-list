import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '../components/layout/layout';
import { v4 as uuidv4 } from 'uuid';

export default function App({ Component, pageProps }: AppProps) {
   if (typeof window !== 'undefined') {
      console.log('we are running on the client');
      // Generate a unique ID for this user
      const userId = localStorage.getItem('userId');
      if (!userId) {
         localStorage.setItem('userId', uuidv4());
      }
   } else {
      console.log('we are running on the server');
   }

   return (
      <Layout>
         <Component {...pageProps} />
      </Layout>
   );
}
