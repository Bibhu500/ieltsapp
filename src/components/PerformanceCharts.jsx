import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PerformanceCharts = () => {
  const learningChartRef = useRef(null);
  const listeningChartRef = useRef(null);
  const writingChartRef = useRef(null);
  const readingChartRef = useRef(null);
  const mockTestChartRef = useRef(null);
  const overallChartRef = useRef(null);

  const chartData = {
    learning: [10, 20, 30, 40, 50],
    listening: [20, 30, 40, 50, 60],
    writing: [30, 40, 50, 60, 70],
    reading: [40, 50, 60, 70, 80],
    mockTest: [50, 60, 70, 80, 90],
    overall: [60, 70, 80, 90, 100],
  };

  const createChart = (ref, data, label) => {
    const ctx = ref.current.getContext('2d');
    const screenWidth = window.innerWidth;
  
    let fontSize = 12;
    if (screenWidth > 1024) {
      // Large screens
      fontSize = 16;
    } else if (screenWidth > 768) {
      // Medium screens
      fontSize = 14;
    }
  
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'],
        datasets: [{
          label: label,
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.3,
          fill: false,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            bodyFont: {
              size: fontSize,
            },
            displayColors: false,
            callbacks: {
              label: function(context) {
                return `Score: ${context.raw}`;
              }
            }
          }
        }
      }
    });
  };
  

  useEffect(() => {
    const learningChart = createChart(learningChartRef, chartData.learning, 'Learning');
    const listeningChart = createChart(listeningChartRef, chartData.listening, 'Listening');
    const writingChart = createChart(writingChartRef, chartData.writing, 'Writing');
    const readingChart = createChart(readingChartRef, chartData.reading, 'Reading');
    const mockTestChart = createChart(mockTestChartRef, chartData.mockTest, 'Full Mock Test');
    const overallChart = createChart(overallChartRef, chartData.overall, 'Overall Performance');

    // Cleanup to prevent memory leaks
    return () => {
      learningChart.destroy();
      listeningChart.destroy();
      writingChart.destroy();
      readingChart.destroy();
      mockTestChart.destroy();
      overallChart.destroy();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-2 gap-2 p-1">
      <div>
        <canvas ref={learningChartRef}></canvas>
      </div>
      <div>
        <canvas ref={listeningChartRef}></canvas>
      </div>
      <div>
        <canvas ref={writingChartRef}></canvas>
      </div>
      <div>
        <canvas ref={readingChartRef}></canvas>
      </div>
      <div>
        <canvas ref={mockTestChartRef}></canvas>
      </div>
      <div>
        <canvas ref={overallChartRef}></canvas>
      </div>
    </div>
  );
};

export default PerformanceCharts;
