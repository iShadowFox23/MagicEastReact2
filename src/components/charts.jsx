
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function SalesChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const salesChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        datasets: [
          {
            label: "Ventas ($)",
            data: [230000, 250000, 180000, 300000, 280000, 400000],
            backgroundColor: "rgba(59,130,246,0.6)", 
            borderColor: "rgba(59,130,246,1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: { labels: { color: "#fff" } },
        },
      },
    });

    return () => salesChart.destroy();
  }, []);

  return (
    <div className="bg-secondary rounded p-4 mt-4">
      <h6 className="text-white mb-3">Ventas Semanales</h6>
      <canvas ref={chartRef} height="100"></canvas>
    </div>
  );
}

export default SalesChart;
