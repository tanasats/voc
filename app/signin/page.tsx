// import SignInForm from '@/components/form/signin-form'
// import React from 'react'

// export default function SignIn() {
//   return (
//     <div className='content-wrapper'>
//       <SignInForm />
//     </div>
//   )
// }

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
import { signinAction } from '@/app/actions/auth'
import { useSession } from '@/app/context/SessionContext'
//import toast from 'react-hot-toast'
import { useToast } from "@/hooks/use-toast"
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { addUser, findUsername } from '../_actions/user-action'

export default function Login() {
  const [formError, setFormError] = useState<any[]>([]);
  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
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
    // form is valid ----------------------------------------------------
    setFormError([]);
    try {
      const response = await fetch("https://data.msu.ac.th/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("data=", data);

      if (data.status === 'error') {
        // toast.error(data.message);
        toast({
          variant: "destructive",
          title: "ผิดพลาด",
          description: data.message,
        })
        throw new Error(data.message || "Login failed");
      }

      // ตรวจสอบ username ในฐายข้อมูล
      // ถ้าไม่พบ ให้ทำการ Insert ลงในฐานข้อมูล role=<usertype>
      //const res =  findUsername(data.username)
      //console.log("result=",res);
      const res1 = await addUser(data.username, data.fullname, data.mail,  data.usertype );
      console.log("res1: ",res1)
      // ใช้ login function จาก SessionContext เพื่อ set ค่า session
      login({ id: data.username, name: data.fullname, role: data.usertype, email: data.mail }, data.access_token);

    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <form onSubmit={handleSubmit}>
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>เข้าใช้งาน</CardTitle>
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
                placeholder="username or email"
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
      </form>
    </div>
  );
}