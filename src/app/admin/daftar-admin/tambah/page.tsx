"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import  {createAdmin}  from "@/lib/actions/admin/add-admin-actions"



// Form validation schema
const adminFormSchema = z.object({
  name: z.string().min(1, { message: "Nama  wajib diisi" }),
  email: z.string().min(1, { message: "Email wajib diisi" }),
  password : z.string().min(1, { message: "Password wajib diisi" }),
  role: z.string(),
});

type AddFormValues = z.infer<typeof adminFormSchema>;

export default function CreateAdminPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
 // Initialize form with empty values
   const form = useForm<AddFormValues>({
     resolver: zodResolver(adminFormSchema),
     defaultValues: {
       name: "",
       email: "",
       password: "",
       role:"ADMIN"
     },
   });
 
   async function onSubmit(values: AddFormValues) {
     setIsSubmitting(true);
     
     try {
       await createAdmin(values);
       toast.success("Admin berhasil ditambahkan");
       
       // Navigate back to the tool list
       router.push("/admin/daftar-admin");
       router.refresh();
     } catch (error) {
       console.error("Failed to add admin:", error);
       toast.error("Gagal menambahkan admin");
     } finally {
       setIsSubmitting(false);
     }
   }
  
   return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight mb-6">
          Tambah Admin Baru
        </h2>
        
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Admin</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail Admin</FormLabel>
                      <FormControl>
                        <Input placeholder="Email admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />      
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} />
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