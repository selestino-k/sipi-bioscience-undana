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
import { updateUser } from "@/lib/user-actions"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { User } from "next-auth"

const userFormSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().optional(),
  role: z.enum(["USER", "ADMIN"], {
    errorMap: () => ({ message: "Role tidak valid" }),
  }),
})

type UpdateFormValues = z.infer<typeof userFormSchema>

interface UpdateUserFormProps {
  user: User
}

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: "USER",
    },
  })

  async function onSubmit(values: UpdateFormValues) {
    setIsSubmitting(true)
    
    try {
      const updatedValues = {
        ...values,
        id: user.id || "",
      }

      const dataToUpdate = values.password?.trim()
        ? updatedValues 
        : { 
            id: updatedValues.id,
            name: updatedValues.name,
            email: updatedValues.email,
            role: updatedValues.role,
          }
      
      await updateUser(dataToUpdate)
      toast.success("Profil berhasil diperbarui")
      router.refresh()
    } catch (error) {
      console.error("Failed to update user:", error)
      toast.error(`Gagal memperbarui profil: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="text-sm text-gray-500 mb-4">
          Perbarui informasi profil dan kata sandi Anda
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Pengguna" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
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
                  <FormLabel>Password Baru (kosongkan jika tidak ingin mengubah)</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="Kosongkan jika tidak ingin mengubah" 
                      {...field} 
                    />
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
  )
}