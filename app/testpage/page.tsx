"use client"
import React, { useState, useEffect } from 'react';
import Select, { MultiValue, ActionMeta ,components } from 'react-select';
import { Categories, Businesses, BusinessWithReviews} from "../lib/definitions"
import { getCategories, getBusinesses, getBusinessesWithReviews } from '../lib/data'



export default function(){
    const [businesseswithreviews, setBusinesseswithreviews] = useState<BusinessWithReviews[]>([]);
    const [isClient, setIsClient] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const [categories, setCategories] = useState<Categories[]>([]);
        const [selectedCategories, setSelectedCategories] = useState<Categories[]>([]);
        const [businesses, setBusinesses] = useState<Businesses[]>([]);
        const [expandedItem, setExpandedItem] = useState<Record<string, any> | null>(null);
        const [sortOrder, setSortOrder] = useState('highest');
    useEffect(() => {
        const getBusinessesReviewsData = async () => {
            try {
                const businesseswithreviewsData = await getBusinessesWithReviews();
                if (businesseswithreviewsData) {
                    setBusinesseswithreviews(businesseswithreviewsData);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
            }
        };
        getBusinessesReviewsData();
    }, []);
    useEffect(() => {
        const getCategoryData = async () => {
            setIsLoading(true);
            try {
                const categoriesData = await getCategories();
                if (categoriesData) {
                    setCategories(categoriesData);
                    setIsClient(true);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getCategoryData();
    }, []);

    useEffect(() => {
        const getBusinessData = async () => {
            try {
                const businessesData = await getBusinesses();
                if (businessesData) {
                    setBusinesses(businessesData);
                }
            } catch (error) {
                console.error("Failed to fetch businesses:", error);
            }
        };
        getBusinessData();
    }, []);

    function calculateTotalReviews(business: BusinessWithReviews): number {
        return business.reviews.length;
    }


    function calculateAverageRating(business: BusinessWithReviews): number {
        const totalReviews = business.reviews.length;
        if (totalReviews === 0) return 0; // Return 0 if no reviews neh ki
    
        const sumOfRatings = business.reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = sumOfRatings / totalReviews;
        return Number(averageRating.toFixed(1));
    }

    const filteredData = selectedCategories.length > 0 ? businesseswithreviews.filter(
        item=>{
            const selectedCategoriesSet = new Set(selectedCategories.map(option => option.value.toLowerCase()));
            
            let itemCategoriesArray = Array.isArray(item.business.categories) 
            ? item.business.categories 
            : item.business.categories.split(',').map(category => category.trim());

            const itemCategories = new Set(itemCategoriesArray.map(category => category.trim().toLowerCase()));
            return Array.from(selectedCategoriesSet).every(option => itemCategories.has(option));

        }).sort((a, b) => {
            const aRating = calculateAverageRating(a);
            const bRating = calculateAverageRating(b);
            return sortOrder === 'highest' ? bRating - aRating : aRating - bRating;
        }).sort((a, b) => {
            // Sort by verified status first
            if (a.business.verified === b.business.verified) return 0;
            return a.business.verified ? -1 : 1; // `verified: true` appears first
        }).sort((a, b) => {
            // Then sort alphabetically by name (case insensitive)
            return a.business.business_name.localeCompare(b.business.business_name);
        }): businesseswithreviews.sort((a, b) => {
            // Sort by verified status first
            if (a.business.verified === b.business.verified) return 0;
            return a.business.verified ? -1 : 1; // `verified: true` appears first
        }).sort((a, b) => {
            // Then sort alphabetically by name (case insensitive)
            return a.business.business_name.localeCompare(b.business.business_name);
        });
    return(
        <div>
            <ul>
                {filteredData?.map((businessobject)=>
                <li key={businessobject.business.id}>
                    <p>{businessobject.business.business_name}</p>
                    <p>{calculateAverageRating(businessobject)}</p>
                </li>)}
            </ul>
        </div>
    )
}