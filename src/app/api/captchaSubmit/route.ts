import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secretKey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  const postData = await request.json();
  const { gRecaptchaToken } = postData;

  console.log(
    "gRecaptchaToken,email:",
    gRecaptchaToken?.slice(0, 10) + "...",
  );

  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;

  let res: Response;
  try {
    res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (e: any) {
    console.log("recaptcha error:", e);
    return NextResponse.json({ success: false, error: e.message });
  }

  const resData = await res.json();

  if (resData?.success && resData?.score > 0.5) {
    // Save data to the database from here
    console.log("res.data?.score:", resData?.score);

    return NextResponse.json({
      success: true,
      score: resData?.score
    })
  } else {
    console.log("fail: res.data?.score:", resData?.score);
    return NextResponse.json({ success: false, score: resData?.score });
  }
}
