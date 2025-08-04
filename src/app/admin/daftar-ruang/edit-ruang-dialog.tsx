"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { updateRuang } from "@/lib/actions/admin/ruang-actions"
import { Ruang } from "./columns"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"


// Form validation schema
const ruangFormSchema = z.object({
  nama_ruang: z.string().min(1, { message: "Nama ruangan  lab wajib diisi" }),
  ruang_desc: z.string().min(1, { message: "Deskripsi dari ruangan lab wajib diisi" }),
});

type EditFormValues = z.infer<typeof ruangFormSchema>;

interface EditRuangDialogProps {
  ruang: Ruang;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditRuangDialog({
  ruang,
  isOpen,
  onOpenChange,
}: EditRuangDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form with the alatt's current values
  const form = useForm<EditFormValues>({
    resolver: zodResolver(ruangFormSchema),
    defaultValues: {
      nama_ruang: ruang.nama_ruang,
      ruang_desc: ruang.ruang_desc || "", // Handle optional description
    },
  });

  async function onSubmit(values: EditFormValues) {
    setIsSubmitting(true);
    
    try {
      await updateRuang(ruang.ruang_id, values);
      toast.success("ruang berhasil diperbarui");
      onOpenChange(false);
      
      // Use router.refresh() to refresh the server components
      router.refresh();
    } catch (error) {
      console.error("Failed to update room:", error);
      toast.error("Gagal memperbarui ruang");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle>Edit Ruang</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Form fields remain the same */}
            <FormField
              control={form.control}
              name="nama_ruang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Ruang</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama ruang" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ruang_desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi Ruang</FormLabel>
                  <FormControl>
                    <Input placeholder="Deskripsi Ruang" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}