"use client";

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updateUserPassword } from '@/lib/user-actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';


export  function ResetPasswordForm() {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');

  // Check if token and userId are present
  const isValidRequest = !!token && !!userId;

  const handleResetPassword = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;
      
      // Check if token and userId are present
      if (!token || !userId) {
        setError("Link reset password tidak valid. Silakan minta link baru.");
        toast.error("Link reset password tidak valid");
        setIsSubmitting(false);
        return;
      }
      
      // Validate password
      if (!password || password.length < 8) {
        setError("Password harus minimal 8 karakter");
        toast.error("Password harus minimal 8 karakter");
        setIsSubmitting(false);
        return;
      }
      
      // Confirm password match
      if (password !== confirmPassword) {
        setError("Password tidak sama");
        toast.error("Password tidak sama");
        setIsSubmitting(false);
        return;
      }
      
      console.log("Submitting new password for userId:", userId);
      
      // Call API to update password
      // Note: This should also validate the token
      const response = await updateUserPassword(userId, password);
      
      if (response.success) {
        setShowSuccess(true);
        toast.success("Password berhasil diubah");
        
        // Wait 3 seconds before redirecting
        setTimeout(() => {
          router.push("/sign-in");
        }, 3000);
      } else {
        throw new Error(response.error || "Failed to update password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError("Terjadi kesalahan. Link reset password mungkin sudah kadaluarsa.");
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Rest of your component logic
  return (
    <>

      {/* Error or Success Message */}
      {error && !showSuccess && (
        <Alert variant="destructive">
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}
    
    {!isValidRequest && !showSuccess && (
        <Alert variant="destructive">
          <AlertDescription>
            Link reset password tidak valid atau telah kadaluarsa. Silakan minta link baru.
          </AlertDescription>
        </Alert>
      )}
      
      {showSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Password berhasil diubah. Anda akan diarahkan ke halaman login...
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

      {/* Password Reset Form */}
      {isValidRequest && !showSuccess && (
        <>
          <p className="text-center text-muted-foreground mb-6">
            Silakan masukkan password baru Anda
          </p>
          <form
            className="space-y-4"
            action={handleResetPassword}
          >
            <div className="space-y-4">
              <div>
                <Input
                  name="password"
                  placeholder="Password Baru"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  className="cursor-text"
                  style={{ caretColor: 'auto' }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Password minimal 8 karakter
                </p>
              </div>
              
              <Input
                name="confirmPassword"
                placeholder="Konfirmasi Password"
                type="password"
                required
                autoComplete="new-password"
                disabled={isSubmitting}
                className="cursor-text"
                style={{ caretColor: 'auto' }}
              />
            </div>
            
            <Button 
              className="w-full" 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memperbarui..." : "Perbarui Password"}
            </Button>
          </form>
        </>
      )}

      <div className="text-center">
        <Button asChild variant="link" disabled={isSubmitting}>
          <Link href="/sign-in">Kembali ke halaman login</Link>
        </Button>
      </div>
    </>    
  );
}