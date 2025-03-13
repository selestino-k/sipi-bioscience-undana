import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RentInstrumentDialog } from './rent-dialog'
import { useSession } from 'next-auth/react'

export function PinjamButton() {
    const [isRentDialogOpen, setIsRentDialogOpen] = useState(false)
    const { data: session } = useSession() // Add this hook
    console.log("Session in ActionCell:", session);
    // Replace hardcoded user with session data
    const user = session?.user ? {
        id: session.user?.id || "cm7u88hba0000p02of1v28pu4", //hardcoded www@www.com user id
        email: session.user.email || ""
    } : null
    const nama_instrumen = "AAS/SSA"
    return (
        <>
            <Button 
            variant="default" 
            onClick={() => setIsRentDialogOpen(true)}>
                Pinjam
            </Button>
            {user && (
                <RentInstrumentDialog 
                    instrument={nama_instrumen} // error payload instrument
                    isOpen={isRentDialogOpen} 
                    onOpenChange={setIsRentDialogOpen} 
                    user={user}
                />
            )}
        </>
    )
 }
      
