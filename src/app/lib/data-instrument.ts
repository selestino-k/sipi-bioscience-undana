type Instrumen = {
    id_instrumen: number
    merk_instrumen: string
    nama_instrumen: string
    tipe_instrumen: string
    layanan: string
    date: string
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    status: 'pending' | 'operational';
  };
export const instruments: Instrumen[] = [
    {
      id_instrumen: 1,
      nama_instrumen: 'Spektrofotometer UV-VIS',
      merk_instrumen: 'PG Instruments',
      tipe_instrumen: 'T92',
      layanan: 'I, II, III, IV, V, VI, VII, VIII, IX, X',
      status: 'pending',
      date: '2022-12-06',
    },
    {
      id_instrumen: 2,
      nama_instrumen: 'AAS/SSA',
      merk_instrumen: 'Agilent Technologies',
      tipe_instrumen: '240FS AA',
      layanan: 'I, II, III, VI, IX X',
      status: 'operational',
      date: '2022-11-14',
    },
    // ...
  ];
   