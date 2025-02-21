"use client"

import { Button } from "./ui/button"
import {signOut} from "next-auth/react";
 
const SignOut = () => {
    const handleSignOut = async () => {
        await signOut(); 
    };
    return (
        <div className="flex justify-center">
            <Button variant="destructive" onClick={handleSignOut}>Log Out</Button>
        </div>
    );
};
export {SignOut};
// Compare this snippet from src/components/ui/sign-out.tsx: