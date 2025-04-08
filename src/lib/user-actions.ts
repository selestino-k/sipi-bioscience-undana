"use server"

import db from "@/lib/db/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { executeAction } from "./executeAction";

// Validation schemas
const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
  role: z.string(),
});

const updatePasswordSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

// Base implementation functions
async function _createUserWithHashedPassword(userData: z.infer<typeof createUserSchema>) {
 
  // Check if user with this email already exists
  const existingUser = await db.user.findUnique({
    where: { email: userData.email },
  });
  
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  
  // Hash the password with bcrypt (10 rounds of salt)
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  console.log("Password hashed successfully");

  
  // Create the user with the hashed password
  const user = await db.user.create({
    data: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name || userData.email.split('@')[0], // Use part of email as name if not provided
        role: "USER", // Sign Up always creates a USER role
    },
  });
  
  return user;
}

async function _updateUserPassword(data: z.infer<typeof updatePasswordSchema>) {
  const hashedPassword = await bcrypt.hash(data.newPassword, 10);
  
  const updatedUser = await db.user.update({
    where: { id: data.userId },
    data: { password: hashedPassword },
  });
  
  return updatedUser;
}

// Wrapped functions with error handling
export async function createUserWithHashedPassword(userData: z.infer<typeof createUserSchema>) {
  return executeAction({
    schema: createUserSchema,
    action: _createUserWithHashedPassword,
    data: userData,
    revalidate: ['/admin/daftar-admin'],
  });
}

export async function updateUserPassword(userId: string, newPassword: string) {
  return executeAction({
    schema: updatePasswordSchema,
    action: _updateUserPassword,
    data: { userId, newPassword },
    revalidate: ['/admin/daftar-admin', '/pengaturan-akun'],
  });
}

// Add a new function for updating user details
const updateUserSchema = z.object({
  id: z.string().min(1, "User ID is required"),
  name: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

async function _updateUser(data: z.infer<typeof updateUserSchema>) {
  const updateData: Partial<{
    name: string;
    email: string;
    password: string;
  }> = {};
  
  if (data.name !== undefined) updateData.name = data.name;
  if (data.email !== undefined) updateData.email = data.email;
  
  // If password is provided, hash it
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }
  
  if (Object.keys(updateData).length === 0) {
    throw new Error("No data to update");
  }
  
  const updatedUser = await db.user.update({
    where: { id: data.id },
    data: updateData,
  });
  
  return updatedUser;
}

export async function updateUser(data: z.infer<typeof updateUserSchema>) {
  return executeAction({
    schema: updateUserSchema,
    action: _updateUser,
    data,
    revalidate: ['/admin/daftar-admin', '/pengaturan-akun'],
  });
}
