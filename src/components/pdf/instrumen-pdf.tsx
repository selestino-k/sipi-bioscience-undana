"use client"

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { instrumen } from '@prisma/client';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  table: {
    width: 'auto',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    minHeight: 30,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
  },
  col1: { width: '15%' },
  col2: { width: '25%' },
  col3: { width: '20%' },
  col4: { width: '20%' },
  col5: { width: '20%' },
});

interface InstrumenPDFProps {
  data: instrumen[];
}

export const InstrumenPDF = ({ data }: InstrumenPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Daftar Instrumen Laboratorium</Text>
      
      
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={[styles.tableCell, styles.col1]}>ID</Text>
        <Text style={[styles.tableCell, styles.col2]}>Nama Instrumen</Text>
        <Text style={[styles.tableCell, styles.col3]}>Merk</Text>
        <Text style={[styles.tableCell, styles.col4]}>Tipe</Text>
        <Text style={[styles.tableCell, styles.col5]}>Status</Text>
      </View>

      {data.map((item) => (
        <View key={item.instrumen_id} style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.col1]}>{item.instrumen_id}</Text>
          <Text style={[styles.tableCell, styles.col2]}>{item.nama_instrumen}</Text>
          <Text style={[styles.tableCell, styles.col3]}>{item.merk_instrumen}</Text>
          <Text style={[styles.tableCell, styles.col4]}>{item.tipe_instrumen}</Text>
          <Text style={[styles.tableCell, styles.col5]}>{item.status}</Text>
        </View>
      ))}
    </Page>
  </Document>
);