"use server"

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";

/**
 /* Deletes an instrument
 * @param instrumentId The ID of the instrument to delete
 */
export async function deleteBahan(bahanId: number) {
  try {
   
    const bahan = await db.bahan.findUnique({
      where: { bahan_id: bahanId },
    });
    if (!bahan) {
      throw new Error("Material not found");
    }

   

    // Delete the instrument
    await db.bahan.delete({
      where: { bahan_id: bahanId }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-bahan");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting material:", error);
    throw error;
  }
}

export async function updateBahan(bahanId: number, data: {
  nama_bahan?: string;
  tipe_bahan?: string;
  status?: string;
}) {
  try {
    // Directly update the material using Prisma
    const updatedBahan = await db.bahan.update({
      where: { bahan_id: bahanId },
      data: {
        nama_bahan: data.nama_bahan,
        tipe_bahan: data.tipe_bahan,
        status: data.status
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-bahan");
    
    return { success: true, bahan: updatedBahan };
  } catch (error) {
    console.error("Error updating material:", error);
    throw error;
  }
}

export async function createBahan(data: {
  nama_bahan: string;
  tipe_bahan: string;
  status: string;
}) {
  try {
    // Create a new material using Prisma
    const newBahan = await db.bahan.create({
      data: {
        nama_bahan: data.nama_bahan,
        tipe_bahan: data.tipe_bahan,
        status: data.status
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-bahan");
    
    return { success: true, bahan: newBahan };
    
  } catch (error) {
    console.error("Error creating material:", error);
    throw error;
  }
}