export async function POST(request: Request) {

	console.log(request.body)
	return Response.json({ status: "user added" });
}
