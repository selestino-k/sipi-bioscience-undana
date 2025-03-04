import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";
import { GoogleSignIn } from "@/components/google-signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertCircle } from "lucide-react"; // Import AlertCircle icon
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"; // Import Alert components

const Page = async ({
  searchParams,
}: {
  searchParams: { error?: string };
}) => {
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
  
  // Get error from search params
  const error = searchParams.error;
  
  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-sm mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">Masuk</h1>
        <span className="flex flex-col items-center"><GoogleSignIn /></span>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
             Atau masuk dengan Email dan Password
            </span>
          </div>
        </div>

        {/* Display error message if exists */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Gagal Masuk</AlertTitle>
            <AlertDescription>
              {error === "CredentialsSignin" 
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
              const result = await signIn("credentials", {
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
        </div>
      </main>
    </div>
  );
};

export default Page;