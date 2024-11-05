"use client"
import React, { useState, useEffect } from 'react';
import { Categories, Businesses} from "../lib/definitions"
import { getCategories, getBusinesses } from '../lib/data'
import { createClient } from '@/utils/supabase/client'


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
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [businesses, setBusinesses] = useState<Businesses[]>([]);

    useEffect(() => {
        const getCategoryData = async () => {
            setIsLoading(true);
            try {
                const categoriesData = await getCategories();
                if (categoriesData) {
                    setCategories(categoriesData);
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
      return(
        <div>
        <ul>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                businesses.map((category) => (
                    <li key={category.id}>
                        <p>{category.business_name}</p> {/* Adjust to actual property name */}
                    </li>
                ))
            )}
        </ul>
    </div>
      )
  }