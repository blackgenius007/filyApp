import React from 'react';
import Chart from 'react-google-charts';
import gearsImage from '../../../assets/worker.png'

const DonutChart = ({ data }) => {
  return (
    <div>
    <Chart
      width={'100%'}
      height={'320px'}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: 'Percentage Workforce',
        pieHole: 0.4,
      }}
      rootProps={{ 'data-testid': '1' }}
      chartWrapperParams={{ style: { backgroundColor: 'white' } }} // Set the background color to white
    />
  

    </div>
    
  );
};

export default DonutChart;
