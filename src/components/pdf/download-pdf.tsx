"use client"

import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { ReactElement, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import PDFDownloadLink with no SSR
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
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

  // Use useEffect to mark component as client-side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show nothing until client-side
  if (!isClient) return null

  return (
    <PDFDownloadLink 
      document={<PDFDocument data={data} />}
      fileName={`${filename}-${new Date().toLocaleDateString()}.pdf`}
    >
      {({ loading }) => (
        <Button disabled={loading} variant="secondary">
          <FileDown className="mr-2 h-4 w-4" />
          {loading ? "Generating PDF..." : label}
        </Button>
      )}
    </PDFDownloadLink>
  )
}