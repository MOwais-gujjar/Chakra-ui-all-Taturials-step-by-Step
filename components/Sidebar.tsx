'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

import { sidebarLinks } from '@/constant'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';


const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className=' sticky top-0 left-0 h-screen flex flex-col w-fit justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
        <div className="flex flex-1 flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`) ;
            return(
              <Link 
              href={link.route}
              key={link.label}
              className={cn(' flex gap-4 items-center p-4 rounded-lg justify-start', 
              { "bg-blue-1": isActive})}>
                <Image 
                    src={link.imgURL}
                    alt={link.label}
                    height={24}
                    width={24}
                />
                <p className=" text-lg font-semibold max-lg:hidden">
                  {link.label}
                </p>
              </Link>
          
          )})}
        </div>
    </div>
  )
}

export default Sidebar