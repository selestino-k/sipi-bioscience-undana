"use client"

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { rental, user, instrumen } from '@prisma/client';

// Define the type for rental with relations
interface RentalWithRelations extends rental {
  user?: user | null;
  instrumen?: instrumen | null;
}

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
  col1: { width: '10%' }, // ID
  col2: { width: '15%' }, // User
  col3: { width: '15%' }, // Instrument
  col4: { width: '15%' }, // Start Date
  col5: { width: '15%' }, // End Date
  col6: { width: '15%' }, // Status
  col7: { width: '15%' }, // Updated At
});

function transformRental(rental: RentalWithRelations) {
  return {
    id: rental.id.toString(),
    userName: rental.user?.name || 'N/A',
    userEmail: rental.user?.email || 'N/A',
    instrumentName: rental.instrumen?.nama_instrumen || 'N/A',
    instrumentMerk: rental.instrumen?.merk_instrumen || 'N/A',
    instrumentTipe: rental.instrumen?.tipe_instrumen || 'N/A',
    startDate: rental.start_date 
      ? new Date(rental.start_date).toLocaleDateString('id-ID')
      : 'N/A',
    endDate: rental.end_date
      ? new Date(rental.end_date).toLocaleDateString('id-ID')
      : 'N/A',
    status: rental.status || 'N/A',
    updatedAt: rental.updatedAt
      ? new Date(rental.updatedAt).toLocaleTimeString('id-ID', 
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }
        )
      : 'N/A',
  };
}

interface RentalPDFProps {
  data: RentalWithRelations[];
}

export const RentalPDF = ({ data }: RentalPDFProps) => {
  const transformedData = data.map(transformRental);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Daftar Peminjaman Instrumen Laboratorium</Text>
        
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.col1]}>ID</Text>
          <Text style={[styles.tableCell, styles.col2]}>Peminjam</Text>
          <Text style={[styles.tableCell, styles.col3]}>Instrumen</Text>
          <Text style={[styles.tableCell, styles.col4]}>Tanggal Mulai</Text>
          <Text style={[styles.tableCell, styles.col5]}>Tanggal Selesai</Text>
          <Text style={[styles.tableCell, styles.col6]}>Status</Text>
          <Text style={[styles.tableCell, styles.col7]}>Tanggal Pengembalian</Text>
        </View>

        {transformedData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.col1]}>{item.id}</Text>
            <Text style={[styles.tableCell, styles.col2]}>{item.userName} ({item.userEmail})</Text>
            <Text style={[styles.tableCell, styles.col3]}>{item.instrumentName} ({item.instrumentMerk} {item.instrumentTipe})</Text>
            <Text style={[styles.tableCell, styles.col4]}>{item.startDate}</Text>
            <Text style={[styles.tableCell, styles.col5]}>{item.endDate}</Text>
            <Text style={[styles.tableCell, styles.col6]}>{item.status}</Text>
            <Text style={[styles.tableCell, styles.col7]}>{item.updatedAt}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};