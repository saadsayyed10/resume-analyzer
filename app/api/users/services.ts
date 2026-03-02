import { generateToken } from "@/lib/generate-token";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const registerUserService = async (
  name: string,
  email: string,
  password: string,
) => {
  const existing = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id);

  return { token, user };
};

export const loginUserService = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error("User do not exist");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Password is incorrect");

  const token = generateToken(user.id);

  return { token, user };
};
