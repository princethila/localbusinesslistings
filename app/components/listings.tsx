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
      return(
          <div>we up here</div>
      )
  }