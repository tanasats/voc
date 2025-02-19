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
import { Button } from '../ui/button'
import Link from 'next/link'
import { LoginSchema } from '@/lib/zodschema/loginschema'
import { signinAction } from '@/app/actions/auth'
import { useSession } from '@/app/context/SessionContext'

export default function SignInForm() {
    const [formError, setFormError] = useState<any[]>([]);


    //const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username")?.toString();
        const password = formData.get("password")?.toString();
        const { login } = useSession();

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
        // form is valid
        setFormError([]);
        //const res = await _signin(signinData);
        const res = await signinAction(username,password)
        console.log("response :", res);
        
 
    }

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
                            ></Input>
                            <span className='text-xs text-red-500 italic'>{formError.find((e) => e.for == "username")?.message}</span>
                        </div>
                        <div className='form-group'>
                            <Label>Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="text"
                                placeholder="password"
                            ></Input>
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
    )
}
