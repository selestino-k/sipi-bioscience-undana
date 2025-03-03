"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogHeader,
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
import { createInstrument } from "@/lib/actions/admin/instrument-actions"
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
const instrumentFormSchema = z.object({
  nama_instrumen: z.string().min(1, { message: "Nama instrumen wajib diisi" }),
  merk_instrumen: z.string().min(1, { message: "Merk instrumen wajib diisi" }),
  tipe_instrumen: z.string().min(1, { message: "Tipe instrumen wajib diisi" }),
  layanan: z.string().min(1, { message: "Layanan wajib diisi" }),
  status: z.string().min(1, { message: "Status wajib diisi" }),
});

type AddFormValues = z.infer<typeof instrumentFormSchema>;

interface AddInstrumentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddInstrumentDialog({
  isOpen,
  onOpenChange,
}: AddInstrumentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form with empty values
  const form = useForm<AddFormValues>({
    resolver: zodResolver(instrumentFormSchema),
    defaultValues: {
      nama_instrumen: "",
      merk_instrumen: "",
      tipe_instrumen: "",
      layanan: "",
      status: "TERSEDIA",
    },
  });

  async function onSubmit(values: AddFormValues) {
    setIsSubmitting(true);
    
    try {
      await createInstrument(values);
      toast.success("Instrumen berhasil ditambahkan");
      onOpenChange(false);
      form.reset();
      
      // Use router.refresh() to refresh the server components
      router.refresh();
    } catch (error) {
      console.error("Failed to add instrument:", error);
      toast.error("Gagal menambahkan instrumen");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambah Instrumen Baru</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nama_instrumen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Instrumen</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama instrumen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="merk_instrumen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merk</FormLabel>
                  <FormControl>
                    <Input placeholder="Merk instrumen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipe_instrumen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe</FormLabel>
                  <FormControl>
                    <Input placeholder="Tipe instrumen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="layanan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Layanan</FormLabel>
                  <FormControl>
                    <Input placeholder="Layanan" {...field} />
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