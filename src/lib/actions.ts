"use server"

import { schema } from "@/lib/schema";
import db from "@/lib/db/db";
import { executeAction } from "@/lib/executeAction";

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
        status: "ACTIVE"
      }
    });

    // 2. Update instrument status
    await db.instrument.update({
      where: { id: data.instrument_id },
      data: { status: "Dipinjam" }
    });

    // 3. Revalidate the path to update the UI
    revalidatePath("/daftar-instrumen");
    
    return { success: true, rental };
  } catch (error) {
    console.error("Error renting instrument:", error);
    return { success: false, error: "Failed to rent instrument" };
  }
}