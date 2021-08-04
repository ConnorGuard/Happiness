import React from 'react'
import '../../css/App.css';
import { Bar } from 'react-chartjs-2';
const RadarChart = (props) => {
    let dataSets = [];
    let data = [];
    let options;
    let labels = ["Economy", "Family", "Health", "Freedom", "Generosity", "Trust"];
    const colors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];
    const backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ];
    let i = 0;
    if (props.data.length > 0) {
        //grab countries
        const limit = (props.data.length-(props.page*5) < 5) ? props.data.length-(props.page*5) : 5;
        for (i=props.page*5; i < props.page*5+limit; i++) {
            dataSets.push({
                label: props.data[i].country,
                data: [props.data[i].economy, props.data[i].family, props.data[i].health, props.data[i].freedom, props.data[i].generosity, props.data[i].trust],
                backgroundColor: backgroundColor[i-props.page*5],
                borderColor: colors[i-props.page*5],
                borderWidth: 1
            })
        };

        data = {
            labels: labels,
            datasets: dataSets
        }
        options = {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    }

    return (
        <div className="RadarChart">
            <Bar data={data} options={options} />
        </div >
    );

}

export default RadarChart;