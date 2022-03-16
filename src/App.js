import './App.css';

import {Doughnut, Line} from "react-chartjs-2";
import 'chart.js/auto';
import { useState } from 'react';

const chartTypes = {
  'line': Line,
  'doughnut': Doughnut
}



const CustomChart = (props) =>{

  const {data, type, displayLegend, format} = props;

  const Chart = chartTypes[type];

  const chartOptions = {
    plugins:{
      legend: {
        display: displayLegend
      },
      tooltip:{
        callbacks:{
          label: function(item){
            const {label, formattedValue} = item;
            const finalValue = format === "percent" ? `${formattedValue}%` : formattedValue
            return `${label}-2022: ${finalValue}`
          }
        }
      }
    }
  }
  return (
    <Chart data={data} options={chartOptions}/>
  )
}


const chartColors = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'red',
        'purple',
        'yellow',
        "black",
        "green",
        "pink"
          ]



export const Dashboard = () =>{

  const [visitorData, setVisitorData] = useState(
    {
      2020:{
        "January": 10,
        "February": 20,
        "March": 40,
        "April": 50,
        "May": 100,
        "June": 200,
        "July": 900
      },
      2021:{
        "January": 10,
        "February": 20,
        "March": 40,
        "April": 50,
        "May": 100,
        "June": 200,
        "July": 900
      },
      2022: {
        "January": 500,
        "February": 20,
        "March": 40,
        "April": 50,
        "May": 100,
        "June": 200,
        "July": 900
      },
    }
  )

  const [likesData, setLikesData] = useState({
    "January": 10,
    "February": 30,
    "March": 20,
    "April": 40
  })

  // fetch('/backend/visitorData').then(response =>{
  //   setVisitorData(response)
  // })

    // fetch('/backend/likesData').then(response =>{
  //   setLikesData(response)
  // })

  const prepareVisitorData = () =>{

    const chartData = {
      labels: Object.keys(visitorData),
      datasets: [{
        label: 'Monthly Visits to Website',
        backgroundColor: chartColors,
        data: Object.values(visitorData)
      }]
    }
    return chartData;
  }


  return (
    <div>
      In Dashboard
      <ChartInfo visitorData={prepareVisitorData()}/>
    </div>
  )
}

function ChartInfo(props) {

const {visitorData} = props;

  // const lineChartData = {
  //   labels: [
  //   'January',
  //   'February',],
  //   datasets:[{
  //     label: 'Monthly Visits to Website',
  //     backgroundColor: [
  //       'rgb(255, 99, 132)',
  //       'rgb(54, 162, 235)',
  //       'rgb(255, 205, 86)',
  //       'red',
  //       'purple',
  //       'yellow'
  //     ],
  //     borderColor: 'black',
  //     data: [10, 30]
  //   }]
  // }

  const doughnutChartData = {
    labels: [
    'January',
    'February',],
    datasets:[{
      label: 'Average Likes on Website',
      backgroundColor: [
        'purple',
        'yellow'
      ],
      borderColor: 'red',
      data: [30, 70]
    }]
  }

  return (
    <div className="App">
      <CustomChart format="percent" displayLegend={true} type="line" data={visitorData}/>
      <CustomChart displayLegend={false} type="doughnut" data={doughnutChartData}/>
    </div>
  );
}
