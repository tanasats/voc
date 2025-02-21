import React from 'react'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    LuPencil,
    LuTrash2,
} from 'react-icons/lu';
import Image from 'next/image';

import Tooltip from '../Tooltip';


interface Props {
    key: any;
    item: any;
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
}

export default function SurveyboxItem(props: Props) {
    return (
        <div>
            <Image
                // src="/images/blank_avatar.jpg"
                src={`/picture/${props.item.picture}`}
                height={200}
                width={300}
                alt="Dummy Image"
                className="h-auto max-w-full rounded-lg"
            />
            <div>
                {props.item.title}
            </div>
            <div>{props.item.description}</div>

        </div>
    )
}