"use server";

import { PrismaClient } from '@prisma/client'

import { auth } from "@/lib/auth";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient()


export async function createAdmin({ 
  email, 
  name, 
  password 
}: { 
  email: string; 
  name: string; 
  password: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  
  // Check if the current user is an admin
  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  
  if (currentUser?.role !== "ADMIN") {
    throw new Error("Only admins can create other admins");
  }
  
  // Hash the password
  const hashedPassword = await hash(password, 10);
  
  // Create the admin user
  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "ADMIN",
      userId: `local_${Date.now()}`,
    },
  });
  
  revalidatePath("/admin/create-admin");
}