"use server";
import { createClient } from "@/utils/supabase/server";
import { Categories,Business, Businesses, BusinessWithReviews} from "./definitions";
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

export async function getBusiness(id: number): Promise<Business> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("businesses")
            .select()
            .eq("id", id)
            .single();

        if (error) {
            console.error('Database Error:', error);
            throw new Error('Failed to fetch business.');
        }

        return data as Business;
    } catch (error) {
        console.error('Unexpected Error:', error);
        throw new Error('Failed to fetch business.');
    }
}


export async function getBusinessesWithReviews(): Promise<BusinessWithReviews[]> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("businesses")
            .select(`
                *,
                reviews (*)
            `)
            .order("id", { ascending: true });

        if (error) {
            console.error("Database Error:", error);
            throw new Error("Failed to fetch businesses and reviews.");
        }

        const businessesWithReviews: BusinessWithReviews[] = data.map((item: any) => ({
            business: {
                id: item.id,
                business_name: item.business_name,
                description: item.description,
                area: item.area,
                categories: item.categories,
                phone_number: item.phone_number,
                email_address: item.email_address,
                telegram_username: item.telegram_username,
                whatsapp_number: item.whatsapp_number,
                posted_by: item.posted_by,
                verified: item.verified,
                products_services: item.products_services,
                location: item.location?.id || null // Handle case where location might be null
            },
            reviews: item.reviews ? item.reviews.map((review: any) => ({
                id: review.id,
                user_id: review.user_id,
                business_id: review.business_id,
                created_at: review.created_at,
                rating: review.rating,
                comment: review.comment
            })) : []
        }));

        return businessesWithReviews;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch businesses and reviews.');
    }
}


export async function getBusinessReviews(id: string): Promise<BusinessWithReviews> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("businesses")
            .select(`
                *,
                reviews (*)
            `)
            .eq("id", id)
            .single();

        if (error) {
            console.error("Database Error:", error);
            throw new Error("Failed to fetch businesses and reviews.");
        }

        return {
            business: {
                id: data.id,
                business_name: data.business_name,
                description: data.description,
                area: data.area,
                categories: data.categories,
                phone_number: data.phone_number,
                email_address: data.email_address,
                telegram_username: data.telegram_username,
                whatsapp_number: data.whatsapp_number,
                posted_by: data.posted_by,
                verified: data.verified,
                products_services: data.products_services,
                location: data.location?.id || ''
            },
            location: data.location ? {
                id: data.location.id,
                place: data.location.place
            } : null,
            reviews: data.reviews ? data.reviews.map((review: any) => ({
                id: review.id,
                user_id: review.user_id,
                user_telegram_id: review.user,
                business_id: review.business_id,
                created_at: review.created_at,
                rating: review.rating,
                comment: review.review_text,
                user_alias: review.user_alias
            })) : []
        } as BusinessWithReviews;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch businesses and reviews.');
    }
}

