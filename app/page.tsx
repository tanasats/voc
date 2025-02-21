'use client'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSurveybox } from "./_actions/surveybox-action";
import SurveyboxItem from "@/components/item/survey-item";
import Link from "next/link";




export default function Home() {
  const [surveyboxs, setSurveyboxs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSurveybox();
  }, [])

  const fetchSurveybox = async () => {
    try {
      const datas = await getSurveybox(page, 10, "");
      setSurveyboxs(datas.items);
      console.log(datas.items)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }


  return (
    <div className="content-wrapper">
      <div className="mb-3">
        <h1 className="text-2xl">Platform Application </h1>
        <div className="">
          <Link href="https://shorturl.asia/0TsJO">
          ระบบรับฟังเสียงนิสิตและผู้มีส่วนได้ส่วนเสีย เพื่อการพัฒนามหาวิทยาลัยมหาสารคาม 
          </Link>
        </div>
      </div>
      {surveyboxs.map((surveybox:any,index)=>(
        <SurveyboxItem
          key={index}
          item={surveybox}
          onEdit={()=>{}}
          onDelete={()=>{}}
        />
      ))}

    </div>
  );
}