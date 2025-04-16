import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import crypto from "crypto";

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  // First get the default adapter
  const baseAdapter = PrismaAdapter(prisma);
  
  // Return extended adapter with our customizations
  return {
    ...baseAdapter,
    createUser: async (data) => {
      // Generate a UUID for the user if not provided
      const userId = crypto.randomUUID();
      
      console.log("Creating user with adapter:", { ...data, id: userId });
      
      try {
        const user = await prisma.user.create({
          data: {
            ...data,
            id: userId, // Explicitly set the ID
            emailVerified: data.emailVerified || null, // Handle emailVerified
            role: "USER", // Default role if not provided
            updatedAt: new Date(), // Add the required updatedAt field
          },
        });
        
        console.log("User created successfully:", user.id);
        return user;
      } catch (error) {
        console.error("Error creating user in adapter:", error);
        throw error;
      }
    },
    
    // Add custom linkAccount function to ensure id is set
    linkAccount: async (account) => {
      try {
        console.log("Linking account:", account);
        
         // Create the account with all required fields
         const linkedAccount = await prisma.account.create({
          data: {
            id: crypto.randomUUID(),
            userId: account.userId,
            type: account.type,
            provider: account.provider, 
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        
        console.log("Account linked successfully");
        return linkedAccount;
      } catch (error) {
        console.error("Error linking account:", error);
        throw error;
      }
    },
    
    // Add a custom createSession function to ensure updatedAt is set
    createSession: async (data) => {
      try {
        console.log("Creating session:", data);
        
        const session = await prisma.session.create({
          data: {
            ...data,
            id: crypto.randomUUID(), // Add required ID field
            updatedAt: new Date(), // Add the required updatedAt field
          },
        });
        
        return session;
      } catch (error) {
        console.error("Error creating session:", error);
        throw error;
      }
    },
    
    // Add a custom createVerificationToken function
    createVerificationToken: async (data) => {
      try {
        console.log("Creating verification token:", {
          identifier: data.identifier,
          expires: data.expires,
        });
        
        const verificationToken = await prisma.verificationtoken.create({
          data: {
            identifier: data.identifier,
            token: data.token,
            expires: data.expires,
          },
        });
        
        return verificationToken;
      } catch (error) {
        console.error("Error creating verification token:", error);
        throw error;
      }
    },
  };
}