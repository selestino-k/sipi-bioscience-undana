type Barang = {
    id_barang: number
    merk_barang: string
    nama_barang: string
    tipe_barang: string
    date: string
  };
export const barang: Barang[] = [
    {
      id_barang: 1,
      nama_barang: 'EPSON L3110',
      merk_barang: 'EPSON',
      tipe_barang: 'Printer',
      date: '2025-14-02',
    },
    {
      id_barang: 2,
      nama_barang: 'Panasonic R32',
      merk_barang: 'Panasonic',
      tipe_barang: 'Air Conditioner',
      date: '2025-12-02',
    },
    {
      id_barang: 3,
      nama_barang: 'EPSON Projector',
      merk_barang: 'EPSON',
      tipe_barang: 'LCD Projector',
      date: '2025-09-02',
    }
    // ...
  ];
   