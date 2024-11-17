"use client"
import React, { useState, useEffect } from 'react';
import Select, { MultiValue, ActionMeta ,components } from 'react-select';
import { Categories, Businesses, BusinessWithReviews} from "../lib/definitions"
import { getCategories, getBusinesses, getBusinessesWithReviews } from '../lib/data'
import { createClient } from '@/utils/supabase/client'
import ExpandedView from './expandedcard';
import StarRating from './starating';


import {
    MapPinIcon,
    ChevronDownIcon,
    ChevronUpIcon
  } from '@heroicons/react/24/outline';
  import {
    StarIcon,
    CheckBadgeIcon
  } from '@heroicons/react/24/solid';


  export default function Listings(){
        const [isClient, setIsClient] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const [categories, setCategories] = useState<Categories[]>([]);
        const [selectedCategories, setSelectedCategories] = useState<Categories[]>([]);
        const [businesses, setBusinesses] = useState<Businesses[]>([]);
        const [businesseswithreviews, setBusinesseswithreviews] = useState<BusinessWithReviews[]>([]);
        const [sortOrder, setSortOrder] = useState('highest');
        const [expandedItem, setExpandedItem] = useState<Record<string, any> | null>(null);

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

        // const filteredData = selectedCategories.length > 0 ? businesses.filter(
        //     item=>{
        //         const selectedCategoriesSet = new Set(selectedCategories.map(option => option.value.toLowerCase()));
                
        //         let itemCategoriesArray = Array.isArray(item.categories) 
        //         ? item.categories 
        //         : item.categories.split(',').map(category => category.trim());
    
        //         const itemCategories = new Set(itemCategoriesArray.map(category => category.trim().toLowerCase()));
        //         return Array.from(selectedCategoriesSet).every(option => itemCategories.has(option));
    
        //     }).sort((a, b) => {
        //         // Sort by verified status first
        //         if (a.verified === b.verified) return 0;
        //         return a.verified ? -1 : 1; // `verified: true` appears first
        //     }).sort((a, b) => {
        //         // Then sort alphabetically by name (case insensitive)
        //         return a.business_name.localeCompare(b.business_name);
        //     }): businesses.sort((a, b) => {
        //         // Sort by verified status first
        //         if (a.verified === b.verified) return 0;
        //         return a.verified ? -1 : 1; // `verified: true` appears first
        //     }).sort((a, b) => {
        //         // Then sort alphabetically by name (case insensitive)
        //         return a.business_name.localeCompare(b.business_name);
        //     });

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
            
        const handleSearch = (newValue: MultiValue<Categories>, actionMeta: ActionMeta<Categories>) => {
            setSelectedCategories(newValue as Categories[]);
        };
        const handleUserClick = (item: Businesses) => {
            setExpandedItem((prevItem) => (prevItem === item ? null : item));
            // setExpandedComments(null);
        };
      return(
        <div>
            <section>
                {isClient && (
                    <div className='sm:w-1/2 pr-0 mb-4 mt-1 z-9'>
                        <Select
                            isMulti
                            value={selectedCategories}
                            onChange={handleSearch}
                            options={categories}
                            isSearchable
                            placeholder="Search category..."
                        />
                    </div>
                )}
            </section>
            <div className="py-6">
               {isLoading? (<p>Loading businesses...</p>):
               (
                   <ul className='space-y-6'>
                       {filteredData?.map((businessobject)=>
                            <li key={businessobject.business.id}>
                                <div className='sm:w-1/2 pr-4 bg-gray-50 rounded-sm p-2'>
                                    <div className='pb-4'>
                                        <div className='flex items-center'>
                                            <p className='text-lg font-semibold pr-1'>{businessobject.business.business_name}</p>
                                            {businessobject.business.verified? <CheckBadgeIcon className="mr-1.5 h-5 w-5 text-blue-500" />:''}
                                        </div>
                                        {calculateAverageRating(businessobject) > 0 && (
                                                <div className="flex items-center mb-2">
                                                    <StarRating rating={calculateAverageRating(businessobject)} />
                                                    <p className="text-gray-500  ml-2 text-xs">({calculateTotalReviews(businessobject)} reviews)</p>
                                                </div>
                                                    )}
                                        {businessobject.business.description?<p className='text-gray-500 text-xs line-clamp-2'>{businessobject.business.description}</p>:
                                        <p className='text-gray-500 text-xs line-clamp-2'>{businessobject.business.products_services}</p>}
                                    </div>
                                    <div className='flex justify-between items-center pb-1'>
                                        <div className='pt-4 flex items-baseline'>
                                            <div className="items-center">
                                                <div className='flex items-start pb-1'>
                                                    <MapPinIcon className="mr-1 h-3 w-3 text-gray-500" />
                                                    <p className="text-gray-500 text-xs">Location:</p>
                                                </div>
                                                <p className="text-semibold text-xs font-semibold text-wrap">{businessobject.business.area}</p>
                                            </div>
                                        </div>
                                        <div className='items-center'>
                                        <div className="cursor-pointer" onClick={() => handleUserClick(businessobject.business)}>
                                                {expandedItem === businessobject.business ? (
                                                    <ChevronUpIcon className="mr-1.5 h-4 w-4 hover:text-gray-500" aria-hidden="true" />
                                                ) : (
                                                    <ChevronDownIcon className="mr-1.5 h-4 w-4 hover:text-gray-500" aria-hidden="true" />
                                                )}
                                                </div>
                                        </div>
                                    </div>
                                    {expandedItem === businessobject.business && <ExpandedView businessobject={businessobject.business}/>}
                                </div>
                            </li>
                       )}
                   </ul>
               )}
            </div>
        </div>
      )
  }
