"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { createBahan} from "@/lib/actions/admin/bahan-actions"
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
  rumus_bahan: z.string().min(1, { message: "Tipe bahan kimia wajib diisi" }),
  tipe_bahan: z.string().min(1, { message: "Tipe bahan kimia wajib diisi" }),
  jumlah_bahan: z.string().min(1, { message: "Jumlah bahan kimia tidak boleh kosong" }),
  status: z.string().min(1, { message: "Status wajib diisi" }),
});

type AddFormValues = z.infer<typeof bahanFormSchema>;

export default function TambahBahanPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form with empty values
  const form = useForm<AddFormValues>({
    resolver: zodResolver(bahanFormSchema),
    defaultValues: {
      nama_bahan: "",
      rumus_bahan: "",
      tipe_bahan: "",
      jumlah_bahan: "",
      status: "TERSEDIA",
    },
  });

  async function onSubmit(values: AddFormValues) {
    setIsSubmitting(true);
    
    try {
      await createBahan(values);
      toast.success("Bahan Kimia berhasil ditambahkan");
      
      router.push("/admin/daftar-bahan");
      router.refresh();
    } catch (error) {
      console.error("Failed to add material:", error);
      toast.error("Gagal menambahkan Bahan Kimia");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="grid w-full grid-rows-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-3 row-start-1 items-center sm:items-start">
        <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight mb-6">
          Tambah Bahan Kimia Baru
        </h2>
        
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nama_bahan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Bahan Kimia</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Bahan" {...field} />
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
                          <SelectItem value="Padat">Padat</SelectItem>
                          <SelectItem value="Cair">Cair</SelectItem>
                          <SelectItem value="Gas">Gas</SelectItem>
                        </SelectContent>
                      </Select>
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
                        <Input placeholder="Jumlah Bahan Kimia dalam gr atau ml" {...field} />
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
                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => router.back()} 
                    disabled={isSubmitting}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Menyimpan..." : "Simpan"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}


