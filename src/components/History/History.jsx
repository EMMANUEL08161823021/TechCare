import React, { useState, useEffect } from 'react';

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

const vitalTypes = [
  {
    key: "respiratory_rate",
    title: "Respiratory Rate",
    unit: "bpm",
    color: "#E0F3FA",
    img: "src/assets/respiratory.png",
  },
  {
    key: "temperature",
    title: "Temperature",
    unit: "F",
    color: "#FFE6E9",
    img: "src/assets/temperature.png",
  },
  {
    key: "heart_rate",
    title: "Heart Rate",
    unit: "bpm",
    color: "#FFE6F1",
    img: "src/assets/HeartBP.png",
  },
];


const VitalCard = ({ title, value, levels, unit, bg, img }) => (
  <div className="rounded-2xl overflow-hidden shadow-lg p-3" style={{ backgroundColor: bg }}>
    <img className="w-full rounded-xl" style={{ height: '100px', width: '100px' }} src={img} alt={title} />
    <div className="py-4">
      <h2 className="text-sm mb-2 text-gray-800">{title}</h2>
      <p className="text-black font-bold text-xl">{value} {unit}</p>
      <p>{levels}</p>
    </div>
  </div>
);


const History = () => {
  const [patient, setPatient] = useState(null);
  const [dataChart, setDataChart] = useState([]);
  const [detail, setDetail] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);


  const history = patient?.diagnosis_history || [];

  const handleNext = () => {
    if (pageIndex < history.length - 1) setPageIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (pageIndex > 0) setPageIndex(prev => prev - 1);
  };


  useEffect(() => {
    getPatients()
      .then((res) => {
        const data = res.data;
        const jessica = data.find((p) => p.name?.toLowerCase() === 'jessica taylor');

        if (jessica && Array.isArray(jessica.diagnosis_history)) {
          setPatient(jessica);

          const jessValues = jessica.diagnosis_history.map((entry) => ({
            month: entry.month,
            year: entry.year,
            systolic: entry.blood_pressure?.systolic,
            diastolic: entry.blood_pressure?.diastolic,
          }));

          setDataChart(jessValues);

          const formattedChartValues = jessValues.map((value) => ({
            systolicValues: value.systolic?.value ?? 0,
            diastolicValues: value.diastolic?.value ?? 0,
          }));

          setDetail(formattedChartValues);
        } else {
          console.log("Jessica or diagnosis history not found");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const CHART_COLORS = {
    red: '#7E6CAB',
    blue: '#C26EB4',
  };

  const transparentize = (color, opacity) =>
    color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);

  // Safely map labels and data
  const labels = dataChart.map((entry) => `${entry.month.slice(0, 3)} '${entry.year.toString().slice(-2)}`);
  const systolicData = detail.map((d) => d.systolicValues);
  const diastolicData = detail.map((d) => d.diastolicValues);

  const data = {
    labels,
    datasets: [
      {
        label: 'Systolic',
        data: systolicData,
        borderColor: CHART_COLORS.red,
        backgroundColor: transparentize(CHART_COLORS.red, 0.5),
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Diastolic',
        data: diastolicData,
        borderColor: CHART_COLORS.blue,
        backgroundColor: transparentize(CHART_COLORS.blue, 0.5),
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: () => '',
          label: function (context) {
            if (context.dataset.label === 'Systolic') {
              return ['Systolic', `${context.raw}`, 'Higher than Average'];
            } else if (context.dataset.label === 'Diastolic') {
              return ['Diastolic', `${context.raw}`, 'Slightly Elevated'];
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
          size: 18,
          weight: 'bold',
        },
        color: '#000',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="history-wrapper">
      <div className="wrapper flex flex-col gap-6">
        <div className="p-3 flex flex-col gap-3 bg-white rounded-xl">
          <h1 className="font-bold">Diagnosis History</h1>
          <div className="graph flex items-start justify-between bg-[#F4F0FE] rounded-xl p-3 w-[100%]">
            <Line options={options} data={data} />
          </div>
          {patient?.name === "Jessica Taylor" && history.length > 0 ? (
            <>
              <div className="flex justify-between items-center mt-6">
                <button onClick={handlePrev} disabled={pageIndex === 0} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
                <span className="font-bold text-gray-700">
                  {history[pageIndex].month} {history[pageIndex].year}
                </span>
                <button onClick={handleNext} disabled={pageIndex === history.length - 1} className="px-3 py-1 bg-gray-200 rounded">Next</button>
              </div>

              <div className="grid gap-6 w-[100%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {vitalTypes.map(({ key, title, unit, color, img }) => {
                  const vital = history[pageIndex][key];
                  return vital ? (
                    <VitalCard
                      key={key}
                      title={title}
                      value={vital.value}
                      levels={vital.levels}
                      unit={unit}
                      bg={color}
                      img={img}
                      
                    />
                  ) : null;
                })}
              </div>
            </>
          ) : (
            <p className="text-red-500">No data for Jessica Taylor</p>
          )}



        </div>

        <div className="overflow-x-auto rounded-xl bg-white p-3">
          <h1 className="font-bold my-2">Diagnostic List</h1>
          {patient && (
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-700">Problem/Diagnosis</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Description</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {patient.diagnostic_list.map((item, i) => (
                  <tr key={i}>
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
      <div style={{ height: '60px' }}></div>
    </div>
  );
};

export default History;

