"use server";
import { createClient } from "@/utils/supabase/server";
import { Categories, Businesses, Business} from "./definitions";
const supabase = createClient();

export async function getCategories(): Promise<Categories[]> {
    try {
        const supabase = await createClient();
        const { data: categories, error } = await supabase.from("categories").select();
        if (error) {
            console.error("Database Error:", error);
            throw new Error("Failed to fetch categories.");
        }
        return categories as Categories[];
    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}

export async function getBusinesses(): Promise<Businesses[]> {
    try {
        const supabase = await createClient();
        const { data: businesses, error } = await supabase.from("businesses").select();
        if (error) {
            console.error("Database Error:", error);
            throw new Error("Failed to fetch businesses.");
        }
        return businesses as Businesses[];
    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}

