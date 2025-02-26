import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RentModal } from "./rent-modal";

export function RentButton({ instrumentId }: { instrumentId: string }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShowModal(true)} variant="outline">
        Pinjam Instrumen
      </Button>
      
      {showModal && (
        <RentModal 
          instrumentId={instrumentId} 
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}