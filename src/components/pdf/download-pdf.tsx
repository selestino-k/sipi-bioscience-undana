"use client"

import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { ReactElement, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import PDFDownloadLink as ESM module
const PDFDownloadLink = dynamic(
  async () => {
    const mod = await import('@react-pdf/renderer')
    return mod.PDFDownloadLink
  },
  { 
    ssr: false,
    loading: () => (
      <Button variant="secondary" disabled>
        <FileDown className="mr-2 h-4 w-4" />
        Membuat laporan PDF...
      </Button>
    )
  }
)

interface DownloadPDFButtonProps<T> {
  data: T[]
  PDFDocument: (props: { data: T[] }) => ReactElement
  filename: string
  label?: string
}

export function DownloadPDFButton<T>({ 
  data, 
  PDFDocument, 
  filename,
  label = "Download PDF" 
}: DownloadPDFButtonProps<T>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <PDFDownloadLink 
      document={<PDFDocument data={data} />}
      fileName={`${filename}-${new Date().toLocaleDateString('id-ID')}.pdf`}
    >
      {({ loading, error }) => (
        <Button 
          disabled={loading} 
          variant="secondary"
          className={error ? "text-destructive" : ""}
        >
          <FileDown className="mr-2 h-4 w-4" />
          {loading ? "Generating PDF..." : 
           error ? "Error generating PDF" : 
           label}
        </Button>
      )}
    </PDFDownloadLink>
  )
}