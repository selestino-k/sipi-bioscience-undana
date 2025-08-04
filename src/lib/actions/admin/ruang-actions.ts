"use server"

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";

/**
 /* Deletes a tool
 * @param ruangId The ID of the room to delete
 */
export async function deleteRuang(ruangId: number) {
  try {
   
    const ruang = await db.ruang.findUnique({
      where: { ruang_id: ruangId },
    });
    if (!ruang) {
      throw new Error("Room not found");
    }

   

    // Delete the room
    await db.ruang.delete({
      where: { ruang_id: ruangId }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-ruang");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
}

export async function updateRuang(ruangId: number, data: {
  nama_ruang: string;
  ruang_desc?: string | null; // Optional field
}) {
  try {
    // Directly update the tool using Prisma
    const updatedRuang = await db.ruang.update({
      where: { ruang_id: ruangId },
      data: {
        nama_ruang : data.nama_ruang,
        ruang_desc: data.ruang_desc || null,
        updatedAt: new Date(), 
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-ruang");
    
    return { success: true, ruang: updatedRuang};
  } catch (error) {
    console.error("Error updating room:", error);
    throw error;
  }
}

export async function createRuang(data: {
  nama_ruang : string;
  ruang_desc?: string | null; // Optional field
}) {
  try {
    // Create a new tool using Prisma
    const newRuang = await db.ruang.create({
      data: {
        nama_ruang : data.nama_ruang,
        ruang_desc: data.ruang_desc || null, // Handle optional description
        updatedAt: new Date(), // Set the updatedAt field to the current date
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-ruang");
    
    return { success: true, ruang: newRuang };
    
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}