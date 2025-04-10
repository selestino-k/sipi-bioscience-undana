"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        setError("Email atau password salah. Silakan coba lagi.");
        setIsLoading(false);
        return;
      }
      
      // Refresh to get updated session
      router.refresh();
      
      // Client-side redirection will happen via the server component
      router.push("/");
      
    } catch {
      setError("Terjadi kesalahan saat login. Silakan coba lagi.");
      setIsLoading(false);
    }
  }

  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Gagal Masuk</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
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
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Masuk"}
        </Button>
      </form>

      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/sign-up">Tidak memiliki akun? Daftar di sini</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/forgot-password">Lupa Password?</Link>
        </Button>
      </div>
    </>
  );
}