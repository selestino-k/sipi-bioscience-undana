import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client"; // Add Prisma namespace import
import { Adapter, AdapterUser, AdapterAccount } from "next-auth/adapters";
import crypto from "crypto";

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  // First get the default adapter
  const baseAdapter = PrismaAdapter(prisma);
  
  // Return extended adapter with our customizations
  return {
    ...baseAdapter,
    createUser: async (data) => {
      // Generate a UUID for the user
      const userId = crypto.randomUUID();      
      try {
        // Create user with required fields
        const user = await prisma.user.create({
          data: {
            id: userId,
            name: data.name,
            email: data.email,
            emailVerified: data.emailVerified,
            image: data.image,
            role: "USER", // Default role
            updatedAt: new Date(), // Prisma handles Date objects for direct fields
          },
        });
        
        return user as AdapterUser;
      } catch (error) {
        throw error;
      }
    },
    
    linkAccount:  async (account) => {
      try {
        
        // Remove createdAt and updatedAt from explicit type definition
        // and create base required fields
        const linkedAccount = await prisma.account.create({
          data: {
            id: crypto.randomUUID(),
            userId: account.userId,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token ?? null,
            access_token: account.access_token ?? null,
            expires_at: account.expires_at ?? null,
            token_type: account.token_type ?? null,
            scope: account.scope ?? null,
            id_token: account.id_token ?? null,
            session_state: account.session_state ? String(account.session_state) : null,
            // Let Prisma handle the dates
            updatedAt: new Date(),
          }
        });
        
        // Convert date objects to strings to make it compatible with AdapterAccount
        const accountWithoutDateObjects = {
          ...linkedAccount,
          createdAt: linkedAccount.createdAt.toISOString(),
          updatedAt: linkedAccount.updatedAt.toISOString()
        };
        return accountWithoutDateObjects as unknown as AdapterAccount;
      } catch (error) {
        throw error;
      }
    },
    
    // Similar fixes for other methods...
    createSession: async (data) => {
      try {        
        const session = await prisma.session.create({
          data: {
            id: data.sessionToken,
            sessionToken: data.sessionToken,
            userId: data.userId,
            expires: data.expires,
            // Let Prisma handle createdAt with default(now())
            updatedAt: new Date(),
          },
        });
        
        return session;
      } catch (error) {
        throw error;
      }
    },
    
    createVerificationToken: async (data) => {
      try {
        const verificationToken = await prisma.verificationtoken.create({
          data: {
            identifier: data.identifier,
            token: data.token,
            expires: data.expires,
          },
        });
        
        return verificationToken;
      } catch (error) {
        throw error;
      }
    },
  };
}