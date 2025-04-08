"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import db from "@/lib/db/db";
import { executeAction } from "@/lib/executeAction";

// Validation schema
const adminSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .refine(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
      message: "Format email tidak valid"
    }),
  password: z.string()
    .min(8, "Password minimal 8 karakter")
    .refine(password => /[A-Z]/.test(password), {
      message: "Password harus memiliki minimal 1 huruf kapital"
    })
    .refine(password => /[0-9]/.test(password), {
      message: "Password harus memiliki minimal 1 angka"
    }),
  role: z.enum(["ADMIN", "USER"], {
    required_error: "Role wajib dipilih",
  }),
});

type AdminInput = z.infer<typeof adminSchema>;

async function _createAdmin(data: AdminInput) {
  console.log("Creating admin with data:", {
    name: data.name,
    email: data.email,
    role: data.role
  });
  
  // Check if user with this email already exists
  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });
  
  if (existingUser) {
    console.log("User already exists with email:", data.email);
    throw new Error("User dengan email ini sudah terdaftar");
  }
  
  // Hash the password with bcrypt, 10 round of salt
  const hashedPassword = await bcrypt.hash(data.password, 10);
  console.log("Password hashed successfully");
  
  try {
    // Create user with hashed password
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });
    
    console.log("Admin created successfully:", user.id);
    return user;
  } catch (error) {
    console.error("Database error creating user:", error);
    throw error;
  }
}

export async function createAdmin(data: AdminInput) {
  return executeAction({
    schema: adminSchema,
    action: _createAdmin,
    data,
    revalidate: ['/admin/daftar-admin'],
  });
}