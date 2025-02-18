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
      layanan: 'I, II, III, VI, IX X',
      status: 'TERSEDIA',
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
