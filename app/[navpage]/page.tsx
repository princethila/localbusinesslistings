"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Businesses, Reviews, BusinessWithReviews} from '../lib/definitions';
import { createClient } from '@/utils/supabase/client'
import { getBusinesses, getBusinessesWithReviews, getBusinessReviews } from '../lib/data';
import StarRating from '../components/starating';
import { formatDistanceToNow } from 'date-fns';


const defaultBusiness: Businesses = {
    id: '',
    business_name: '',
    description: '',
    area: '',
    categories: '',
    phone_number: '',
    email_address: '',
    telegram_username: '',
    whatsapp_number: '',
    posted_by: '',
    verified: false,
    products_services: ''
};


const defaultReviews: Reviews[] = [];

const defaultBusinessreviews: BusinessWithReviews = {
    business: defaultBusiness,
    reviews: defaultReviews
};





export default function Page(){

    const [businessrev, setBusinessRev] = useState<BusinessWithReviews>(defaultBusinessreviews);
    const [isLoading, setIsLoading] = useState(true);
    const [business, setBusiness] = useState<Businesses>(defaultBusiness);
    const searchParams = useSearchParams();
    const business_id = searchParams.get('business_id');
    let parsedData: any = null;

    if (business_id) {
        parsedData = JSON.parse(business_id);
    } else {
        // Handle the case where business_id is null
        console.error("business_id is null");
    }


    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const fetchedBusiness = await getBusinessReviews(parsedData);
                setBusinessRev(fetchedBusiness);
                console.log(fetchedBusiness)
            } catch (error) {
                console.error('Failed to fetch business', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBusiness();
    }, [parsedData]);

    const [rating, setRating] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback || !rating) {
            setErrorMessage('Please write a review and select a rating.');
            return;
        }
        setIsSubmitting(true);
        setErrorMessage('');

        setIsSubmitted(true);
        setIsSubmitting(false);


        console.log('Rating:', rating);
        console.log('Feedback:', feedback);
    };

    return(
        <div className='px-6 sm:max-w-5xl '>
            {isLoading ? (
                <p>Loading reviews...</p>
            ) : (
                business ? (
                    <div>
                        <a href="https://t.me/listalocalbusinessBot" target="_blank" rel="noopener noreferrer" className='text-xs pt-4 text-blue-500 hover:underline'>
          Click here to rate this business on Telegram!
        </a>
                        <ul className=''>
                        {businessrev.reviews.map((review)=>(
                            <li key={review.id}>
                                <div className='py-2 border-b'>
                                    {review.user_alias? <p>{review.user_alias}</p>:<p>anon</p>}
                                    <div className='flex flex-auto justify-between'>
                                        <div className='flex space-x-2 items-start'>
                                            <StarRating rating={review.rating} />
                                            <p className='text-xs'>{review.rating}</p>
                                        </div>
                                        <div>
                                            <p className='text-xs'>{formatDistanceToNow(new Date(review.created_at))} ago</p>
                                        </div>
                                    </div>
                                    <div className='pt-2'>
                                        <p>{review.comment}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                        </ul>
                    </div>
                    
                    
                ) : (
                    <p>Business not found.</p>
                )
            )}
        </div>
        
    )
    

}


