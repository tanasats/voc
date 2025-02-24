'use client'
import { FormEvent, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LoginSchema } from '@/lib/zodschema/loginschema'
//import { signinAction } from '@/app/actions/auth'
import { useSession } from '@/app/context/SessionContext'
import { useToast } from "@/hooks/use-toast"
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
//import { addUser, findUsername } from '../_actions/user-action'
import { msu_auth } from '../actions/auth-action'
import { getByUsername, insertUser } from '../actions/user-action'
import { decodeToken, signToken } from '../actions/jwt-action'

export default function Login() {
  const [formError, setFormError] = useState<any[]>([]);
  const [error, setError] = useState("");
  const { login } = useSession();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { toast } = useToast()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    setError("");
    console.log("handleSubmit()");
    const signinData = {
      username: username,
      password: password,
    }
    console.log("submit():", signinData);
    // zod 
    const parseLogin = LoginSchema.safeParse(signinData);
    if (!parseLogin.success) {
      const { errors: errArr } = parseLogin.error;
      const fe = errArr.map(e => ({ "for": e.path[0], "message": e.message }));
      console.log("zoderror result:", fe);
      setFormError(fe);
      return;
    }
    // form is valid ------------------------------
    setFormError([]);

    const data = await msu_auth(username, password);
    console.log("msu_auth() :", data);

    if (data.access_token) {
      // เพิ่มผู้ใช้งานลงในฐานข้อมูล ถ้ามีแล้วมันก็จะไม่เข้า..555
      const result1 = await insertUser({
        username: data.username, 
        fullname: data.fullname,
        email: data.mail,
        usertype: data.usertype
      })
      console.log("result1=",result1);
      // อ่านข้อมูลผู้ใช้งานเพื่อต้องการทราบ role ผู้ใช้งาน
      const result2 = await getByUsername(data.username);
      console.log("result2=",result2);
      
      const test = await decodeToken(data.access_token);
      console.log("test decode token = ",test);

      const testtoken = await signToken({
        username:"tanasat",
        roles:'xxx'
      });
      console.log("testToken=",testtoken);
      // ใช้ login function จาก SessionContext เพื่อ set ค่า session
      login({ id: data.username, name: data.fullname, role: data.usertype, email: data.mail }, data.access_token);
    } else {
      toast({
        variant: "destructive",
        title: "ผิดพลาด",
        description: data.message,
      })
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <form onSubmit={handleSubmit}>
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle className='text-2xl'>เข้าใช้งาน</CardTitle>
            <CardDescription>
              เข้าใช้งานด้วย MSU Authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='form-group'>
              <Label>Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
              <span className='text-xs text-red-500 italic'>{formError.find((e) => e.for == "username")?.message}</span>
            </div>
            <div className='form-group'>
              <Label>Password</Label>
              <div className='relative'>
                <Input
                  id="password"
                  name="password"
                  type={isShowPassword ? "text" : "password"}
                  //type='password'
                  placeholder="password"
                />
                {isShowPassword ?
                  (
                    <EyeIcon size={20} className='absolute top-[0.5rem] right-2 cursor-pointer text-muted-foreground' onClick={() => setIsShowPassword(!isShowPassword)} />
                  ) : (
                    <EyeOffIcon size={20} className='absolute top-[0.5rem] right-2 cursor-pointer text-muted-foreground' onClick={() => setIsShowPassword(!isShowPassword)} />
                  )
                }
              </div>
              <span className='text-xs text-red-500 italic'>{formError.find((e) => e.for == "password")?.message}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Sign In</Button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="#">
            Sign Up
          </Link>
        </div>
        <div className='text-center'>
          <Link href={"/"}>
          หน้าหลัก</Link>
        </div>
      </form>
    </div>
  );
}