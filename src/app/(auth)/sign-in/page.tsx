import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";
import { GoogleSignIn } from "@/components/google-signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import "next-auth";

// Extend Next-Auth types
declare module "next-auth" {
  interface User {
    role?: string;
  }
  
  interface Session {
    user?: User;
  }
}

// Use Next.js generated types for page props
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const errorMessage = searchParams.error as string | undefined;
  
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
      <main className="w-full max-w-md mx-auto space-y-6 row-start-2 p-8 rounded-xl shadow-lg border border-gray-50">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold mb-1">Selamat Datang</h1>
          <h2 className="text-lg">SI Peminjaman dan Inventaris</h2>
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

        {/* Display error message if exists - use errorMessage instead of error */}
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Gagal Masuk</AlertTitle>
            <AlertDescription>
              {errorMessage === "CredentialsSignin" 
                ? "Email atau password salah. Silakan coba lagi." 
                : "Terjadi kesalahan saat login. Silakan coba lagi."}
            </AlertDescription>
          </Alert>
        )}

        {/* Email/Password Sign In */}
        <form
          className="space-y-4"
          action={async (formData) => {
            "use server";
            
            try {
              await signIn("credentials", {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                redirect: false,
              });
              
              // Get updated session after sign-in to check role
              const updatedSession = await auth();
              
              // Redirect based on role
              if (updatedSession?.user?.role === "ADMIN") {
                return redirect("/admin");
              } else {
                // Regular users go to home page
                return redirect("/");
              }
            } catch (error) {
              console.error("Authentication error:", error);
              // Redirect with error param
              return redirect("/sign-in?error=CredentialsSignin");
            }
          }}
        >
          <Input
            name="email"
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
            autoComplete="current-password"
          />
          <Button className="w-full" type="submit">
            Masuk
          </Button>
        </form>

        <div className="text-center">
          <Button asChild variant="link">
            <Link href="/sign-up">Tidak memiliki akun? Daftar di sini</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="forgot-password">Lupa Password?</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}