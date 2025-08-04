import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { unstable_cache } from 'next/cache';

const getUserRole = unstable_cache(
  async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true }
    });
    return user;
  },
  ['user-role'],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: ['user-role']
  }
);

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await getUserRole(session.user.email);
    
    // Add cache headers
    const response = NextResponse.json(user);
    response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate');
    
    return response;

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}