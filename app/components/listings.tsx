"use client"
import React, { useState, useEffect } from 'react';
import Select, { MultiValue, ActionMeta ,components } from 'react-select';
import { Categories, Businesses} from "../lib/definitions"
import { getCategories, getBusinesses } from '../lib/data'
import { createClient } from '@/utils/supabase/client'
import ExpandedView from './expandedcard';


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
        const filteredData = selectedCategories.length > 0 ? businesses.filter(
            item=>{
                const selectedCategoriesSet = new Set(selectedCategories.map(option => option.value.toLowerCase()));
                
                let itemCategoriesArray = Array.isArray(item.categories) 
                ? item.categories 
                : item.categories.split(',').map(category => category.trim());
    
                const itemCategories = new Set(itemCategoriesArray.map(category => category.trim().toLowerCase()));
                return Array.from(selectedCategoriesSet).every(option => itemCategories.has(option));
    
            }): businesses;
            
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
                       {filteredData?.map((business)=>
                            <li key={business.id}>
                                <div className='sm:w-1/2 pr-4 bg-gray-50 rounded-sm p-2'>
                                    <div className='pb-4'>
                                        <div className='flex items-center'>
                                            <p className='text-lg font-semibold pr-1'>{business.business_name}</p>
                                            {business.verified? <CheckBadgeIcon className="mr-1.5 h-5 w-5 text-blue-500" />:''}
                                        </div>
                                        <p className='text-gray-500 text-xs line-clamp-2'>{business.description}</p>
                                    </div>
                                    <div className='flex justify-between items-center pb-1'>
                                        <div className='pt-4 flex items-baseline'>
                                            <div className="items-center">
                                                <div className='flex items-start pb-1'>
                                                    <MapPinIcon className="mr-1 h-3 w-3 text-gray-500" />
                                                    <p className="text-gray-500 text-xs">Location:</p>
                                                </div>
                                                <p className="text-semibold text-xs font-semibold text-wrap">{business.area}</p>
                                            </div>
                                        </div>
                                        <div className='items-center'>
                                        <div className="cursor-pointer" onClick={() => handleUserClick(business)}>
                                                {expandedItem === business ? (
                                                    <ChevronUpIcon className="mr-1.5 h-4 w-4 hover:text-gray-500" aria-hidden="true" />
                                                ) : (
                                                    <ChevronDownIcon className="mr-1.5 h-4 w-4 hover:text-gray-500" aria-hidden="true" />
                                                )}
                                                </div>
                                        </div>
                                    </div>
                                    {expandedItem === business && <ExpandedView businessobject={business}/>}
                                </div>
                            </li>
                       )}
                   </ul>
               )}
            </div>
        </div>
      )
  }
