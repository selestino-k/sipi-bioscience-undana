"use client"

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { alat } from '@prisma/client';

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

interface AlatPDFProps {
  data: alat[];
}

export const AlatPDF = ({ data }: AlatPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Daftar Alat Laboratorium</Text>
      
      
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={[styles.tableCell, styles.col1]}>ID</Text>
        <Text style={[styles.tableCell, styles.col2]}>Nama Alat</Text>
        <Text style={[styles.tableCell, styles.col3]}>Jumlah</Text>
        <Text style={[styles.tableCell, styles.col4]}>Status</Text>
      </View>

      {data.map((item) => (
        <View key={item.alat_id} style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.col1]}>{item.alat_id}</Text>
          <Text style={[styles.tableCell, styles.col2]}>{item.nama_alat}</Text>
          <Text style={[styles.tableCell, styles.col3]}>{item.jumlah_alat}</Text>
          <Text style={[styles.tableCell, styles.col4]}>{item.status}</Text>
        </View>
      ))}
    </Page>
  </Document>
);