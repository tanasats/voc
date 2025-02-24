'use client'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSurveybox } from "./actions/surveybox-action";
import SurveyboxItem from "@/components/item/survey-item";
import Link from "next/link";
import Image from "next/image";




export default function Home() {
  const [surveyboxs, setSurveyboxs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSurveybox();
  }, [])

  const fetchSurveybox = async () => {
    try {
      const datas = await getSurveybox(page, 20, "");
      setSurveyboxs(datas.items);
      console.log(datas.items)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }


  return (
    <div className="content-wrapper">
      <div className="mb-3 text-center">
        <h1 className="text-3xl text-header-color">MSU Students Life Cycle & VoC</h1>
        <div className="">
          <Link href="https://shorturl.asia/0TsJO">
            ระบบรับฟังเสียงนิสิต มมส เพื่อประเมินความพึงพอใจต่อสิ่งสนับสนุนการเรียนรู้ และ โครงสร้างพื้นฐาน
          </Link>
        </div>
        <div className="mx-auto">
          <Image src="/picture/voc_overview.jpg"  width={1000} height={100} alt="" className="w-full"/>
        </div>
      </div>
      <div className="flex flex-wrap">
        {surveyboxs.map((surveybox: any, index) => (
          <div className="basis-1/1 md:basis-1/2 lg:basis-1/3 p-2">
          <SurveyboxItem
            key={index}
            item={surveybox}
            onEdit={() => { }}
            onDelete={() => { }}
          />
          </div>
        ))}
      </div>


    </div>
  );
}