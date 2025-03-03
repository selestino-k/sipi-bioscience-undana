"use client"

import { useState } from "react"
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
import { rentInstrument } from "@/lib/actions"
import { Instrumen } from "./columns"
import { toast } from "sonner"

const rentFormSchema = z.object({
    purpose: z.string().min(1, "Purpose is required"),
    start_date: z.date(),
    end_date: z.date(),
})

type RentFormValues = z.infer<typeof rentFormSchema>

interface RentInstrumentDialogProps {
  instrument: Instrumen
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  user: {
    id: string;
    email?: string | null;
  } | null;
}

export function RentInstrumentDialog({ 
  instrument, 
  isOpen, 
  onOpenChange,
  user
}: RentInstrumentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RentFormValues>({
    resolver: zodResolver(rentFormSchema),
    defaultValues: {
        purpose: "",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 7)),
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
      await rentInstrument({
        instrument_id: instrument.instrument_id,
        purpose: values.purpose,
        start_date: values.start_date,
        end_date: values.end_date,
        user_id: user.id,
      })
      toast.success("Sukses menggunakan instrumen")
      form.reset()
      onOpenChange(false)
      // Refresh the table data or page
      window.location.reload()
    } catch (error) {
      toast.error("Gagal menggunakan instrumen")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  console.log("User in RentDialog:", user);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Gunakan Instrumen</DialogTitle>
          <DialogDescription>
            Isi detail berikut untuk menggunakan instrumen {instrument.nama_instrumen} ({instrument.merk_instrumen})
          </DialogDescription>
        </DialogHeader>

        {!user ? (
          <div className="text-center py-4">
            <p className="text-red-500 mb-2">You must be logged in to rent instruments</p>
            <Button asChild>
              <a href="/sign-in">Sign In</a>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2">Renting as:</h3>
                <p>{user.email}</p>

                
              </div>
              
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose</FormLabel>
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