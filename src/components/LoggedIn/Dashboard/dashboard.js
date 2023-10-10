import React, { useState } from 'react';
import CurrentStatus from '../Charts/currentStatus';
import gearsImage from '../../../assets/worker.png'
function Dashboard() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        style={{
          width: '200px', // Adjust the width as needed
          position: 'fixed',
          top: 0,
          left: isHovered ? 0 : '-200px',
          backgroundColor: '#f0f0f0', // Customize the background color
          transition: 'left 0.3s ease', // Adjust the transition duration and easing
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Content of your side menu goes here */}
        {/* Example: */}
        <ul>
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
        </ul>
      </div>
      <div>
        <CurrentStatus />
      </div>
    </>
  );
}

export default Dashboard;
