
import {GoogleSignIn} from "@/components/ui/google-signin";
import { LoginForm } from "@/components/login-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth();
    if (session) redirect ("/"); 
  return (
    <div className="flex items-center justify-center h-screen content-center flex-col gap-4 bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold text-center">Log In</h2>
      <GoogleSignIn />
      <LoginForm />
    </div>
  );
}
export default Page;