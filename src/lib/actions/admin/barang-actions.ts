"use server"

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";

/**
 /* Deletes an item
 * @param barangId The ID of the instrument to delete
 */
export async function deleteBarang(barangId: number) {
  try {
   
    const barang = await db.barang.findUnique({
      where: { barang_id: barangId },
    });
    if (!barang) {
      throw new Error("Item not found");
    }

   

    // Delete the item
    await db.barang.delete({
      where: { barang_id: barangId }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-barang");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}

export async function updateBarang(barangId: number, data: {
  nama_barang?: string;
  merk_barang?: string;
  tipe_barang?: string;
  jumlah_barang?: string;
}) {
  try {
    // Directly update the item using Prisma
    const updatedBarang = await db.barang.update({
      where: { barang_id: barangId },
      data: {
        nama_barang: data.nama_barang,
        merk_barang: data.merk_barang,
        tipe_barang: data.tipe_barang,
        jumlah_barang: data.jumlah_barang,
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-barang");
    
    return { success: true, barang: updatedBarang };
  } catch (error) {
    console.error("Error updating material:", error);
    throw error;
  }
}

export async function createBarang(data: {
  nama_barang: string;
  merk_barang: string;
  tipe_barang: string;
  jumlah_barang: string;
}) {
  try {
    // Create a new material using Prisma
    const newBarang = await db.barang.create({
      data: {
        nama_barang: data.nama_barang,
        merk_barang: data.merk_barang,
        tipe_barang: data.tipe_barang,
        jumlah_barang: data.jumlah_barang,
        updatedAt: new Date(), // Set the updatedAt field to the current date
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-barang");
    
    return { success: true, barang: newBarang };
    
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}