import React from 'react'
import '../../css/App.css';
import { Line } from 'react-chartjs-2';
const LineChart = (props) => {
    let options;
    let data = [];
    let labels =[];
    let scoreData = [];
    props.data.forEach(element =>{
        labels.push(element.year)
        scoreData.push(element.score)
    });

    if (props.data.length > 0) {
        data = {
            labels: labels.reverse(),
            datasets: [
                {
                    label: props.data[0].country,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: scoreData.reverse()
                }
            ]
        };
    };

    return (
        <div className="LineChart">
            <Line data={data} options={options} />
        </div >
    );

}

export default LineChart;