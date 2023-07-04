import { Box, Card, CardContent, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { borrowApi } from "../constants/utils"
import TimeConverter from "../helpers/TimeConverter"
import BorrowInterface from "../interfaces/borrow"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
  type ChartOptions
} from 'chart.js';
import { Line } from "react-chartjs-2"
import { t } from "i18next"


ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
   Filler
 );

type LineType = ChartOptions<'line'>

const options: LineType = {
   responsive: true,
 
   plugins: {
     filler: {
       propagate: true,
     },
     legend: {
       position: 'top' as const,
     }
     ,
     title: {
       display: true,
       text: 'Borrows Oprations',
     },
 
   },
   scales: {
     x: {
       grid: {
         display: false
       },
       time: {
         unit: "month"
       }
     },
     y: {
 
       grid: {
         display: false,
 
       },
 
 
     }
   }
 }
 


export default function LineChartCard() {

  const [borrows, setBorrows] = useState<BorrowInterface[]>()

  useEffect(() => {
    const getAll = async () => {
      const all = await borrowApi.all()
      setBorrows(all)
    }
    getAll()
  }, [])

  function getDaysInMonthUTC(month: number, year: number) {
    let date = new Date(Date.UTC(year, month, 1));
    let days = [];
    while (date.getUTCMonth() === month) {
      days.push(new Date(date));
      date.setUTCDate(date.getUTCDate() + 1);
    }
    return days;
  }
  const currentDate = new Date()


  const listOfDays = getDaysInMonthUTC(currentDate.getMonth(), currentDate.getFullYear()).map(time => {
    return time.toISOString().slice(0, 10)
  })


  const startDate: string[] | undefined = borrows?.map(borrow => {
    return TimeConverter.toRealTime(borrow.start_date!).toISOString().slice(0, 10)
  }).sort()


  interface Count {
    [key: string]: number
  }



  const preFinalData = startDate?.reduce<Count>(
    (count, item): Count => (count[item] = count[item] + 1 || 1, count), {})

  interface Point {
    x: string
    y: number
  }

  let finalData: Point[] = []

  for (let key in preFinalData) {
    const data: Point = {
      x: key,
      y: preFinalData[key]
    }
    finalData.push(data)
  }








  const [borrowData, setBorrowData] = useState<ChartData<"line", Point[]>>({
    labels: listOfDays,
    datasets: [{
      label: "Borrows Oprations....",
      data: finalData,
      parsing: {
        xAxisKey: 'x',
        yAxisKey: 'y'
      },
      borderColor: '#0E8388',
      backgroundColor: 'rgba(14, 131, 136,.4)',
      pointBorderColor: "transparent",
      pointBorderWidth: 20,
      tension: .4,
      fill: "start",

    }]
  })




  useEffect(() => {

    setBorrowData({
      labels: listOfDays,
      datasets: [{
        label: "Borrows Oprations....",
        data: finalData,
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        },
        borderColor: '#0E8388',
        backgroundColor: 'rgba(14, 131, 136,.4)',
        pointBorderColor: "#2E4F4F",
        pointBorderWidth: 20,
        tension: .4,
        fill: "start",

      }]
    })


  }, [borrows])




  return (
    <Box width={"100%"} height={{
      sm:"440px",
      lg:"auto"
    }} my={2}  >
      <Card elevation={12} sx={{ height: "100%", width: "98%" }}>
        <CardContent>
          <Typography variant='h5' fontWeight={600}>{t('Borrows Statistics')}</Typography>

          <Box sx={{
            width:{
              sm:"800px",
              lg: "1200px"
            },
            height: "602px",
            marginInline: {
              sm:-2,
              lg:4
            }

          }}>
            <Line options={options} data={borrowData} />
          </Box>

        </CardContent>
      </Card>
    </Box>
  )
}
