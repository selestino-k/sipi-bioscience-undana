type Bahan = {
    id_bahan: number
    nama_bahan: string
    tipe_bahan: string
    date: string
    status: 'pending' | 'tersedia';
  };
export const bahan: Bahan[] = [
    {
      id_bahan: 1,
      nama_bahan: 'Aquades',
      tipe_bahan: 'Bahan Kimia',
      status: 'tersedia',
      date: '2022-12-06',
    },
    {
      id_bahan: 2,
      nama_bahan: 'H2SO4',
      tipe_bahan: 'Bahan Kimia',
      status: 'pending',
      date: '2022-11-14',
    },
  ];
   