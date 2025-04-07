"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { rentInstrumen } from "@/lib/rent-actions"
import { Katalog} from "./katalog-lab"
import { toast } from "sonner"

const rentFormSchema = z.object({
    purpose: z.string().min(1, "Purpose is required"),
    start_date: z.date(),
    end_date: z.date(),
})

type RentFormValues = z.infer<typeof rentFormSchema>

interface RentInstrumenDialogProps {
  instrumen: Katalog
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  user: {
    id: string;
    email?: string | null;
  } | null;
}

export function RentInstrumenDialog({ 
  instrumen, 
  isOpen, 
  onOpenChange,
  user
}: RentInstrumenDialogProps) 
{
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();
  

  const form = useForm<RentFormValues>({
    resolver: zodResolver(rentFormSchema),
    defaultValues: {
        purpose: "",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 1)),
    },
  })

  async function onSubmit(values: RentFormValues) {
    setIsSubmitting(true)
    
    if (!user) {
      toast.error("You must be logged in to rent instruments")
      setIsSubmitting(false)
      return
    }
    
    try {
      await rentInstrumen({
        instrumen_id: instrumen.instrumen_id,
        purpose: values.purpose,
        start_date: values.start_date,
        end_date: values.end_date,
        user_id: user.id,
        image_url: instrumen.image_url || "", // Ensure image_url is passed correctly
      })
      toast.success("Sukses menggunakan instrumen")
      form.reset()
      onOpenChange(false)
      // Use router.refresh() to refresh the server components
      router.refresh();
    } catch (error) {
      console.error("Failed to rent instrument:", error);
      toast.error("Gagal meminjam instrumen");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gunakan Instrumen</DialogTitle>
          <DialogDescription>
            Isi detail berikut untuk menggunakan instrumen {instrumen.nama_instrumen} ({instrumen.merk_instrumen})
          </DialogDescription>
        </DialogHeader>

        {/* Instrument Image and Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Instrument Image */}
          <div className="relative rounded-md overflow-hidden border h-[160px]">
            {instrumen.image_url ? (
              <Image
                src={instrumen.image_url}
                alt={instrumen.nama_instrumen}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 250px"
                className="bg-gray-50 p-2"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-sm">No image available</span>
              </div>
            )}
          </div>
          
          {/* Instrument Details */}
          <div className="space-y-2">
            <h3 className="font-medium text-base">{instrumen.nama_instrumen}</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-500">Merk:</span> {instrumen.merk_instrumen}</p>
              <p><span className="text-gray-500">Tipe:</span> {instrumen.tipe_instrumen}</p>
              <p><span className="text-gray-500">Layanan:</span> {instrumen.layanan}</p>
              <p>
                <span className="text-gray-500">Status:</span>
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium
                  ${instrumen.status === 'TERSEDIA' ? 'bg-green-100 text-green-800' : 
                  instrumen.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}`}>
                  {instrumen.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-4"></div>

        {!user ? (
          <div className="text-center py-4">
            <p className="text-red-500 mb-2">Anda harus login untuk meminjam instrumen</p>
            <Button asChild>
              <a href="/sign-in">Login</a>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Meminjam sebagai:</h3>
                <p>{user.email}</p>
              </div>
              
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tujuan</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Isi tujuan penggunaan instrumen" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal Mulai</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pilih Tanggal</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal Selesai</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pilih Tanggal</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <= form.getValues("start_date")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Memproses..." : "Gunakan Instrumen"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}