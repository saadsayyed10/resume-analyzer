import { NextRequest, NextResponse } from "next/server";
import { loginUserService } from "../services";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  if (password < 8) {
    return NextResponse.json(
      {
        error: "Password should be more than 8 characters",
      },
      { status: 400 },
    );
  }

  try {
    const { token, user } = await loginUserService(email, password);

    return NextResponse.json(
      { message: "User logged in", token: token, user: user },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
