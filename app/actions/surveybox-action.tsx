"use server"
const api_server = process.env.API_SERVER;

//📌 เรียกข้อมูล pagging 
export const getSurveybox = async (page: any, limit: any, orderby: any) => {
    console.log("getSurveybox()");
  try {
    const res = await fetch(`${api_server}/surveybox?page=${page}&limit=${limit}&orderby=${orderby}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accesstoken}`,
      },
    });
    console.log(res);
    if (!res) return ({ message: "Failed to fetch users" });
    const data = await res.json();
    console.log(data)
    return data;

  } catch (error) {
    console.error("Error fetching users:", error);
  }
}