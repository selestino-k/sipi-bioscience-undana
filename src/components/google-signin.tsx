
import { signIn } from "@/lib/auth";
import { Button } from "./ui/button";
import { User } from "lucide-react"


const GoogleSignIn=() =>{
  return (
    <form className="items-center"
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
    <Button variant="default">
      <User/>
      Masuk dengan akun Google anda
    </Button>
    </form>
  )
} 
export {GoogleSignIn};