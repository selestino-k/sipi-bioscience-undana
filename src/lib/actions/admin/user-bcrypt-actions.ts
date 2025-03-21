// src/lib/actions/admin/user-actions.ts
"use server"

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import bcrypt  from 'bcryptjs';


export async function updateUser(data: {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}) {
  try {
    // Prepare update data
    const updateData: any = {};
    
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    
    // If password is provided, hash it before storing
    if (data.password && data.password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData.password = hashedPassword;
    }
    
    // Update the user in the database
    const updatedUser = await db.user.update({
      where: { id: data.id },
      data: updateData,
    });
    
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}