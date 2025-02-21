'use client'
import React, { useEffect, useState } from 'react'
import { getByUsername, getUser } from '../_actions/user-action'
import { useSession } from '../context/SessionContext';
import Image from 'next/image';
import { LuMail, LuShieldCheck } from 'react-icons/lu';

export default function Profile() {
  const { user } = useSession();
  const [userdata, setUserdata] = useState([]);
  const userprofile = null;
  useEffect(() => {
    getByUsername(user?.id).then((res: any) => {
      console.log(res);
      setUserdata(res);
    })
  }, [user])


  return (
    <div className='content-wrapper'>
      <div className="p-4">
        <Image
          // src="/images/blank_avatar.jpg"
          src="https://pd.msu.ac.th/staff/picture/5002658.jpg"
          height={200}
          width={200}
          alt="Dummy Image"
          className="rounded-full aspect-square object-cover border border-slate-200"
        />
        {userdata.map((item: any) => (
          <div className='flex flex-col gap-1 mt-4'>
            <div className='text-xl text-header-color'>{item.fullname}</div>
            <div className='flex items-center gap-2'><span className='w-30'><LuMail /></span>{item.email}</div>
            <div className='flex items-center gap-2'><span className='w-30'><LuShieldCheck /></span>{item.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
