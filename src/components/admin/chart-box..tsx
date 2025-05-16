"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  rents: {
    label: "Peminjaman",
    color: "hsl(var(--primary))",
    
  },
} satisfies ChartConfig

interface ChartBoxProps {
    instrumenCount: number;
    rentCount: number;
    barangCount: number;
    alatCount: number;
    userCount: number;
    chartData: Array<{
    date: string;
    rents: number;
  }>;
}

export function ChartBox({ instrumenCount, rentCount, barangCount, alatCount, userCount, chartData }: ChartBoxProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Statistik Laboratorium</CardTitle>
          <CardDescription>
            Menunjukkan grafik peminjaman instrumen laboratorium dalam rentang waktu
          </CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-l px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Total Peminjaman
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {rentCount}
            </span>
          </div>
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Total Instrumen
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {instrumenCount}
            </span>
          </div>
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Total <br></br>Barang
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {barangCount}
            </span>
          </div>
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Total <br></br>Alat
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {alatCount}
            </span>
          </div>
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Jumlah Pengguna
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {userCount}
            </span>
          </div>
          
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="rents"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("id-ID", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar 
              dataKey="rents" 
              fill="hsl(var(--primary))"
              name="Peminjaman" 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
