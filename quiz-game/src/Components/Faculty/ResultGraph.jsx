import React from 'react'
import { CChart } from '@coreui/react-chartjs'
import { useEffect, useState } from 'react'

/**
 * 
 * @param {*} arr an array of elements for which you want to group duplicates and count their occurrences.
 * @param {*} N  a number that defines the range of elements to count occurrences.
 * @returns an object result, where each key represents a unique element from the arr, and the corresponding value represents the count of occurrences of that element in the arr.
 * 
 */
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
/**
 * 
 * @param {*} param0 This prop represents an array of data containing quiz attempts with their respective scores. Each element in the array is expected to be an object with a data property, which holds the score for that attempt
 * @param{quiz} This prop represents an object containing details of the quiz. It should have a max_mark property representing the maximum possible score for the quiz.
 * 
 * @returns CChart component
 * 
 */
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
