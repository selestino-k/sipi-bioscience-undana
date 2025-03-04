"use server"

import { schema } from "@/lib/schema";
import db from "@/lib/db/db";
import { executeAction } from "@/lib/executeAction";
import { revalidatePath } from "next/cache";

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = schema.parse({ email, password });
      await db.user.create({
        data: {
          email: validatedData.email.toLocaleLowerCase(),
          password: validatedData.password,
        },
      });
    },
    successMessage: "Signed up successfully",
  });
};

export { signUp };

export async function rentInstrument(data: {
  instrument_id: number
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
      where: { id: rentalId },
    });

    if (!rental) {
      throw new Error("Rental not found");
    }

    if (rental.status !== "PENDING") {
      throw new Error("This rental cannot be approved in its current state");
    }

    // 2. Update the rental status to APPROVED
    const updatedRental = await db.rental.update({
      where: { id: rentalId },
      data: { status: "DISETUJUI" }
    });

    // 3. Update the instrument status to DIPINJAM
    await db.instrumen.update({
      where: { id: rental.instrument_id },
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
      where: { id: rentalId },
    });

    if (!rental) {
      throw new Error("Rental not found");
    }

    if (rental.status !== "PENDING") {
      throw new Error("This rental cannot be rejected in its current state");
    }

    // 2. Update the rental status to REJECTED
    const updatedRental = await db.rental.update({
      where: { id: rentalId },
      data: { status: "DITOLAK" }
    });

    // 3. Return the instrument status to TERSEDIA
    await db.instrumen.update({
      where: { id: rental.instrument_id },
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
  try {
    // 1. Get the rental to ensure it exists and find the instrument
    const rental = await db.rental.findUnique({
      where: { id: rentalId },
    });

    if (!rental) {
      throw new Error("Rental not found");
    }

    if (rental.status !== "DISETUJUI" && rental.status !== "AKTIF") {
      throw new Error("This rental cannot be completed in its current state");
    }

    // 2. Update the rental status to COMPLETED and set actual end_date to now
    const updatedRental = await db.rental.update({
      where: { id: rentalId },
      data: { 
        status: "SELESAI",
        actual_end_date: new Date() // Record when it was actually returned
      }
    });

    // 3. Return the instrument status to TERSEDIA
    await db.instrumen.update({
      where: { id: rental.instrument_id },
      data: { status: "TERSEDIA" }
    });

    // 4. Revalidate paths to update UI
    revalidatePath("/admin/rentals");
    revalidatePath("/daftar-instrumen");
    
    return { success: true, rental: updatedRental };
  } catch (error) {
    console.error("Error completing rental:", error);
    throw error;
  }
}

