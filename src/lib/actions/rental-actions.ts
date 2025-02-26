"use server";

import { PrismaClient } from '@prisma/client'
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient()
export async function createRentalRequest({
  instrumentId,
  startDate,
  endDate,
  purpose,
}: {
  instrumentId: string;
  startDate: Date;
  endDate: Date;
  purpose: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Check if instrument exists
  const instrument = await prisma.instrumen.findUnique({
    where: { id: instrumentId },
  });

  if (!instrument) {
    throw new Error("Instrumen tidak ditemukan");
  }

  // Check if instrument is already rented for the requested period
  const conflictingRental = await prisma.rental.findFirst({
    where: {
      instrumenId: instrumentId,
      status: { in: ["APPROVED", "ACTIVE"] },
      OR: [
        {
          // Requested period overlaps with existing rental
          startDate: { lte: endDate },
          endDate: { gte: startDate },
        },
      ],
    },
  });

  if (conflictingRental) {
    throw new Error("Instrumen sudah dipinjam pada rentang waktu yang dipilih");
  }

  // Create rental request
  await prisma.rental.create({
    data: {
      userId: session.user.id,
      instrumenId: instrumentId,
      startDate,
      endDate,
      purpose,
      status: "PENDING",
    },
  });

  revalidatePath("/daftar-instrumen");
}

export async function updateRentalStatus({
  rentalId,
  status,
}: {
  rentalId: string;
  status: "APPROVED" | "REJECTED" | "ACTIVE" | "RETURNED";
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Check if user is admin (you need to implement this)
  const isAdmin = await checkIfUserIsAdmin(session.user.id);
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  await prisma.rental.update({
    where: { id: rentalId },
    data: { status },
  });

  revalidatePath("/admin/rentals");
}

// Helper function to check if user is admin
async function checkIfUserIsAdmin(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  
  return user?.role === "ADMIN";
}

// Add to admin-actions.ts
export async function promoteUserToAdmin(targetUserId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  
  // Check if the current user is an admin
  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  
  if (currentUser?.role !== "ADMIN") {
    throw new Error("Only admins can promote users");
  }
  
  // Promote the user to admin
  await prisma.user.update({
    where: { id: targetUserId },
    data: { role: "ADMIN" },
  });
  
  revalidatePath("/admin/users");
}