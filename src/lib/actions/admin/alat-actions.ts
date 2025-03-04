"use server"

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";

/**
 /* Deletes a tool
 * @param alatId The ID of the tool to delete
 */
export async function deleteAlat(alatId: number) {
  try {
   
    const alat = await db.alat.findUnique({
      where: { alat_id: alatId },
    });
    if (!alat) {
      throw new Error("Tool not found");
    }

   

    // Delete the tool
    await db.alat.delete({
      where: { alat_id: alatId }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-alat");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting tool:", error);
    throw error;
  }
}

export async function updateAlat(alatId: number, data: {
  nama_alat?: string;
  jumlah_alat?: string;
  status?: string;
}) {
  try {
    // Directly update the tool using Prisma
    const updatedAlat = await db.alat.update({
      where: { alat_id: alatId },
      data: {
        nama_alat: data.nama_alat,
        jumlah_alat: data.jumlah_alat, // Changed field name to match Prisma schema
        status: data.status
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-alat");
    
    return { success: true, alat: updatedAlat};
  } catch (error) {
    console.error("Error updating tool:", error);
    throw error;
  }
}

export async function createAlat(data: {
  nama_alat: string;
  jumlah_alat: string;
  status: string;
}) {
  try {
    // Create a new tool using Prisma
    const newAlat = await db.alat.create({
      data: {
        nama_alat: data.nama_alat,
        jumlah_alat: data.jumlah_alat, // Changed field name to match Prisma schema
        status: data.status
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-alat");
    
    return { success: true, alat: newAlat };
    
  } catch (error) {
    console.error("Error creating tool:", error);
    throw error;
  }
}