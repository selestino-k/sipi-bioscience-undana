"use client"

import { createUserWithHashedPassword } from "@/lib/user-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      // Validate inputs client-side first
      if (!email || !password) {
        setError("Email and password are required");
        toast.error("Email and password are required");
        setIsSubmitting(false);
        return;
      }
      
      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        toast.error("Password must be at least 8 characters");
        setIsSubmitting(false);
        return;
      }
      
      console.log("Submitting sign-up form with email:", email);
      
      const userData = {
        email,
        password,
        name: email.split('@')[0], // Use part of email as name
        role: "USER"
      };
      
      const res = await createUserWithHashedPassword(userData);
      console.log("Sign-up response:", res);
      
      if (res.success) {
        setShowSuccess(true);
        toast.success("Pendaftaran berhasil! Redirecting ke halaman login...");
        
        // Wait 2 seconds before redirecting to show the success message
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      } else {
        setError(res.error || "Gagal mendaftar. Silakan coba lagi.");
        toast.error(res.error || "Gagal mendaftar. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setError("Terjadi kesalahan. Silakan coba lagi.");
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-sm mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">Daftar</h1>
        
        {showSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Pendaftaran berhasil! Kembali ke halaman login...
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Atau daftar dengan Email dan Password
            </span>
          </div>
        </div>

        {/* Email/Password Sign Up */}
        <form
          className="space-y-4"
          action={handleSignUp}
        >
          <Input
            name="email"
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
            disabled={isSubmitting || showSuccess}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            disabled={isSubmitting || showSuccess}
          />
          <Button 
            className="w-full" 
            type="submit" 
            disabled={isSubmitting || showSuccess}
          >
            {isSubmitting ? "Mendaftar..." : "Daftar"}
          </Button>
        </form>

        <div className="text-center">
          <Button asChild variant="link" disabled={isSubmitting}>
            <Link href="/sign-in">Telah memiliki akun? Masuk di sini</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Page;