import React from 'react'
import { CChart } from '@coreui/react-chartjs'
import { useEffect, useState } from 'react'

function groupByDuplicates(arr, N) {
  const result = {};
  console.log(arr,N)
  // Initialize all numbers from 1 to N with count 0
  for (let i = 0; i <= N; i++) {
    result[i] = 0;
  }

  // Count the occurrences of each element in the array
  arr.forEach(item => {
    if (result.hasOwnProperty(item)) {
      result[item]++;
    }
  });
  console.log(result)
  return result;
}

function ResultGraph({ data, quiz }) {
  const [reqData,setReqData] = useState([])
  useEffect(()=>{
    if (data!=undefined)
    {
      console.log(quiz,data)
      setReqData(groupByDuplicates(data.map(item => item.data.score),quiz?.max_mark))
      //setReqData(sortedReqArray(reqArray(data.map(item => item.data.score)),quiz?.max_mark));
    }
    console.log(data,quiz?.title);
  },[data])
  useEffect(()=>{console.log(reqData)},[reqData])
  
  return (
    <CChart
    style={{margin:'auto',height:'90%',width:'90%'}}
      type="line"
      data={{
        labels: [...Array(quiz?.max_mark!=undefined?quiz.max_mark + 1:0).keys()],
        datasets: [
          {
            label: quiz?.title,
            backgroundColor: "rgba(220, 220, 220, 0.2)",
            borderColor: "rgba(220, 220, 220, 1)",
            pointBackgroundColor: "rgba(220, 220, 220, 1)",
            pointBorderColor: "#ff0202",
            fill:true,
            tension: 0.1,
            data: Object.values(reqData)
          }
        ],
      }}
      options={{
        plugins: {
          legend: {
            labels: {
              color: 'blue',
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: '#d5e93f',
            },
            ticks: {
              color: '#d5e93f',
            },
          },
          y: {
            grid: {
              color: '#d5e93f',
            },
            ticks: {
              color: '#d5e93f',
            },
          },
        },
      }}
    />
  )
}

export default ResultGraph