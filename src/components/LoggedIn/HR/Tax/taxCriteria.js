// import React from 'react';

// const TaxCriteria = ({ country, grossIncome }) => {
//   let criteriaList = [];
//   let taxBands = [];
//   let taxPayable = 'Tax payable calculation for ' + country;
//   let taxExemptions = {
//     nationalHousingFund: 0,
//     nationalHealthInsurance: 0,
//     lifeAssurancePremium: 0,
//     nationalPensionScheme: 0,
//   };

//   // Calculate the consolidated salary based on the provided gross income and country-specific percentages
//   const getConsolidatedSalary = (income) => {
//     let basicSalaryPercentage = 0.5;
//     let housingAllowancePercentage = 0.2;
//     let transportAllowancePercentage = 0.1;

//     // Modify the percentages based on the country
//     if (country === 'Nigeria') {
//       // Set Nigeria-specific percentages
//       basicSalaryPercentage = 0.4;
//       housingAllowancePercentage = 0.3;
//       transportAllowancePercentage = 0.2;
//     } else if (country === 'Ghana') {
//       // Set Ghana-specific percentages
//       basicSalaryPercentage = 0.6;
//       housingAllowancePercentage = 0.15;
//       transportAllowancePercentage = 0.25;
//     } else {
//       // Set default percentages for other countries
//       basicSalaryPercentage = 0.5;
//       housingAllowancePercentage = 0.2;
//       transportAllowancePercentage = 0.1;
//     }

//     const basicSalary = income * basicSalaryPercentage;
//     const housingAllowance = income * housingAllowancePercentage;
//     const transportAllowance = income * transportAllowancePercentage;
//     const consolidatedSalary = basicSalary + housingAllowance + transportAllowance;

//     return consolidatedSalary;
//   };

//   // Calculate the consolidated salary based on the provided gross income
//   const consolidatedSalary = getConsolidatedSalary(grossIncome);

//   // Update the criteria list, tax bands, tax payable, and tax exemptions based on the country
//   if (country === 'Nigeria') {
//     criteriaList = [
//       { income: 300000, rate: '7%', taxPayable: 'NGN 21,000' },
//       { income: 600000, rate: '11%', taxPayable: 'NGN 33,000' },
//       { income: 1100000, rate: '15%', taxPayable: 'NGN 75,000' },
//       { income: 1600000, rate: '19%', taxPayable: 'NGN 95,000' },
//       { income: 3200000, rate: '21%', taxPayable: 'NGN 336,000' },
//       { income: Infinity, rate: '24%', taxPayable: 'Excess amount * 0.24' },
//     ];

//     taxBands = [
//       { threshold: 300000, rate: 0.07 },
//       { threshold: 600000, rate: 0.11 },
//       { threshold: 1100000, rate: 0.15 },
//       { threshold: 1600000, rate: 0.19 },
//       { threshold: 3200000, rate: 0.21 },
//       { threshold: Infinity, rate: 0.24 },
//     ];

//     taxPayable = 'Tax payable calculation for Nigeria';

//     taxExemptions = {
//       nationalHousingFund: 0.025,
//       nationalHealthInsurance: 0.05,
//       lifeAssurancePremium: 0,
//       nationalPensionScheme: 0.08,
//     };
//   } else if (country === 'Ghana') {
//     criteriaList = [
//       // Add criteria for Ghana
//     ];

//     // Add tax bands, tax payable calculation, and tax exemptions for Ghana
//     // ...
//   } else {
//     criteriaList = [
//       // Add criteria for other countries
//     ];

//     // Add tax bands, tax payable calculation, and tax exemptions for other countries
//     // ...
//   }

//   return (
//     <div>
//       <h2>Tax Criteria</h2>
//       <p>Country: {country}</p>
//       <p>Gross Income: {grossIncome}</p>
//       <p>Consolidated Salary: {consolidatedSalary}</p>
//       <ul>
//         {criteriaList.map((criteria, index) => (
//           <li key={index}>
//             Income: {criteria.income}, Rate: {criteria.rate}, Tax Payable: {criteria.taxPayable}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TaxCriteria;





// // import React from 'react';

// // const TaxCriteria = ({ country }) => {
// //   let criteriaList = [];
// //   let taxBands = [];
// //   let taxPayable = '';
// //   let taxExemptions = {};

// //   if (country === 'Nigeria') {
// //     criteriaList = [
// //       { income: 300000, rate: '7%', taxPayable: 'NGN 21,000' },
// //       { income: 600000, rate: '11%', taxPayable: 'NGN 33,000' },
// //       { income: 1100000, rate: '15%', taxPayable: 'NGN 75,000' },
// //       { income: 1600000, rate: '19%', taxPayable: 'NGN 95,000' },
// //       { income: 3200000, rate: '21%', taxPayable: 'NGN 336,000' },
// //       { income: Infinity, rate: '24%', taxPayable: 'Excess amount * 0.24' },
// //     ];

// //     taxBands = [
// //       { threshold: 300000, rate: 0.07 },
// //       { threshold: 600000, rate: 0.11 },
// //       { threshold: 1100000, rate: 0.15 },
// //       { threshold: 1600000, rate: 0.19 },
// //       { threshold: 3200000, rate: 0.21 },
// //       { threshold: Infinity, rate: 0.24 },
// //     ];

// //     taxPayable = 'Tax payable calculation for Nigeria';

// //     taxExemptions = {
// //       nationalHousingFund: 0.025,
// //       nationalHealthInsurance: 0.05,
// //       lifeAssurancePremium: 0,
// //       nationalPensionScheme: 0.08,
// //     };
// //   } else if (country === 'Ghana') {
// //     // Define tax criteria and exemptions for Ghana
// //     // ...
// //   } else {
// //     // Define tax criteria and exemptions for other countries
// //     // ...
// //   }

// //   return (
// //     <div>
// //       <h2>Tax Criteria</h2>
// //       <p>Country: {country}</p>
// //       <h3>Criteria List</h3>
// //       <ul>
// //         {criteriaList.map((criteria, index) => (
// //           <li key={index}>
// //             Income: {criteria.income}, Rate: {criteria.rate}, Tax Payable: {criteria.taxPayable}
// //           </li>
// //         ))}
// //       </ul>
// //       <h3>Tax Bands</h3>
// //       <ul>
// //         {taxBands.map((band, index) => (
// //           <li key={index}>
// //             Threshold: {band.threshold}, Rate: {band.rate}
// //           </li>
// //         ))}
// //       </ul>
// //       <h3>Tax Payable Calculation</h3>
// //       <p>{taxPayable}</p>
// //       <h3>Tax Exemptions</h3>
// //       <ul>
// //         {Object.entries(taxExemptions).map(([exemption, value]) => (
// //           <li key={exemption}>
// //             {exemption}: {value}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default TaxCriteria;




