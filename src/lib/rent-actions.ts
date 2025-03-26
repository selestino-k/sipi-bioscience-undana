"use server"

import db from "@/lib/db/db";
import { revalidatePath } from "next/cache";


export async function rentInstrumen(data: {
  instrumen_id: number
  user_id: string
  purpose: string
  start_date: Date
  end_date: Date
}) {
  try {
    // Fetch user details
    const user = await db.user.findUnique({
      where: { id: data.user_id },
    });
    
    if (!user) {
      throw new Error("User not found");
    }

    // 1. Create rental record
    const rental = await db.rental.create({
      data: {
        instrument_id: data.instrument_id,
        user_id: data.user_id,
        purpose: data.purpose,
        start_date: data.start_date,
        end_date: data.end_date,
        status: "PENDING" // Set as PENDING for admin approval
      }
    });

    // 2. Update instrument status
    await db.instrumen.update({
      where: { instrument_id: data.instrument_id },
      data: { status: "PENDING" }
    });

    // 3. Revalidate the path to update the UI
    revalidatePath("/daftar-instrumen");
    
    return { success: true, rental };
  } catch (error) {
    console.error("Error renting instrument:", error);
    throw new Error("Failed to rent instrument");
  }
}

/**
 * Approves a rental request
 * @param rentalId The ID of the rental to approve
 */
export async function approveRental(rentalId: string) {
  try {
    // 1. Get the rental to ensure it exists and find the instrument
    const rental = await db.rental.findUnique({
      where: { id: parseInt(rentalId) },
    });

    if (!rental) {
      throw new Error("Rental not found");
    }

    if (rental.status !== "PENDING") {
      throw new Error("This rental cannot be approved in its current state");
    }

    // 2. Update the rental status to APPROVED
    const updatedRental = await db.rental.update({
      where: { id: parseInt(rentalId) },
      data: { status: "DISETUJUI" }
    });

    // 3. Update the instrument status to DIPINJAM
    await db.instrumen.update({
      where: { instrument_id: rental.instrument_id }, // Change from id to instrument_id
      data: { status: "DIPINJAM" }
    });

    // 4. Revalidate paths to update UI
    revalidatePath("/admin/rentals");
    revalidatePath("/daftar-instrumen");
    
    return { success: true, rental: updatedRental };
  } catch (error) {
    console.error("Error approving rental:", error);
    throw error;
  }
}

/**
 * Rejects a rental request
 * @param rentalId The ID of the rental to reject
 */
export async function rejectRental(rentalId: string) {
  try {
    // 1. Get the rental to ensure it exists and find the instrument
    const rental = await db.rental.findUnique({
      where: { id:  parseInt(rentalId) },
    });

    if (!rental) {
      throw new Error("Rental not found");
    }

    if (rental.status !== "PENDING") {
      throw new Error("This rental cannot be rejected in its current state");
    }

    // 2. Update the rental status to DITOLAK
    const updatedRental = await db.rental.update({
      where: { id: parseInt(rentalId) },
      data: { status: "DITOLAK" }
    });

    // 3. Return the instrument status to TERSEDIA
    await db.instrumen.update({
      where: { instrument_id: rental.instrument_id },
      data: { status: "TERSEDIA" }
    });

    // 4. Revalidate paths to update UI
    revalidatePath("/admin/rentals");
    revalidatePath("/daftar-instrumen");
    
    return { success: true, rental: updatedRental };
  } catch (error) {
    console.error("Error rejecting rental:", error);
    throw error;
  }
}

/**
 * Marks a rental as completed
 * @param rentalId The ID of the rental to complete
 */
export async function completeRental(rentalId: string) {
  if (!rentalId) {
    throw new Error("Missing rental ID");
  }

  try {
    // 1. Get the rental to ensure it exists and find the instrument
    const rental = await db.rental.findUnique({
      where: { id: parseInt(rentalId) },
    });

    // Add proper null check for instrument_id
    if (!rental || !rental.instrument_id) {
    throw new Error("Rental not found or has invalid instrument ID");
    }

    if (rental.status !== "DISETUJUI" && rental.status !== "AKTIF") {
      throw new Error("This rental cannot be completed in its current state");
    }

    // 2. Update the rental status to SELESAI and set actual end_date to now
    const updatedRental = await db.rental.update({
      where: { id: parseInt(rentalId) },
      data: { 
        status: "SELESAI",
        updatedAt: new Date() // Record when it was actually returned, use updatedtAt as date return
      }
    });
    
    
    // 3. Return the instrument status to TERSEDIA
    await db.instrumen.update({
      where: { instrument_id: rental.instrument_id }, // Make sure this property name matches your schema
      data: { status: "TERSEDIA" }
    });

    // 4. Revalidate paths to update UI
    revalidatePath("/admin/rentals");
    revalidatePath("/daftar-instrumen");
    
    return { success: true, rental: updatedRental };
  } catch (error) {
    console.error("Error completing rental:", error);
    throw new Error(`Failed to complete rental: {error.message}`);

  }
}

