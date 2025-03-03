
"use server"

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";

/**
 /* Deletes an instrument
 * @param instrumentId The ID of the instrument to delete
 */
export async function deleteInstrument(instrumentId: number) {
  try {
    // Check if the instrument has any active rentals
    const instrument = await db.instrumen.findUnique({
      where: { instrument_id: instrumentId },
      include: {
        rentals: {
          where: {
            status: {
              in: ["PENDING", "APPROVED", "ACTIVE"]
            }
          }
        }
      }
    });

    if (!instrument) {
      throw new Error("Instrument not found");
    }

    // Don't allow deletion if instrument has active rentals
    if (instrument.rentals.length > 0) {
      throw new Error("Cannot delete instrument with active rentals");
    }

    // Delete the instrument
    await db.instrumen.delete({
      where: { instrument_id: instrumentId }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-instrumen");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting instrument:", error);
    throw error;
  }
}

export async function updateInstrument(instrumentId: number, data: {
  nama_instrumen?: string;
  merk_instrumen?: string;
  tipe_instrumen?: string;
  layanan?: string;
  status?: string;
}) {
  try {
    // Directly update the instrument using Prisma
    const updatedInstrument = await db.instrumen.update({
      where: { instrument_id: instrumentId },
      data: {
        nama_instrumen: data.nama_instrumen,
        merk_instrumen: data.merk_instrumen,
        tipe_instrumen: data.tipe_instrumen,
        layanan: data.layanan,
        status: data.status
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-instrumen");
    
    return { success: true, instrument: updatedInstrument };
  } catch (error) {
    console.error("Error updating instrument:", error);
    throw error;
  }
}

export async function createInstrument(data: {
  nama_instrumen: string;
  merk_instrumen: string;
  tipe_instrumen: string;
  layanan: string;
  status: string;
}) {
  try {
    // Create a new instrument using Prisma
    const newInstrument = await db.instrumen.create({
      data: {
        nama_instrumen: data.nama_instrumen,
        merk_instrumen: data.merk_instrumen,
        tipe_instrumen: data.tipe_instrumen,
        layanan: data.layanan,
        status: data.status
      }
    });

    // Revalidate paths to update UI
    revalidatePath("/admin/daftar-instrumen");
    
    return { success: true, instrument: newInstrument };
  } catch (error) {
    console.error("Error creating instrument:", error);
    throw error;
  }
}