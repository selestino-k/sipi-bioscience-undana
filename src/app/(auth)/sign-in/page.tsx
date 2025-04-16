import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GoogleSignIn } from "@/components/google-signin";
import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";
import { CircleLoader } from "@/components/ui/circle-loader";
// Extend Next-Auth types
declare module "next-auth" {
  interface User {
    role?: string;
  }
  
  interface Session {
    user?: User;
  }
}

export const metadata: Metadata = {
  title: "Masuk",
  description: "Silahkan masuk ke akun Anda untuk melanjutkan.",
};

export default async function SignInPage() {
  const session = await auth();

  // Check if user is authenticated
  if (session) {
    // Check user role and redirect accordingly
    if (session.user?.role === "ADMIN") {
      redirect("/admin");
    } else {
      redirect("/"); // Regular users go to home page
    }
  }
  
  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-md mx-auto space-y-6 row-start-2 p-8 rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold mb-1">Selamat Datang</h1>
          <h2 className="text-lg">SI Peminjaman dan Inventaris <br></br>UPT Lab Terpadu Universitas Nusa Cendana</h2>
          <p className="text-sm text-muted-foreground mt-2">Untuk melanjutkan, silakan masuk ke akun Anda.</p>
        </div>

        <div className="flex justify-center">
          <GoogleSignIn />
        </div>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 text-muted-foreground">
              Atau masuk dengan Email dan Password
            </span>
          </div>
        </div>
        <Suspense fallback={
          <div className="flex justify-center items-center h-96">
            <CircleLoader className="h-12 w-12" />
          </div>
          }>
        <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}