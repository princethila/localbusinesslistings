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

export async function getBusinesses(): Promise<Businesses[]>{
    try{
        const supabase = await createClient(); 
        const { data: businesses } = await supabase.from("businesses").select();
        return businesses as Businesses[]
    }catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch businesses.');
      }
}

