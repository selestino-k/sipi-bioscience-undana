"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createAdmin } from "@/lib/actions/admin-actions";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

export default function CreateAdminPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      await createAdmin({ email, name, password });
      setSuccess(true);
      toast.success("Admin berhasil ditambahkan");
      
      // Clear form after successful submission
      setEmail("");
      setName("");
      setPassword("");
      
      // Optionally redirect back to admin list page after short delay
      setTimeout(() => {
        router.push("/admin/daftar-admin");
      }, 2000);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan saat membuat admin");
      toast.error("Gagal membuat admin");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight mb-6">
          Tambah Admin Baru
        </h2>
        
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Form Tambah Admin</CardTitle>
          </CardHeader>
          <CardContent>
            {success && (
              <Alert className="mb-6" variant="success">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Berhasil</AlertTitle>
                <AlertDescription>
                  Admin berhasil ditambahkan. Anda akan dialihkan kembali ke daftar admin.
                </AlertDescription>
              </Alert>
            )}
            
            {error && (
              <Alert className="mb-6" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Gagal</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                  placeholder="admin@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Nama
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Nama Admin"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                  placeholder="Password minimal 8 karakter"
                  minLength={8}
                />
              </div>
              
              <div className="flex justify-end pt-4 space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Kembali
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Membuat..." : "Buat Admin"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}