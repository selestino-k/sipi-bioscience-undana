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
import { updateBahan } from "@/lib/actions/admin/bahan-actions"
import { Bahan } from "./columns"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Form validation schema
const bahanFormSchema = z.object({
  nama_bahan: z.string().min(1, { message: "Nama bahan kimia wajib diisi" }),
  rumus_bahan: z.string().min(1, { message: "Rumus bahan wajib diisi" }),
  volume_bahan: z.string().min(1, { message: "Volume bahan wajib diisi" }),
  jumlah_bahan: z.string().min(1, { message: "Jumlah bahan wajib diisi" }),
  tipe_bahan: z.string().min(1, { message: "Tipe bahan wajib diisi" }),
  status: z.string().min(1, { message: "Status wajib diisi" }),
});

type EditFormValues = z.infer<typeof bahanFormSchema>;

interface EditBahanDialogProps {
  bahan: Bahan;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditBahanDialog({
  bahan,
  isOpen,
  onOpenChange,
}: EditBahanDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form with the bahan's current values
  const form = useForm<EditFormValues>({
    resolver: zodResolver(bahanFormSchema),
    defaultValues: {
      nama_bahan: bahan.nama_bahan,
      rumus_bahan: bahan.rumus_bahan,
      volume_bahan: bahan.volume_bahan,
      jumlah_bahan: bahan.jumlah_bahan,
      tipe_bahan: bahan.tipe_bahan,
      status: bahan.status,
    },
  });

  async function onSubmit(values: EditFormValues) {
    setIsSubmitting(true);
    
    try {
      await updateBahan(bahan.bahan_id, values);
      toast.success("Bahan kimia berhasil diperbarui");
      onOpenChange(false);
      
      // Use router.refresh() to refresh the server components
      router.refresh();
    } catch (error) {
      console.error("Failed to update bahan:", error);
      toast.error("Gagal memperbarui bahan kimia");
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
              name="nama_bahan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama bahan</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama bahan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                  control={form.control}
                  name="rumus_bahan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rumus Kimia</FormLabel>
                      <FormControl>
                        <Input placeholder="Rumus Kimia Bahan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tipe_bahan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipe Bahan Kimia</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Tipe Bahan Kimia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Solid">Solid</SelectItem>
                          <SelectItem value="PO">Pelarut Organik (PO) </SelectItem>
                          <SelectItem value="Asam">Asam</SelectItem>
                          <SelectItem value="Gas">Gas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="volume_bahan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volume Bahan Kimia</FormLabel>
                      <FormControl>
                        <Input placeholder="Volume Bahan Kimia dalam gr atau ml" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jumlah_bahan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Bahan Kimia</FormLabel>
                      <FormControl>
                        <Input placeholder="Jumlah Bahan Kimia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TERSEDIA">TERSEDIA</SelectItem>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="TIDAK TERSEDIA">TIDAK TERSEDIA</SelectItem>
                    <SelectItem value ="EXPIRED">EXPIRED</SelectItem>
                    </SelectContent>
                  </Select>
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