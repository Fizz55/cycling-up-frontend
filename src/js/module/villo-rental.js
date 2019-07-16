import Chart from 'chart.js';

export default () => {

  // Our labels along the x-axis
  const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
  // For drawing the lines
  const rental = [871916, 1217687, 1412255, 1423182, 1645779, 1508265, 1577811, 1615160];

  const ctx = document.getElementById(`js-canvas-villo`);
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [{
          data: rental,
          label: 'total amount of villo! rental per year',
          borderColor: 'rgba(185, 206, 228, .1)',
          fill: '#EAB818',
          backgroundColor: '#EAB818'
        }]
      },
      options: {
        responsive: false
      }
    });
  }
};
