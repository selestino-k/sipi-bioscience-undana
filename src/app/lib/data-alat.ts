type Alat = {
    id_alat: number
    merk_alat: string
    nama_alat: string
    tipe_alat: string
    layanan: string
    date: string
    status: 'pending' | 'tersedia';
  };
export const alat: Alat[] = [
    {
      id_alat: 1,
      nama_alat: 'Autoclave',
      merk_alat: 'Yamato',
      tipe_alat: 'SN310',
      layanan: 'VII, VIII, X',
      status: 'pending',
      date: '2022-12-06',
    },
    {
      id_alat: 2,
      nama_alat: 'Fluorescence Mircroscope',
      merk_alat: 'Zeiss',
      tipe_alat: 'Axio Imager.M1',
      layanan: 'I, II, III, IV, V, VI, VII, IX, X',
      status: 'tersedia',
      date: '2022-11-14',
    },
    // ...
  ];
   