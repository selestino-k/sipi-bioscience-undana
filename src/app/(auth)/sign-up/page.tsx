"use client"

import { signUp } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (formData: FormData) => {
    setIsSubmitting(true);
    
    try {
      const res = await signUp(formData);
      
      if (res.success) {
        setShowSuccess(true);
        toast.success("Pendaftaran berhasil! Redirecting ke halaman login...");
        
        // Wait 2 seconds before redirecting to show the success message
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      } else {
        toast.error(res.error || "Gagal mendaftar. Silakan coba lagi.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      console.error(error);
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