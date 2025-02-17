export async function POST(request: Request, response: Response) {

	console.log(request.body)
	return Response.json({ status: "user added" });
}
