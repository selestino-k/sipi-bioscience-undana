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
import { updateBarang } from "@/lib/actions/admin/barang-actions"
import { Barang } from "./columns"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"


// Form validation schema
const barangFormSchema = z.object({
  nama_barang: z.string().min(1, { message: "Nama barang wajib diisi" }),
  merk_barang: z.string().min(1, { message: "Merk barang wajib diisi" }),
  tipe_barang: z.string().min(1, { message: "Tipe barang wajib diisi" }),
  jumlah_barang: z.string().min(1, { message: "Jumlah barang wajib diisi" }),
});

type EditFormValues = z.infer<typeof barangFormSchema>;

interface EditBarangDialogProps {
  barang: Barang;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBarangDialog({
  barang,
  isOpen,
  onOpenChange,
}: EditBarangDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form with the bahant's current values
  const form = useForm<EditFormValues>({
    resolver: zodResolver(barangFormSchema),
    defaultValues: {
      nama_barang: barang.nama_barang,
      merk_barang : barang.merk_barang,
      tipe_barang: barang.tipe_barang,
      jumlah_barang: barang.jumlah_barang.toString(),  
    },
  });

  async function onSubmit(values: EditFormValues) {
    setIsSubmitting(true);
    
    try {
      await updateBarang(barang.barang_id, values);
      toast.success("bahan berhasil diperbarui");
      onOpenChange(false);
      
      // Use router.refresh() to refresh the server components
      router.refresh();
    } catch (error) {
      console.error("Failed to update bahan:", error);
      toast.error("Gagal memperbarui bahan");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
          <DialogTitle>Edit bahan</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Form fields remain the same */}
            <FormField
              control={form.control}
              name="nama_barang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama bahan</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama barang" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipe_barang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe</FormLabel>
                  <FormControl>
                    <Input placeholder="Tipe bahan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jumlah_barang"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah</FormLabel>
                  <FormControl>
                    <Input placeholder="Jumlah barang" {...field} />
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