export type Categories = {
    id: string,
    value: string,
    label: string,
}


export type Businesses = {
    id: string,
    business_name: string,
    description: string,
    area: string,
    categories: string,
    phone_number: string,
    email_address: string,
    telegram_username: string,
    whatsapp_number: string,
    posted_by: string,
    verified: boolean,
    products_services: string
}

export type Reviews = {
    id: string,
    user_id: string,
    business_id: string,
    created_at: string,
    rating: number,
    comment: string,
    user_alias: string,
}


export type BusinessWithReviews = {
    business: Businesses;
    reviews: Reviews[];
};