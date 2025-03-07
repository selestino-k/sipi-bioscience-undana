"use server"

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";

export async function createAdmin(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  try {
    // Create a new admin using Prisma
    const newAdmin = await db.user.create({
      data: {
        name: data.name,
        email: data.email, // Changed field name to match Prisma schema
        password: data.password,
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