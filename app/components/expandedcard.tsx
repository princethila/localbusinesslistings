"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Businesses } from "../lib/definitions"
import {
    MapPinIcon,
    PhoneIcon,
    ChatBubbleBottomCenterIcon,
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    ShoppingBagIcon
  } from '@heroicons/react/24/outline';


  interface ExpandedViewProps {
    businessobject: Businesses;
}


export default function ExpandedView({businessobject}: ExpandedViewProps){
    return(
        <div className="grid grid-rows gap-4 w-full max-w-2xl sm:max-w-5xl mx-auto mt-4">
            <div className='grid grid-cols-2'>
                <div className="items-center">
                    <div className='flex items-start pb-1'>
                        <PhoneIcon className="mr-1 h-3 w-3 text-gray-500" />
                        <p className="text-gray-500 text-xs">Phone:</p>
                    </div>
                    {businessobject.phone_number?<p className="text-semibold text-xs font-semibold">{businessobject.phone_number}</p>
                        :<p className="text-semibold text-xs font-semibold">N/A</p>}
                </div>
                <div className="items-center">
                    <div className='flex items-start pb-1'>
                        <EnvelopeIcon className="mr-1 h-3 w-3 text-gray-500" />
                        <p className="text-gray-500 text-xs">Email:</p>
                    </div>
                    {businessobject.email_address?<p className="text-semibold text-xs font-semibold break-words whitespace-normal">{businessobject.email_address}</p>
                        :<p className="text-semibold text-xs font-semibold">N/A</p>}
                </div>
            </div>
            <div className='grid grid-cols-2'>
                    <div className="items-center">
                        <div className='flex items-start pb-1'>
                            <ChatBubbleBottomCenterIcon className="mr-1 h-3 w-3 text-gray-500" />
                            <p className="text-gray-500 text-xs">Whatsapp:</p>
                        </div>
                        {businessobject.whatsapp_number?<p className="text-semibold text-xs font-semibold">{businessobject.whatsapp_number}</p>
                        :<p className="text-semibold text-xs font-semibold">N/A</p>}
                    </div>
                    <div className="items-center">
                        <div className='flex items-start pb-1'>
                            <ChatBubbleLeftRightIcon className="mr-1 h-3 w-3 text-gray-500" />
                            <p className="text-gray-500 text-xs">Telegram:</p>
                        </div>
                        {businessobject.telegram_username?<p className="text-semibold text-xs font-semibold">@{businessobject.telegram_username}</p>
                        :<p className="text-semibold text-xs font-semibold">N/A</p>}
                    </div>
                    
            </div>
            <div className='grid grid-cols-1'>
                    <div className="items-center pt-2 ">
                        <div className='flex items-middle pb-1'>
                            <ShoppingBagIcon className="mr-1 h-3 w-3 text-gray-500" />
                            <p className="text-gray-500 text-xs">Products/services:</p>
                        </div>
                        <div className="text-semibold text-xs font-semibold">
                        {businessobject.products_services
                        ? <p className="text-semibold text-xs font-semibold break-words whitespace-normal">
                            {businessobject.products_services}
                          </p>
                        : <p className="text-semibold text-xs font-semibold">N/A</p>}
                        </div>

                        
                    </div>
                    {/* <div className='border-t mt-2'>
                        <Link href={`/navpage?business_id=${JSON.stringify(businessobject.id)}`} passHref>
                            <p className='text-xs pt-4 text-blue-500 hover:underline'>Rate this business</p>
                    </Link>
                    
                </div> */}
            </div>
        </div>
    )
}