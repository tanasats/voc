import React from 'react'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    LuPencil,
    LuTrash2,
} from 'react-icons/lu';

import Tooltip from '../Tooltip';


interface Props {
    key: any;
    user: any;
    onEdit: (user: any) => void;
    onDelete: (user: any) => void;
}

export default function UserItem(props: Props) {
    return (
        // <div className='flex'>
        //     <div className='flex-grow-1'>
        //         <div className='flex-grow-1'><Checkbox /></div>
        //         <div className='flex-grow-2 hidden md:block'>{props.user.username}</div>
        //         <div className='flex-grow-2'>{props.user.fullname}</div>
        //         <div className='flex-grow-2 hidden md:block'>{props.user.email}</div>
        //     </div>
        //     <div className='flex gap-1'>
        //         <Button onClick={props.onEdit} size={"sm"} variant="outline">แก้ไข</Button>
        //         <Button onClick={props.onDelete} size={"sm"} variant="destructive">ลบ</Button>
        //     </div>
        // </div>


        <div className="flex py-3 px-4 items-center hover:bg-slate-100">
            <div className="flex-1">

                <div className='flex items-center'>
                    <div className='w-[85px]'>
                        <span className={"inline-block text-green-600 me-3 cursor-pointer"} onClick={props.onEdit} ><LuPencil size={18} /></span>
                        <span className={"inline-block text-red-600 cursor-pointer"} onClick={props.onDelete} ><LuTrash2 size={18} /></span>
                    </div>
                    <div className='w-full flex'>
                        <div className="flex-1 hidden md:block">{props.user.username}</div>
                        <div className="flex-1">{props.user.fullname}</div>
                        <div className="flex-1 hidden md:block">{props.user.email}</div>
                        <div className="flex-1 hidden md:block">{props.user.role}</div>
                    </div>
                </div>

            </div>
            <div className="flex-none">


            </div>
        </div>


    )
}
