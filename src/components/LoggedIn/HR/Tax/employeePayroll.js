import React from 'react';

import TaxCalculator from './taxCalculator';


const EmployeeTax = (location) => {

// const country = 'Nigeria';
const grossIncome =1200000; // Example gross income provided by the user
const Benefits=0;
const Loan = 0



            
const getConsolidatedSalary = (income) => {
  let basicSalaryPercentage = 0.5;
  let housingAllowancePercentage = 0.2;
  let transportAllowancePercentage = 0.1;

  // Modify the percentages based on the country
  if (location === 'Nigeria') {

    // const basicSalaryPercentage = 0.15;
    // const housingAllowancePercentage = 0.075;
    // const transportAllowancePercentage = 0.075;

    basicSalaryPercentage = 0.4;
    housingAllowancePercentage = 0.3;
    transportAllowancePercentage = 0.2;
  } else if (location === 'Ghana') {
    basicSalaryPercentage = 0.6;
    housingAllowancePercentage = 0.15;
    transportAllowancePercentage = 0.25;
  } else {
    // Set default percentages for other countries
    basicSalaryPercentage = 0.5;
    housingAllowancePercentage = 0.2;
    transportAllowancePercentage = 0.1;
  }

  const basicSalary = income * basicSalaryPercentage;
  const housingAllowance = income * housingAllowancePercentage;
  const transportAllowance = income * transportAllowancePercentage;
  const consolidatedSalary = basicSalary + housingAllowance + transportAllowance;

  return consolidatedSalary;
};

const calculateCRA = (consolidatedSalary) => {
  const cra = Math.max(0.01 * consolidatedSalary, 200000) + 0.2 * consolidatedSalary;
  return cra;
};

const consolidatedSalary = getConsolidatedSalary(grossIncome);
const cra = calculateCRA(consolidatedSalary);

// Tax exemption values and tax bands specific to each country
let taxExemptItems = {};
let taxBands = [];

if (location === 'Nigeria') {
  taxExemptItems = {
    nationalHousingFund: 0,
    nationalHealthInsurance: 0,
    lifeAssurancePremium: 0,
    nationalPensionScheme: 0,
  };

  taxBands = [
    { threshold: 300000, rate: 0.07 },
    { threshold: 600000, rate: 0.11 },
    { threshold: 1100000, rate: 0.15 },
    { threshold: 1600000, rate: 0.19 },
    { threshold: 3200000, rate: 0.21 },
    { threshold: Infinity, rate: 0.24 },
  ];
} else if (location === 'Ghana') {
  taxExemptItems = {
    nationalHousingFund: 0, // Add Ghana-specific value if applicable
    nationalHealthInsurance: 0, // Add Ghana-specific value if applicable
    lifeAssurancePremium: 0, // Add Ghana-specific value if applicable
    nationalPensionScheme: 0, // Add Ghana-specific value if applicable
  };

  taxBands = [
    // Add tax bands specific to Ghana
  ];
} else {
  // Default tax exemption values and tax bands for other countries
  taxExemptItems = {
    nationalHousingFund: 0,
    nationalHealthInsurance: 0,
    lifeAssurancePremium: 0,
    nationalPensionScheme: 0,
  };

  taxBands = [
    // Default tax bands for other countries
  ];
}

  return (
    <div>
      <TaxCalculator
        consolidatedSalary={consolidatedSalary}
        cra={cra}
        taxBands={taxBands}
        taxExemptItems={taxExemptItems}
        benefit={Benefits}
        loan={Loan}
      
      />
    </div>
  );
};

export default EmployeeTax;













// import React from 'react';
// import TaxCriteria from './taxCriteria';
// import TaxCalculator from './taxCalculator';

// const country = 'Nigeria';
// const grossIncome = 100000; // Example gross income provided by the user

// const getConsolidatedSalary = (income) => {
//   let basicSalaryPercentage = 0.5;
//   let housingAllowancePercentage = 0.2;
//   let transportAllowancePercentage = 0.1;

//   // Modify the percentages based on the country
//   if (country === 'Nigeria') {
//     basicSalaryPercentage = 0.4;
//     housingAllowancePercentage = 0.3;
//     transportAllowancePercentage = 0.2;
//   } else if (country === 'Ghana') {
//     basicSalaryPercentage = 0.6;
//     housingAllowancePercentage = 0.15;
//     transportAllowancePercentage = 0.25;
//   } else {
//     // Set default percentages for other countries
//     basicSalaryPercentage = 0.5;
//     housingAllowancePercentage = 0.2;
//     transportAllowancePercentage = 0.1;
//   }

//   const basicSalary = income * basicSalaryPercentage;
//   const housingAllowance = income * housingAllowancePercentage;
//   const transportAllowance = income * transportAllowancePercentage;
//   const consolidatedSalary = basicSalary + housingAllowance + transportAllowance;

//   return consolidatedSalary;
// };

// const calculateCRA = (consolidatedSalary) => {
//   const cra = Math.max(0.01 * consolidatedSalary, 200000) + 0.2 * consolidatedSalary;
//   return cra;
// };

// const consolidatedSalary = getConsolidatedSalary(grossIncome);
// const cra = calculateCRA(consolidatedSalary);

// // Tax exemption values and tax bands specific to each country
// let taxExemptItems = {};
// let taxBands = [];

// if (country === 'Nigeria') {
//   taxExemptItems = {
//     nationalHousingFund: 0,
//     nationalHealthInsurance: 0,
//     lifeAssurancePremium: 0,
//     nationalPensionScheme: 0,
//   };

//   taxBands = [
//     { threshold: 300000, rate: 0.07 },
//     { threshold: 600000, rate: 0.11 },
//     { threshold: 1100000, rate: 0.15 },
//     { threshold: 1600000, rate: 0.19 },
//     { threshold: 3200000, rate: 0.21 },
//     { threshold: Infinity, rate: 0.24 },
//   ];
// } else if (country === 'Ghana') {
//   taxExemptItems = {
//     nationalHousingFund: 0, // Add Ghana-specific value if applicable
//     nationalHealthInsurance: 0, // Add Ghana-specific value if applicable
//     lifeAssurancePremium: 0, // Add Ghana-specific value if applicable
//     nationalPensionScheme: 0, // Add Ghana-specific value if applicable
//   };

//   taxBands = [
//     // Add tax bands specific to Ghana
//   ];
// } else {
//   // Default tax exemption values and tax bands for other countries
//   taxExemptItems = {
//     nationalHousingFund: 0,
//     nationalHealthInsurance: 0,
//     lifeAssurancePremium: 0,
//     nationalPensionScheme: 0,
//   };

//   taxBands = [
//     // Default tax bands for other countries
//   ];
// }

// const EmployeeTax = () => {
//   return (
//     <div>
//       <TaxCriteria
//         country={country}
//         grossIncome={grossIncome}
//         taxBands={taxBands}
//       />
//       <TaxCalculator
//         consolidatedSalary={consolidatedSalary}
//         cra={cra}
//         taxBands={taxBands}
//         taxExemptItems={taxExemptItems}
//       />
//     </div>
//   );
// };

// export default EmployeeTax;
