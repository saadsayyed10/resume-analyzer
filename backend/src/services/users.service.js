import bcryptjs from "bcryptjs";
import prisma from "../lib/prisma.orm.js";
import { generateToken } from "../lib/generate-token.js";

export const registerUserService = async (name, email, password) => {
  const existing = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existing) throw new Error("User account already exists");

  const hashPassword = await bcryptjs.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  const token = generateToken(user.id);

  return { token, user };
};

export const loginUserService = async (email, password) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error("User account does not exist");

  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) throw new Error("Password is incorrect");

  const token = generateToken(user.id);

  return { token, user };
};

export const userProfileService = async (userId) => {
  return await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      created_at: true,
    },
  });
};
