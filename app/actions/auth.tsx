export async function signinAction(username:string|undefined,password:string|undefined) {
    // const username = formData.get("username");
    // const password = formData.get("password");

    const response = await fetch("https://data.msu.ac.th/api/login/", {
    //const response = await fetch("https://melivecode.com/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    return response.json();
}
