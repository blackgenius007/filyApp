import React from 'react';
import { Chart } from 'react-google-charts';

const EmployeePresenceChart = ({ employeeData }) => {
  // Extract the data from the employeeData object
  const { last7Days = {}, last30Days = {}, last365Days = {} } = employeeData;

  // Prepare the data for the chart
  const chartData = [
    ['Period', 'Present', 'Absent', 'Sick', 'Suspension', 'Vacation'],
    ['Last 7 Days', last7Days.Present || 0, last7Days.Absent || 0, last7Days.Sick || 0, last7Days.Suspension || 0, last7Days.Vacation || 0],
    ['Last 30 Days', last30Days.Present || 0, last30Days.Absent || 0, last30Days.Sick || 0, last30Days.Suspension || 0, last30Days.Vacation || 0],
    ['Last 365 Days', last365Days.Present || 0, last365Days.Absent || 0, last365Days.Sick || 0, last365Days.Suspension || 0, last365Days.Vacation || 0],
  ];

  return (
    <div className="employee-chart-container">
      <h3 className="employee-chart-title">Employee Attendance</h3>
      <Chart
        chartType="AreaChart"
        data={chartData}
        options={{
          isStacked: true,
          areaOpacity: 0.6,
          backgroundColor: '#000000',
          colors: ['#ffcc00', '#ff3366', '#00ccff', '#ff9933', '#33cc33'],
          legend: { position: 'bottom', textStyle: { color: '#ffffff', fontSize: 14 } },
          hAxis: {
            textStyle: { color: '#ffffff', fontSize: 12 },
            gridlines: { color: '#ffffff', count: 5 },
            baselineColor: '#ffffff',
            titleTextStyle: { color: '#ffffff', fontSize: 14 },
          },
          vAxis: {
            textStyle: { color: '#ffffff', fontSize: 12 },
            gridlines: { color: '#ffffff', count: 5 },
            baselineColor: '#ffffff',
            titleTextStyle: { color: '#ffffff', fontSize: 14 },
          },
          lineWidth: 2,
        }}
        width="100%"
        height="200px"
      />
    </div>
  );
};

export default EmployeePresenceChart;

