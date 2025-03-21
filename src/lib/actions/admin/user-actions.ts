"use server"

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";

export async function updateUser(data: {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}) {
  try {
    // Prepare update data
    const updateData: Partial<{name: string; email: string; password: string}> = {};
    
    // Only include fields that are provided
    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    
    // If password is provided and not empty, include it
    // Note: In a real app, you should hash passwords, but we're skipping that as requested
    if (data.password && data.password.trim() !== "") {
      updateData.password = data.password;
    }
    
    // Don't perform update if there's nothing to update
    if (Object.keys(updateData).length === 0) {
      return { success: false, message: "No data to update" };
    }
    
    // Update the user in the database
    const updatedUser = await db.user.update({
      where: { id: data.id },
      data: updateData,
    });
  
    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-admin");
    revalidatePath("/profil");
      
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// Function to update user by admin (with different parameter format)
export async function updateUserByAdmin(userId: string, data: {
  name?: string;
  email?: string;
  password?: string;
}) {
  return updateUser({ id: userId, ...data });
}
