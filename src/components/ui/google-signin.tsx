
import { signIn } from "@/lib/auth";
import { Button } from "./button"


const GoogleSignIn=() =>{
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
    <Button variant="secondary" >
      Continue with Google
    </Button>
    </form>
  )
} 
export {GoogleSignIn};