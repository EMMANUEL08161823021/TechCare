import React, {useState, useEffect} from 'react'

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getPatients } from '../../services/api';


const History = () => {

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    getPatients()
      .then((res) => {
        // Show only Jessica Taylor
        const data = res.data;
        console.log(data);
        
        const jessica = data.find((p) => p.name === 'Jessica Taylor');
        setPatient(jessica);
      })
      .catch((err) => console.error(err));
  }, []);

  // Register required Chart.js components
  ChartJS.register(
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );

  // Simulate Utils functions
  const months = ({ count }) => {
    const now = new Date();
    return Array.from({ length: count }, (_, i) =>
      new Date(now.getFullYear(), now.getMonth() - i).toLocaleString('default', { month: 'short' })
    ).reverse();
  };

  const numbers = ({ count, min, max }) =>
    Array.from({ length: count }, () =>
      Math.floor(Math.random() * (max - min + 1)) + min
    );

  const CHART_COLORS = {
    red: '#7E6CAB',
    blue: '#C26EB4',
  };

  const transparentize = (color, opacity) =>
    color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);

  // Data
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

  const labels = months({ count: DATA_COUNT });

  const data = {
    labels,
    datasets: [
      {
        label: 'Systolic',
        data: [120, 130, 125, 140, 150, 160, 160],
        borderColor: CHART_COLORS.red,
        backgroundColor: transparentize(CHART_COLORS.red, 0.5),
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Diastolic',
        data: [80, 85, 82, 90, 95, 98, 100],
        borderColor: CHART_COLORS.blue,
        backgroundColor: transparentize(CHART_COLORS.blue, 0.5),
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: () => '', // Hide the default title
          label: function (context) {
            const { dataset } = context;

            if (dataset.label === 'Systolic') {
              return [`Systolic`, `160`, `Higher than Average`];
            } else if (dataset.label === 'Diastolic') {
              return [`Diastolic`, `100`, `Slightly Elevated`];
            }
            return context.label;
          },
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          generateLabels(chart) {
            return chart.data.datasets.map((dataset, i) => {
              const label =
                dataset.label === 'Systolic'
                  ? 'Systolic - 160 (High)'
                  : 'Diastolic - 100 (Elevated)';
              return {
                text: label,
                fillStyle: dataset.backgroundColor,
                strokeStyle: dataset.borderColor,
                lineWidth: 2,
                hidden: !chart.isDatasetVisible(i),
                index: i,
              };
            });
          },
        },
      },
      title: {
        display: true,
        text: 'Blood Pressure',
        align: 'start',
        font: {
          size: 18, // increase size
          weight: 'bold', // make it bold
        },
        color: '#000', // optional: make sure it's visible
      },

    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='history-wrapper'>
        <div className='wrapper flex flex-col gap-4'>
          <div className='p-3 flex flex-col gap-3 bg-white rounded-xl '>
            <h1 className='font-bold'>Diagnosis History</h1>
              <div className='graph flex items-start justify-between bg-[#F4F0FE] rounded-xl p-3 w-[100%]'>
               <Line options={options} data={data} />
              </div>
            <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#E0F3FA] p-3">
                <img class="w-full rounded-xl" style={{height: '100px', width: '100px'}} src="/src/assets/respiratory.png" alt="Sample image" />
                <div class="py-4">
                  <h2 class="text-sm mb-2 text-gray-800">Respiratory Rate</h2>
                  <p class="text-black font-bold text-xl">
                    20 bpm
                  </p>
                  <p>Normal</p>
                </div>
              </div>
              <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#FFE6E9] p-3">
                <img class="w-full rounded-xl" style={{height: '100px', width: '100px'}} src="/src/assets/temperature.png" alt="Sample image" />
                <div class="py-4">
                  <h2 class="text-sm mb-2 text-gray-800">Temperature</h2>
                  <p class="text-black font-bold text-xl">
                    98.6 F
                  </p>
                  <p>Normal</p>
                </div>
              </div>
              <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-[#FFE6F1] p-3">
                <img class="w-full rounded-xl" style={{height: '100px', width: '100px'}} src="/src/assets/HeartBP.png" alt="Sample image" />
                <div class="py-4">
                  <h2 class="text-sm mb-2 text-gray-800">Heart Rate</h2>
                  <p class="text-black font-bold text-xl">
                    78 bpm
                  </p>
                  <p>Normal</p>
                </div>
              </div>


            </div>
          </div>
          <div class="overflow-x-auto rounded-xl bg-white p-3">
            <h1 className='font-bold my-2'>Diagnostic List</h1>
            {patient && (

            <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-6 py-3 font-semibold text-gray-700">Problem/Diagnosis</th>
                  <th class="px-6 py-3 font-semibold text-gray-700">Description</th>
                  <th class="px-6 py-3 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                {patient.diagnostic_list.map((item, i) => (

                  <tr>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-black">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
            )}
          </div>


        </div>
        <div style={{height: '60px'}}></div>

    </div>
  )
}

export default History