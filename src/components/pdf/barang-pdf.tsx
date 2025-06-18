"use client"

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { barang } from '@prisma/client';

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

interface BarangPDFProps {
  data: barang[];
}

export const BarangPDF = ({ data }: BarangPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Daftar Barang Inventaris</Text>
      
      
      <View style={[styles.tableRow, styles.tableHeader]}>
        <Text style={[styles.tableCell, styles.col1]}>ID</Text>
        <Text style={[styles.tableCell, styles.col2]}>Merk Barang</Text>
        <Text style={[styles.tableCell, styles.col2]}>Nama Barang</Text>
        <Text style={[styles.tableCell, styles.col3]}>Tipe Barang</Text>
        <Text style={[styles.tableCell, styles.col3]}>Jumlah</Text>
      </View>

      {data.map((item) => (
        <View key={item.barang_id} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.col1]}>{item.barang_id}</Text>
            <Text style={[styles.tableCell, styles.col2]}>{item.merk_barang}</Text>
            <Text style={[styles.tableCell, styles.col2]}>{item.nama_barang}</Text>
            <Text style={[styles.tableCell, styles.col3]}>{item.tipe_barang}</Text>
            <Text style={[styles.tableCell, styles.col3]}>{item.jumlah_barang}</Text>
        </View>
      ))}
    </Page>
  </Document>
);