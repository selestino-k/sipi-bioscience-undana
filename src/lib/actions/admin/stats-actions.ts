import prisma  from "@/lib/prisma";

export async function getStats() {
  const instrumenCount = await prisma.instrumen.count();
  const alatCount = await prisma.alat.count();
  const barangCount = await prisma.barang.count();
  const userCount = await prisma.user.count();
  const rentCount = await prisma.rental.count();

  // Get rental data for the last 3 months
  const threemonthsAgo = new Date();
  threemonthsAgo.setMonth(threemonthsAgo.getMonth() - 3);

  const rentalData = await prisma.rental.groupBy({
    by: ['start_date'],
    where: {
      start_date: {
        gte: threemonthsAgo
      }
    },
    _count: {
      id: true
    },
    orderBy: {
      start_date: 'asc'
    }
  });

  // Format data for the chart
  const chartData = rentalData.map(item => ({
    date: item.start_date.toISOString().split('T')[0],
    rents: item._count.id,
  }));

  return {
    instrumenCount,
    rentCount,
    alatCount,
    barangCount,
    userCount,
    chartData
  };
}