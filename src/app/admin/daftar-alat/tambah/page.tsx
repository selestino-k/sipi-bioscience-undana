"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { createAlat } from "@/lib/actions/admin/alat-actions"
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
  nama_alat: z.string().min(1, { message: "Nama alat wajib diisi" }),
  jumlah_alat: z.string().min(1, { message: "Jumlah alat wajib diisi" }),
  status: z.string().min(1, { message: "Status wajib diisi" }),
});

type AddFormValues = z.infer<typeof alatFormSchema>;

export default function TambahAlatPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form with empty values
  const form = useForm<AddFormValues>({
    resolver: zodResolver(alatFormSchema),
    defaultValues: {
      nama_alat: "",
      jumlah_alat: "",
      status: "TERSEDIA",
    },
  });

  async function onSubmit(values: AddFormValues) {
    setIsSubmitting(true);
    
    try {
      await createAlat(values);
      toast.success("Alat berhasil ditambahkan");
      
      // Navigate back to the tool list
      router.push("/admin/daftar-alat");
      router.refresh();
    } catch (error) {
      console.error("Failed to add tool:", error);
      toast.error("Gagal menambahkan alat");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight mb-6">
          Tambah Instrumen Baru
        </h2>
        
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nama_alat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Alat</FormLabel>
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
                      <FormLabel>Jumlah Alat</FormLabel>
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


