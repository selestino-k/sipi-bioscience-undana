import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main (){
  
  await prisma.instrumen.createMany({
    data:[
      {
        nama_instrumen: 'Spektrofotometer UV-VIS',
        merk_instrumen: 'PG Instruments',
        tipe_instrumen: 'T92',
        layanan: 'I, II, III, IV, V, VI, VII, VIII, IX, X',
        status: 'PENDING',
      },
      {
        nama_instrumen: 'AAS/SSA',
        merk_instrumen: 'Agilent Technologies',
        tipe_instrumen: '240FS AA',
        layanan: 'I, II, III, VI, IX, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'AAS/SSA',
        merk_instrumen: 'PG Instruments',
        tipe_instrumen: 'AA 500',
        layanan: 'I, II, III, VI, IX, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Bom Kalorimeter',
        merk_instrumen: 'Toshniwal',
        tipe_instrumen: 'DT 100',
        layanan: 'I, III, VI, IX X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Spektofotometer Fluoresens',
        merk_instrumen: 'Agilent Technologies',
        tipe_instrumen: 'Cary Eclipse',
        layanan: 'I, ,IV, V, VI, VII, VIII, IX, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Spektrofotometer UV-VIS',
        merk_instrumen: 'PG Instruments',
        tipe_instrumen: 'T60',
        layanan: ' I, II, III, IV, V, VI, VII, VIII, IX',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'High Performance Liquid Chromatography (HPLC)',
        merk_instrumen: 'Agilent Technologies',
        tipe_instrumen: '1260 Infinity II LC',
        layanan: ' I, II, III, IV, V, VI, VII, VIII, IX',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Dissolution Tester',
        merk_instrumen: 'Electrolab',
        tipe_instrumen: 'TDT 08L',
        layanan: 'I, IV, V, VI,',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Real Time PCR',
        merk_instrumen: 'Qiagen',
        tipe_instrumen: 'Rotor-Gene Q',
        layanan: 'VII, VIII',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Genetic Analysis System',
        merk_instrumen: 'GenomeLab',
        tipe_instrumen: 'GeXP',
        layanan: 'VII, VIII',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Capillary Electrophoresis System',
        merk_instrumen: 'Beckman Coulter',
        tipe_instrumen: 'P/ACE MDQ ',
        layanan: 'VII, VIII',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Vacuum Rotary Evaporator 10L',
        merk_instrumen: 'Eyela',
        tipe_instrumen: 'N-3010',
        layanan: 'I, III, IV, V, VI, IX',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Vacuum Rotary Evaporator 5L',
        merk_instrumen: 'Eyela',
        tipe_instrumen: 'OSB-2100',
        layanan: 'I, III, IV, V, VI, IX',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Cold Trap',
        merk_instrumen: 'Eyela',
        tipe_instrumen: 'UT-2000',
        layanan: 'I, II, III, IV, V, VI, VII, VIII, IX, X',
        status: 'TERSEDIA', 
      },
      {
        nama_instrumen: 'Centrifuge',
        merk_instrumen: 'Beckman Coulter',
        tipe_instrumen: 'Allegra X-30R',
        layanan: 'I, II, III, IV, V, VI, VII, VIII, IX, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Coulter Microfuge',
        merk_instrumen: 'Beckman Coulter',
        tipe_instrumen: 'Microfuge 22R',
        layanan: 'I, II, III, IV, V, VI, VII, VIII, IX, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Flame Photometer',
        merk_instrumen: 'BWB Technologies',
        tipe_instrumen: 'BWB-XP',
        layanan: 'I, II, IV, VI, IX',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Laminar Air Flow',
        merk_instrumen: 'Jisico',
        tipe_instrumen: 'Glea Apparatus',
        layanan: 'VII, VIII, IX',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Scanning Electron Microscope',
        merk_instrumen: 'Hitachi',
        tipe_instrumen: 'TM-3000',
        layanan: 'I, III, IV, V, VI, IX, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Fluorescence Microscope',
        merk_instrumen: 'Zeiss',
        tipe_instrumen: 'Axio Imager',
        layanan: 'I, II, III, IV, V, VI, IX, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Autoclave',
        merk_instrumen: 'Yamato',
        tipe_instrumen: 'SN-310C',
        layanan: 'VII, VIII, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Drying Oven',
        merk_instrumen: 'Yamato',
        tipe_instrumen: 'DX-402C, IC402C',
        layanan: 'I, II, III, IV, V, VI, VII, VIII, IX, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Automated Synthesis System',
        merk_instrumen: 'Syrris',
        tipe_instrumen: 'Asia',
        layanan: 'VI, IX',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Stuart Flocculation Jar Tester',
        merk_instrumen: 'Wise Laboratory Instruments',
        tipe_instrumen: 'WiseStir',
        layanan: 'I, IV, V, VI, VII, IX',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Planetary Micro Mill',
        merk_instrumen: 'Fritsch',
        tipe_instrumen: 'Premium Line',
        layanan: 'I, III, IV, V, VI, IX',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Rotacool Mini & Unit Destilasi',
        merk_instrumen: 'Heidolph',
        tipe_instrumen: 'S4',
        layanan: 'I, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Kejidahl System',
        merk_instrumen: 'Gerhardt',
        tipe_instrumen: 'Vapodest 200',
        layanan: 'I, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Block Manual Digestion System',
        merk_instrumen: 'Gerhardt',
        tipe_instrumen: '-',
        layanan: 'I, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Spektrofotometer UV-VIS',
        merk_instrumen: 'Agilent Technologies',
        tipe_instrumen: 'Cary 100',
        layanan: 'I, II, III, IV, V, VI, VII, VIII, IX, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Deep Freezer',
        merk_instrumen: 'Kaltis',
        tipe_instrumen: '499',
        layanan: 'VII, VIII, X',
        status: 'TERSEDIA',
      },
      {
        nama_instrumen: 'Liquid Nitrogen Production System',
        merk_instrumen: '-',
        tipe_instrumen: '-',
        layanan: 'VI, VII, VIII, IX',
        status: 'PENDING',
      },
        
      
      
    ]
  })

  const allInstruments = await prisma.instrumen.findMany({
    select:{
      nama_instrumen: true,
      merk_instrumen: true,
      tipe_instrumen: true,
      layanan: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }
   ,
  });
  console.dir(allInstruments, { depth: null })
  console.log(allInstruments)

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
