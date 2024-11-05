import Listings from "./components/listings";
import { createClient } from '@/utils/supabase/server';

export default async function Index() {
  return (
      <main className="flex-1 flex flex-col gap-6 px-4">
         <Listings/>
      </main>
  );
}
