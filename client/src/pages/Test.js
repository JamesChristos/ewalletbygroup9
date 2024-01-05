// import React, { useState } from 'react';
// import '../resources/analytics.css';
// import { Progress } from 'antd';
// import Spinner from '../components/Spinner';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee, faShoppingBag, faHome, faUtensils, faCartShopping, faCar, faSmile, faDollarSign, faLightbulb, faBowlFood, faGlassWater, faShirt, faBaseball, faBaby, faGift, faHomeUser, faBoxesPacking, faToiletPaper, faTruckPlane, faTrainSubway, faCarSide, faGasPump, faBaseballBatBall, faTv, faGamepad, faHospital, faBank, faCreditCard, faMoneyBill, faIdCard, faLandmark, faCoins, faHouseChimneyMedical, faHouseChimneyUser, faBus, faDice, faShoppingCart } from '@fortawesome/free-solid-svg-icons';


// function Analytics({ transaction }) {
//     const [loading, setLoading] = useState(false);

//     const totalTransaction = transaction.length;
//     const totalIncomeTransaction = transaction.filter(item => item.type === 'Income').length;
//     const totalExpenseTransaction = transaction.filter(item => item.type === 'Expense').length;

//     // Calculate percentages based on lengths of filtered arrays
//     const totalIncomeTransactionPercentage = (totalIncomeTransaction / totalTransaction) * 100;
//     const totalExpenseTransactionPercentage = (totalExpenseTransaction / totalTransaction) * 100;

//     const totalTurnover = transaction.reduce((acc, item) => acc + item.amount, 0)
//     const totalIncomeTurnover = transaction.filter(item => item.type === 'Income').reduce((acc, item) => acc + item.amount, 0)
//     const totalExpenseTurnover = transaction.filter(item => item.type === 'Expense').reduce((acc, item) => acc + item.amount, 0)
//     const totalIncomeTurnoverPercentage = (totalIncomeTurnover / totalTurnover) * 100;
//     const totalExpenseTurnoverPercentage = (totalExpenseTurnover / totalTurnover) * 100;

//     const incomeCategoryIcons = {
//         'Food & Drink': <FontAwesomeIcon icon={faUtensils} className='white-icon' />,
//         'Restaurants': <FontAwesomeIcon icon={faBowlFood} className='white-icon' />,
//         'Coffee & Bars': <FontAwesomeIcon icon={faGlassWater} className='white-icon' />,
//         'Groceries': <FontAwesomeIcon icon={faShoppingBasket} className='white-icon' />,
//         'Shopping': <FontAwesomeIcon icon={faCartShopping} className='white-icon' />,
//         'Clothes & Shoes': <FontAwesomeIcon icon={faShirt} className='white-icon' />,
//         'Electronics': <FontAwesomeIcon icon={faLightbulb} className='white-icon' />,
//         'Sports': <FontAwesomeIcon icon={faBaseball} className='white-icon' />,
//         'Kids': <FontAwesomeIcon icon={faBaby} className='white-icon' />,
//         'Gifts': <FontAwesomeIcon icon={faGift} className='white-icon' />,
//         'Housing': <FontAwesomeIcon icon={faHome} className='white-icon' />,
//         'Mortgage & Rent': <FontAwesomeIcon icon={faHomeUser} className='white-icon' />,
//         'Home Supplies': <FontAwesomeIcon icon={faBoxesPacking} className='white-icon' />,
//         'Home Services': <FontAwesomeIcon icon={faToiletPaper} className='white-icon' />,
//         'Rent the House': <FontAwesomeIcon icon={faHome} className='white-icon' />,
//         'Transportation': <FontAwesomeIcon icon={faBus} className='white-icon' />,
//         'Business Trips': <FontAwesomeIcon icon={faTruckPlane} className='white-icon' />,
//         'Public Transportation': <FontAwesomeIcon icon={faTrainSubway} className='white-icon' />,
//         'Family Trips': <FontAwesomeIcon icon={faCar} className='white-icon' />,
//         'Vehicle': <FontAwesomeIcon icon={faCarSide} className='white-icon' />,
//         'Fuel': <FontAwesomeIcon icon={faGasPump} className='white-icon' />,
//         'Service & Parts': <FontAwesomeIcon icon={faCartShopping} className='white-icon' />,
//         'Life & Entertainment': <FontAwesomeIcon icon={faSmile} className='white-icon' />,
//         'Sports': <FontAwesomeIcon icon={faBaseballBatBall} className='white-icon' />,
//         'TV & Netflix': <FontAwesomeIcon icon={faTv} className='white-icon' />,
//         'Games': <FontAwesomeIcon icon={faGamepad} className='white-icon' />,
//         'Doctor & Healthcare': <FontAwesomeIcon icon={faHospital} className='white-icon' />,
//         'Financial Expense': <FontAwesomeIcon icon={faDollarSign} className='white-icon' />,
//         'Bank Fee': <FontAwesomeIcon icon={faBank} className='white-icon' />,
//         'Interest Payment': <FontAwesomeIcon icon={faCreditCard} className='white-icon' />,
//         'Child Support': <FontAwesomeIcon icon={faBaby} className='white-icon' />,
//         'Tax': <FontAwesomeIcon icon={faMoneyBill} className='white-icon' />,
//         'Insurance': <FontAwesomeIcon icon={faIdCard} className='white-icon' />,
//         'Loan': <FontAwesomeIcon icon={faLandmark} className='white-icon' />,
//         'Incomes': <FontAwesomeIcon icon={faCoins} className='white-icon' />,
//         'Salary': <FontAwesomeIcon icon={faMoneyBill} className='white-icon' />,
//         'Rental Income': <FontAwesomeIcon icon={faHouseChimneyUser} className='white-icon' />,
//         'Interest': <FontAwesomeIcon icon={faCreditCard} className='white-icon' />,
//         'Lottery': <FontAwesomeIcon icon={faDice} className='white-icon' />,
//     }
// };

// // Calculate category data
// const categoryData = transaction.reduce((acc, { type, category, amount }) => {
//     if (!acc[category]) {
//         acc[category] = { Income: 0, Expense: 0 };
//     }

//     if (type === 'Income') {
//         acc[category].Income += amount;
//     } else if (type === 'Expense') {
//         acc[category].Expense += amount;
//     }

//     return acc;
// }, {});

// // Extract categories and respective income & expense values for chart display
// const categories = Object.keys(categoryData);
// const incomeValues = categories.map(category => categoryData[category].Income);
// const expenseValues = categories.map(category => categoryData[category].Expense);
// console.log('categories', categories);
// console.log('incomeValues', incomeValues);
// console.log('expenseValues', expenseValues);


// return (
//     <div className='analytics'>
//         <div className='row'>
//             {loading && <Spinner />}
//             <div className='col-md-4 mt-3'>
//                 <div className='transaction-count'>
//                     <h4>Total Transactions: {totalTransaction}</h4>
//                     <hr />
//                     <h5>Income: {totalIncomeTransaction}</h5>
//                     <h5>Expense: {totalExpenseTransaction}</h5>
//                     <br />
//                     <div className='progress-bars mx-4 mb-4'>
//                         <Progress className='mx-5' strokeColor='#5DD64F' type="circle" percent={totalIncomeTransactionPercentage.toFixed(1)} />
//                         <Progress strokeColor='#E5572F' type="circle" percent={totalExpenseTransactionPercentage.toFixed(1)} />
//                     </div>
//                 </div>
//             </div>
//             <div className='col-md-4 mt-3'>
//                 <div className='transaction-count'>
//                     <h4>Total Transactions: {totalTurnover}</h4>
//                     <hr />
//                     <h5>Income: {totalIncomeTurnover}</h5>
//                     <h5>Expense: {totalExpenseTurnover}</h5>
//                     <br />
//                     <div className='progress-bars mx-4 mb-4'>
//                         <Progress className='mx-5' strokeColor='#5DD64F' type="circle" percent={totalIncomeTurnoverPercentage.toFixed(1)} />
//                         <Progress strokeColor='#E5572F' type="circle" percent={totalExpenseTurnoverPercentage.toFixed(1)} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className='row'>
//             <div className='col-md-6'>
//                 <div className='income-category-analysis'>
//                     <br />
//                     <h4>Income - Category Wise</h4>
//                     {categories.map((category) => {
//                         const filteredTransactions = transaction.filter(t => t.type === 'Income' && t.category === category);
//                         const amount = filteredTransactions.reduce((acc, item) => acc + item.amount, 0);

//                         let iconClassName = 'category-icon housing'; // Default class
//                         if (incomeCategoryIcons[category]) {
//                             if (category === 'Salary' || category === 'Rental Income') {
//                                 iconClassName = 'category-icon income'; // Change class based on specific categories
//                             } else if (category === 'Income') {
//                                 iconClassName = 'category-icon income-category'; // Change class based on 'Income' category
//                             }
//                             // Add more conditions as needed for other categories
//                         }

//                         return (
//                             amount > 0 &&
//                             <div className='category-card' key={category}>
//                                 <h5>
//                                     {incomeCategoryIcons[category] && (
//                                         <span className={iconClassName}>{incomeCategoryIcons[category]}</span>
//                                     )}
//                                     {category}
//                                 </h5>
//                                 <Progress strokeColor='#0B5AD9' percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//             <div className='col-md-6'>
//                 <div className='category-analysis'>
//                     <br />
//                     <h4>Expense - Category Wise</h4>
//                     {categories.map((category) => {
//                         const filteredTransactions = transaction.filter(t => t.type === 'Expense' && t.category === category);
//                         console.log('Expense')
//                         console.log(`Category: ${category}, Transactions: `, filteredTransactions);
//                         const amount = filteredTransactions.reduce((acc, item) => acc + item.amount, 0);
//                         return (
//                             amount > 0 &&
//                             <div className='category-card' key={category}>
//                                 <h5>{category}</h5>
//                                 <Progress strokeColor='#0B5AD9' percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
//                             </div>
//                         )
//                     })}
//                 </div>
//             </div>

//         </div>
//     </div>
// );

// export default Analytics;
