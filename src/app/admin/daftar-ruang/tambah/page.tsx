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
import { createRuang } from "@/lib/actions/admin/ruang-actions"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"


// Form validation schema
const alatFormSchema = z.object({
  nama_ruang: z.string().min(1, { message: "Nama Ruang wajib diisi" }),
  ruang_desc: z.string().min(1, { message: "Deskripsi Ruang wajib diisi" }),
  
});

type AddFormValues = z.infer<typeof alatFormSchema>;

export default function TambahAlatPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form with empty values
  const form = useForm<AddFormValues>({
    resolver: zodResolver(alatFormSchema),
    defaultValues: {
      nama_ruang: "",
      ruang_desc: "",
    },
  });

  async function onSubmit(values: AddFormValues) {
    setIsSubmitting(true);
    
    try {
      await createRuang(values);
      toast.success("Ruangan berhasil ditambahkan");
      
      // Navigate back to the tool list
      router.push("/admin/daftar-ruang");
      router.refresh();
    } catch (error) {
      console.error("Failed to add room:", error);
      toast.error("Gagal menambahkan Ruang");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="grid w-full grid-rows-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-3 row-start-1 items-center sm:items-start">
        <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight mb-6">
          Tambah Ruangan Laboratorium Baru
        </h2>
        
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nama_ruang"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Ruang</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Ruangan Lab" {...field} />
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
                      <FormLabel>Deskripsi Ruangan Lab</FormLabel>
                      <FormControl>
                        <Input placeholder="Deskripsi Ruangan" {...field} />
                      </FormControl>
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


