
import {GoogleSignIn} from "@/components/ui/google-signin";
import { LoginForm } from "@/components/ui/login-form";

export default function Login() {
    return (
            <div className="flex items-center justify-center h-screen content-center flex-col gap-4 bg-white p-6 rounded shadow-md w-96"
        >
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                    <GoogleSignIn />
                    <LoginForm />   
            </div>
    );
}