export function createChart(data, labels) {
    var ctx = document.getElementById('valueChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Price fluctuation',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: data,
                },
            ],
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            fontSize: 16,
                        },
                    },
                ],
            },
            legend: {
                labels: {
                    fontSize: 26,
                },
            },
            tooltips: {
                titleFontSize: 18,
                bodyFontSize: 18,
            },
        },
    });
    return chart;
}
