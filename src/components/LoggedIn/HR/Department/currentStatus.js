import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

const CurrentStats = () => {
  const { user } = useSelector((state) => state.auth);

  const data = [
    ['Work Force', 'Percentage'],
    ['HR', 10],
    ['Accounts', 20],
    ['Engineering', 60],
    ['Procurement', 10],
  ];

  const currentDate = moment().format('YYYY-MM-DD');

  return (
    <div style={{ position: 'relative' }}>
      <div
        id="container"
        style={{
          backgroundColor: '#ffff',
          boxShadow: '0 0 25px 2px rgba(0, 0, 0, 0.3)',
          borderRadius: '5px',
          flexGrow: '.2',
          padding: '1.5em',
        }}
      >
        <div id="info" style={{ display: 'flex' }}>
          <div id="legend" style={{ flexGrow: 1 }}>

            <p
              className="sub-title"
              style={{
                fontWeight: 'bold',
                fontSize: 'smaller',
                color: '#7F878F',
              }}
            >
              Last 7 days
            </p>
            <ul
              className="responses"
              style={{
                listStyleType: 'none',
                padding: 0,
                color: '#7F878F',
                borderRadius: '5px',
                border: '1px solid #ccc',
                background: '#f5f5f5',
                marginBottom: '20px',
              }}
            >
              <li
                className="not-exist"
                style={{
                  borderTop: '2px solid #eee',
                  padding: '.5em 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1rem',
                  color: '#333',
                }}
              >
                <span>Employees</span>
                <span className="num" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00aaff' }}>
                  380
                </span>
              </li>
              <li
                className="not-provided"
                style={{
                  borderTop: '2px solid #eee',
                  padding: '.5em 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1rem',
                  color: '#333',
                }}
              >
                <span>New Employee </span>
                <span className="num" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00aaff' }}>
                  39
                </span>
              </li>
              <li
                className="info-provided"
                style={{
                  borderTop: '2px solid #eee',
                  padding: '.5em 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1rem',
                  color: '#333',
                }}
              >
                <span>Female</span>
                <span className="num" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00aaff' }}>
                  100
                </span>
              </li>
              <li
                className="notice-provided"
                style={{
                  borderTop: '2px solid #eee',
                  padding: '.5em 1rem',
                  borderBottom: '2px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1rem',
                  color: '#333',
                }}
              >
                <span>Male</span>
                <span className="num" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00aaff' }}>
                  280
                </span>
              </li>
            </ul>
          </div>
          <div
            id="chart"
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h4 style={{ alignSelf: 'center', fontSize: '1.2rem', color: '#333' }}>
              Organization - {user && user.data.businessName}
            </h4>
        
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default CurrentStats;
