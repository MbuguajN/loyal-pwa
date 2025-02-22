export async function POST(request: Request) {
  const data = await request.formData();
  const role = data.get("role")?.toString();

  const phoneNumber = data.get("phoneNumber")?.toString();
  console.log(phoneNumber)
  if (role === "business") {
    const businessName = data.get("businessName")?.toString();

    console.log(businessName)
  } else {

  }
}
