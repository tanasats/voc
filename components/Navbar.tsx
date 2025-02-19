'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { FiX } from 'react-icons/fi'
import { useSession } from '@/app/context/SessionContext'
import ConfirmModal from "@/components/ConfirmModal";

type NavItem = {
    label: string,
    link: string;
    iconImage: string;
    children?: NavItem[];
}

const navItems: NavItem[] = [
    {
        label: "หน้าหลัก",
        link: "/dashboard",
        iconImage: ""
    },
    {
        label: "about",
        link: "/about",
        iconImage: ""
    },
    {
        label: "test",
        link: "/test",
        iconImage: ""
    },
    {
        label: "Profile",
        link: "/profile",
        iconImage: ""
    },    
    {
        label: "users",
        link: "/admin/users",
        iconImage: ""
    },
];

export default function Navbar() {
    const [isSideMenuOpen, SetSideMenuOpen] = useState(false);
    const colseSideMenu = () => {
        SetSideMenuOpen(false);
    }
    const { user, logout } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
    },[])

    return (
        <div className="bg-slate-200 mb-8">
            <div className="content-wrapper flex justify-between items-center p-3">
                <Link href={'/'} className='flex gap-1 items-center'>
                    <span className='text-2xl font-bold py-1 pe-2'>
                        VoC
                    </span>
                </Link>
                <div className="hidden sm:block">
                    <ul className="flex gap-4">
                        {navItems.map((item, index) => (
                            <li key={index} >
                                <Link href={item.link}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        {user ?
                            <li><div className='cursor-pointer'  onClick={() => setIsModalOpen(true)}>SignOut</div></li>
                            :
                            <li><Link href={"/signin"}>SignIn</Link></li>
                        }
                    </ul>
                </div>
                <FiMenu
                    className='sm:hidden text-3xl'
                    onClick={() => SetSideMenuOpen(true)}
                />
            </div>
            {isSideMenuOpen && <MobileNav closeSideMenu={colseSideMenu} />}
            <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          logout();
          setIsModalOpen(false);
        }}
      />
        </div>
    )
}

function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
    const { user, logout } = useSession();
    return (
        <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden">
            <div className="h-full w-[65%] bg-white px-4 py-4">
                <section className='flex justify-end mb-4'>
                    <FiX
                        onClick={closeSideMenu}
                        className='cursor-pointer text-3xl' />
                </section>

                <div className="block">
                    <ul className="flex flex-col gap-0">
                        {navItems.map((item, index) => (
                            <li className='p-2 w-full hover:bg-slate-300'>
                                <Link
                                    key={index}
                                    className='text-center block' onClick={closeSideMenu} href={item.link}>{item.label}</Link>
                            </li>
                        ))}
                        {user ?
                            <li className='p-2 w-full hover:bg-slate-300'><div className='text-center cursor-pointer' onClick={() => logout()}>SignOut</div></li>
                            :
                            <li className='p-2 w-full hover:bg-slate-300'><Link className='text-center block' href={"/signin"}>SignIn</Link></li>
                        }
                    </ul>
                </div>

            </div>
        </div>
        
    )
}
