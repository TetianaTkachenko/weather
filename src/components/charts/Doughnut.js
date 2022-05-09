import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

function chartData(dataForChurts) {
    const dataForLabels = dataForChurts.map(data => new Date(data.applicable_date))

    return {
        labels: dataForLabels.map(day => day.toLocaleString('en', {
            weekday: "short"
        })),
        datasets: [
            {
                label: 'Max. tempereture',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                borderColor: 'rgb(202 35 58 / 67%)',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: dataForChurts.map(data => data.max_temp.toFixed(0)),
                tension: '0.2',
            },
            {
                label: 'Min. tempereture',
                fillColor: 'rgba(210,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                borderColor: 'rgb(11 13 144 / 67%)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                tension: '0.2',
                data: dataForChurts.map(data => data.min_temp.toFixed(0)),
            },
        ],
    }
}
const options = {
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    },
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 5,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
}

const styles = {
    graphContainer: {
        margin: '10px',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '1000px',
        maxHeight: '200px'
    }
}

const DoughnutChurts = ({ dataForChurts }) => {
    const data = chartData(dataForChurts)
    return (
        <div style={styles.graphContainer}>
            <Line data={data}
                options={options}
                width="1000" height="200" />
        </div>
    )
}

export default DoughnutChurts;