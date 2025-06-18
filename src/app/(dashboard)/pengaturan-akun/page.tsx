import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { UpdateUserForm } from "./update-user-form"

export default async function PengaturanAkunPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/sign-in")
  }

  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
        <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight mb-6 pl-8">
          Pengaturan Profil Akun
        </h2>
        
        <UpdateUserForm user={session.user} />
      </main>
    </div>
  )
}