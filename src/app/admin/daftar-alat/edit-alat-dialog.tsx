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
import { updateAlat } from "@/lib/actions/admin/alat-actions"
import { Alat } from "./columns"
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
const alatFormSchema = z.object({
  nama_alat: z.string().min(1, { message: "Nama alat lab wajib diisi" }),
  jumlah_alat: z.string().min(1, { message: "Tipe alat labwajib diisi" }),
  status: z.string().min(1, { message: "Status wajib diisi" }),
});

type EditFormValues = z.infer<typeof alatFormSchema>;

interface EditAlatDialogProps {
  alat: Alat;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditAlatDialog({
  alat,
  isOpen,
  onOpenChange,
}: EditAlatDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form with the alatt's current values
  const form = useForm<EditFormValues>({
    resolver: zodResolver(alatFormSchema),
    defaultValues: {
      nama_alat: alat.nama_alat,
      jumlah_alat: alat.jumlah_alat,
      status: alat.status,
    },
  });

  async function onSubmit(values: EditFormValues) {
    setIsSubmitting(true);
    
    try {
      await updateAlat(alat.alat_id, values);
      toast.success("alat berhasil diperbarui");
      onOpenChange(false);
      
      // Use router.refresh() to refresh the server components
      router.refresh();
    } catch (error) {
      console.error("Failed to update alat:", error);
      toast.error("Gagal memperbarui alat");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle>Edit alat</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Form fields remain the same */}
            <FormField
              control={form.control}
              name="nama_alat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama alat</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama alat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jumlah_alat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah</FormLabel>
                  <FormControl>
                    <Input placeholder="Jumlah alat" {...field} />
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