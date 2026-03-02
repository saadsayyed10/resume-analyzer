import { NextRequest, NextResponse } from "next/server";
import { registerUserService } from "../services";

// Register User
export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();
  const data = { name, email, password };

  if (!data) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 404 },
    );
  }

  if (password < 8) {
    return NextResponse.json(
      {
        error: "Password length should be more than 8 characters",
      },
      { status: 400 },
    );
  }

  try {
    const { token, user } = await registerUserService(
      data.name,
      data.email,
      data.password,
    );
    return NextResponse.json(
      { message: "User registered", token: token, user: user },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
