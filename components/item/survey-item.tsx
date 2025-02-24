import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    LuPencil,
    LuSendHorizontal,
    LuTrash2,
} from 'react-icons/lu';
import Image from 'next/image';

import Tooltip from '../Tooltip';
import Link from 'next/link';
import { LucideSend } from 'lucide-react';


interface Props {
    key: any;
    item: any;
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
}

export default function SurveyboxItem(props: Props) {

    return (
        <div className='my-5'>
            <Link href={props.item.link}>
                <Image
                    // src="/images/blank_avatar.jpg"
                    src={`/picture/${props.item.picture}`}
                    height={200}
                    width={500}
                    alt="Dummy Image"
                    className="h-auto max-w-full rounded-lg"
                />
            </Link>
            <div className='text-2xl text-header-color mt-4'>
                {props.item.title}
            </div>
            <div className='my-2'>
                <div className='text-header-color font-bold'>ประเด็น : </div>
                <div className="indent-8">{props.item.description}</div>
            </div>
            <Button variant={"outline"}>
                <Link href={props.item.link} className='items-center text-green-600' >
                    <LucideSend className='inline me-1' size={20} /><span>ร่วมแสงความคิดห็น</span>
                </Link>
            </Button>
        </div>
    )
}