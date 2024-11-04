"use server";
import { createClient } from "@/utils/supabase/server";
import { Categories, Businesses, Business} from "./definitions";
const supabase = createClient();

export async function getCategories(): Promise<Categories[]>{
    try{
        const supabase = await createClient(); 
        const { data: categories } = await supabase.from("categories").select();
        return categories as Categories[]
    }catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch categories.');
      }
}
