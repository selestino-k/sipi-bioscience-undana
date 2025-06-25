"use client"

import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { ReactElement } from 'react'
import { PDFDownloadLink as ReactPDFDownloadLink } from '@react-pdf/renderer'

interface PDFDownloadButtonProps<T> {
  data: T[]
  PDFDocument: (props: { data: T[] }) => ReactElement
  filename: string
  label?: string
}

export function PDFDownloadButton<T>({ 
  data, 
  PDFDocument, 
  filename,
  label,
}: PDFDownloadButtonProps<T>) {
  return (
    <ReactPDFDownloadLink 
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
    </ReactPDFDownloadLink>
  )
}