"use server"

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";

/**
 /* Deletes an instrument
 * @param instrumenId The ID of the instrument to delete
 */
export async function deleteInstrumen(instrumenId: number) {
  try {
    // Check if the instrument has any active rentals
    const instrumen = await db.instrumen.findUnique({
      where: { instrumen_id: instrumenId },
      include: {
        rental: {
          where: {
            status: {
              in: ["PENDING", "APPROVED", "ACTIVE"]
            }
          }
        }
      }
    });

    if (!instrumen) {
      throw new Error("Instrument not found");
    }

    // Don't allow deletion if instrument has active rentals
    if (instrumen.rental.length > 0) {
      throw new Error("Cannot delete instrument with active rentals");
    }

    // Delete the instrument
    await db.instrumen.delete({
      where: { instrumen_id: instrumenId }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-instrumen");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting instrument:", error);
    throw error;
  }
}

export async function updateInstrumen(instrumenId: number, data: {
  nama_instrumen?: string;
  merk_instrumen?: string;
  tipe_instrumen?: string;
  layanan?: string;
  status?: string;
  image_url?: string; // Optional image URL
}) {
  try {
    // Directly update the instrument using Prisma
    const updatedInstrumen = await db.instrumen.update({
      where: { instrumen_id: instrumenId },
      data: {
        nama_instrumen: data.nama_instrumen,
        merk_instrumen: data.merk_instrumen,
        tipe_instrumen: data.tipe_instrumen,
        layanan: data.layanan,
        status: data.status,
        image_url: data.image_url || null // Store the processed image URL
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-instrumen");
    
    return { success: true, instrumen: updatedInstrumen };
  } catch (error) {
    console.error("Error updating instrument:", error);
    throw error;
  }
}


export async function createInstrumen(data: {
  nama_instrumen: string;
  merk_instrumen: string;
  tipe_instrumen: string;
  layanan: string;
  status: string;
  image?: File; // Optional image file
  image_url?: string; // Optional image URL
}) {

  try {
    // Create a new instrument using Prisma
    const newInstrumen = await db.instrumen.create({
      data: {
        nama_instrumen: data.nama_instrumen,
        merk_instrumen: data.merk_instrumen,
        tipe_instrumen: data.tipe_instrumen,
        layanan: data.layanan,
        status: data.status,
        image_url: data.image_url || null,  // Store the processed image URL
        updatedAt: new Date(), // Set the updatedAt field to the current date

      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-instrumen");
    revalidatePath("/katalog");

    
    return { success: true, instrumen: newInstrumen };
  } catch (error) {
    console.error("Error creating instrument:", error);
    throw error;
  }
}