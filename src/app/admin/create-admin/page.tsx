import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { CreateAdminForm } from "@/components/admin/create-admin-form";

const prisma = new PrismaClient();

export default async function CreateAdminPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  
  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });
  
  if (user?.role !== "ADMIN") {
    redirect("/");
  }
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create Admin User</h1>
      <CreateAdminForm />
    </div>
  );
}