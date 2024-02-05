'use client'
import React from 'react'
// @ts-ignore
import Chart from 'chart.js'

interface IPieChart {
  data: Array<Number>
  labels: Array<string>
  backgroundColor: Array<string>
  borderColor: Array<string>
}

export default function PieChart(props: IPieChart) {
  React.useEffect(() => {
    var config = {
      type: 'pie',
      data: {
        labels: props.labels,
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: props.backgroundColor,
            borderColor: props.borderColor,
            data: props.data,
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        animation: false,
        responsive: true,
        title: {
          display: false,
          text: 'Consumo de memória',
          fontColor: 'white',
        },
        legend: {
          labels: {
            fontColor: 'white',
          },
          align: 'end',
          position: 'bottom',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              display: false,
              scaleLabel: {
                display: false,
                labelString: 'Month',
                fontColor: 'white',
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.3)',
                zeroLineColor: 'rgba(0, 0, 0, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              display: false,
              scaleLabel: {
                display: false,
                labelString: 'Value',
                fontColor: 'white',
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: 'rgba(255, 255, 255, 0.15)',
                zeroLineColor: 'rgba(33, 37, 41, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    }
    // @ts-ignore
    var ctx = document.getElementById('line-chart').getContext('2d')
    // @ts-ignore
    window.myLine = new Chart(ctx, config)
  }, [props])
  return <canvas id='line-chart'></canvas>
}
