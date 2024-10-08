import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const PieDemandes    = () => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api-demandes/get_all_demandes/');
        const data = response.data;

        const stateCounts = data.reduce((acc, item) => {
          const state = item.State;
          if (!acc[state]) {
            acc[state] = 0;
          }
          acc[state]++;
          return acc;
        }, {});

        setSeries([...Object.values(stateCounts)]);
        setLabels([...Object.keys(stateCounts)]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const chartOptions = {
    chart: {
      width: 400, // Change this to your desired width
      type: 'pie',
    },
    colors: ['#cdaf02', '#009611', '#cd0202'],
    plotOptions: {
      pie: {
        dataLabels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            colors: ['#ffffff'],
          },
        },
      },
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480, // Change this to your desired breakpoint
        options: {
          chart: {
            width: 200, // Change this to a smaller width
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
  return (
    <div id="chart">
      <ReactApexChart options={chartOptions} series={series} type="pie" width={380} />
    </div>
  );
};

export default PieDemandes;