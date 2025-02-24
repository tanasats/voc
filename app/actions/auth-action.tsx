"use server"
import jwt from "jsonwebtoken"

export const msu_auth = async (username: any, password: any) => {
    console.log("use server msu_auth()")
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //<-- ปิดการตรวจสอบ SSL
    try {
        const response = await fetch("https://data.msu.ac.th/api/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        console.log("msu authen response =", data);

        if (data.status === 'error') {
            return ({ "message": data.message || "Login failed" });
        }
        return data;
    } catch (error: any) {
        console.log(error)
        return ({ "message": error.message || "Login failedx" })
    }
}