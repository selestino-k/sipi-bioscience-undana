"use server"

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function createAdmin(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  try {
    // Hash the password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Create a new admin using Prisma with hashed password
    const newAdmin = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword, // Store the hashed password
        role: "ADMIN"
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-admin");
    
    return { success: true, admin: newAdmin };
    
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
}