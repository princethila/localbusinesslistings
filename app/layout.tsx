import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from "@/node_modules/next/link";
import {
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trending on Instagram',
  description: 'See who is trending and how',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className='top-0 sticky bg-white/30 backdrop-blur-md px-4 sm:px-24 z-10'>
          <div className="py-12">
            <div className="mx-auto px-2 border-x-0">
              <div className="flex justify-between items-center h-16">
                <div>
                  <Link
                  href ={'/'}
                  >
                    <div className='flex items-center'>
                      <BuildingStorefrontIcon className="mr-1.5 h-7 w-7 " aria-hidden="true" />
                      <h1 className="text-lg font-bold font-sans pr-2 ">list-a-local-business</h1>
                    </div>
                    <div>
                      <p className='py-2 text-gray-500 text-xs line-clamp-1'>Discover and support local businesses</p>
                    </div>
                  </Link>
                </div>
                
              </div>
            </div>
          </div>
        </nav>
          {children}
      </body>
    </html>
  );
}
