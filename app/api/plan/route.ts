export async function POST(req:Request) {
    const body = await req.json();
    console.log('req....'+body);
    const response = await fetch("https://gpt-api-ly2q.onrender.com/GetPlan", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(body)
    });

    console.log(response);
    return response;
}