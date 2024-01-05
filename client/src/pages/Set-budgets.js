import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/transactions.css';
import { Form, Modal, Input, Select, TreeSelect, DatePicker, message, Table, Button, Popconfirm, Progress, notification } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../components/Spinner';
import {
    faGlassWater,
    faShoppingBasket,
    faBaseball,
    faCartShopping,
    faMoneyBillTransfer,
    faUtensils,
    faShoppingBag,
    faHome,
    faShoppingCart,
    faCar,
    faSmile,
    faDollarSign,
    faLightbulb,
    faBowlFood,
    faShirt,
    faBaby,
    faGift,
    faHomeUser,
    faBoxesPacking,
    faToiletPaper,
    faTruckPlane,
    faTrainSubway,
    faCarSide,
    faGasPump,
    faBaseballBatBall,
    faTv,
    faGamepad,
    faHospital,
    faBank,
    faCreditCard,
    faMoneyBill,
    faIdCard,
    faLandmark,
    faCoins,
    faHouseChimneyMedical,
    faHouseChimneyUser,
    faBus,
    faDice,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import BudgetItem from '../components/BudgetItem';

const { RangePicker } = DatePicker;

function Set_budget() {
    const [loading, setLoading] = useState(false);
    const [selectItemForEdit, setSelectItemForEdit] = useState(null);
    const [showAddEditBudgetModal, setShowAddEditBudgetModal] = useState(false);
    const [budgets, setBudgets] = useState([]);
    const [data, setData] = useState([]);
    const [totalSpent, setTotalSpent] = useState([]);
    const [reached90, setReached90] = useState(false);
    const [reached100, setReached100] = useState(false);
    const [hundredPercentWarnings, setHundredPercentWarnings] = useState([]);

    const fetchBudgets = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('users'));
            setLoading(true);
            const response = await axios.get(`/api/budgets/get-all-budgets?userId=${user._id}`);
            setBudgets(response.data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        } finally {
            setLoading(false);
        }
    };

    const openAddEditBudgetModal = (budgetData = null) => {
        setSelectItemForEdit(budgetData);
        setShowAddEditBudgetModal(true);
    };

    const fetchTotalSpent = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('users'));
            const response = await axios.get(`/api/transactions/total-spent/${user._id}`);
            setTotalSpent(response.data);
        } catch (error) {
            console.error('Error fetching total spent:', error);
        }
    };

    useEffect(() => {
        fetchBudgets();
        fetchTotalSpent();
    }, []);

    const onFinish = async (values) => {
        try {
            setLoading(true);

            const user = JSON.parse(localStorage.getItem('users'));
            const endDate = values.dateRange[1].endOf('day').toDate();
            const currentDate = new Date();

            // Check if the transaction date is within the specified date range
            if (endDate < currentDate) {
                message.error('Transaction date should be within the specified date range.');
                setLoading(false);
                return;
            }

            let remainingDays = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));
            remainingDays = remainingDays < 0 ? 0 : remainingDays;

            const budgetData = {
                userId: user?._id,
                amount: values.amount,
                endDate,
                remainingDays,
                category: values.category,
                description: values.description,
            };

            console.log('Budget Data:', budgetData);

            if (selectItemForEdit) {
                const response = await axios.post('/api/budgets/edit_budget', {
                    ...budgetData,
                    budgetId: selectItemForEdit._id,
                });

                console.log('Edit Budget Response:', response.data);
                message.success('Budget Updated Successfully');
            } else {
                const response = await axios.post('/api/budgets/add_budgets', budgetData);
                console.log('Add Budget Response:', response.data);
                message.success('Budget Added Successfully');
            }

            setShowAddEditBudgetModal(false);
            fetchBudgets(); // Refresh the list of budgets
        } catch (err) {
            console.error(err);
            message.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const deleteBudget = async (budget) => {
        try {
            setLoading(true);
            await axios.post('/api/budgets/delete_budget', {
                budgetId: budget._id,
            });
            setHundredPercentWarnings(prevWarnings => prevWarnings.filter(id => id !== budget._id));
            message.success('Budget deleted successfully');
            fetchBudgets(); // Refresh the list of budgets
        } catch (err) {
            console.error('Error deleting budget:', err);
            notification.error({
                message: 'Error',
                description: 'Something went wrong while deleting the budget.',
            });
        } finally {
            setLoading(false);
        }
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day');
    };

    const treeData = [
        {
            title: (
                <span>
                    <span className="category-icon-data-tree food-drink">
                        <FontAwesomeIcon icon={faUtensils} className='white-icon' />
                    </span>{" "}
                    Food & Drink
                </span>
            ),
            value: 'Food & Drink',
            icon: <FontAwesomeIcon icon={faUtensils} className='white-icon' />,
            children: [
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree food-drink">
                                <FontAwesomeIcon icon={faShoppingBag} className='white-icon' />
                            </span>{" "}
                            Groceries
                        </span>
                    ),
                    value: 'Groceries',
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree food-drink">
                                <FontAwesomeIcon icon={faBowlFood} className='white-icon' />
                            </span>{" "}
                            Restaurants
                        </span>
                    ),
                    value: 'Restaurants',
                },
            ],
        },
        {
            title: (
                <span>
                    <span className="category-icon-data-tree shopping">
                        <FontAwesomeIcon icon={faShoppingCart} className='white-icon' />
                    </span>{" "}
                    Shopping
                </span>
            ),
            value: 'Shopping',
            children: [
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree shopping">
                                <FontAwesomeIcon icon={faShirt} className='white-icon' />
                            </span>{" "}
                            Clothes & Shoes
                        </span>
                    ), value: 'Clothes & Shoes'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree shopping">
                                <FontAwesomeIcon icon={faLightbulb} className='white-icon' />
                            </span>{" "}
                            Electronics
                        </span>
                    ), value: 'Electronics'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree shopping">
                                <FontAwesomeIcon icon={faBaby} className='white-icon' />
                            </span>{" "}
                            Kids
                        </span>
                    ), value: 'Kids'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree shopping">
                                <FontAwesomeIcon icon={faGift} className='white-icon' />
                            </span>{" "}
                            Gifts
                        </span>
                    ), value: 'Gifts'
                },
            ],
        },
        {
            title: (
                <span>
                    <span className="category-icon-data-tree housing">
                        <FontAwesomeIcon icon={faHome} className='white-icon' />
                    </span>{" "}
                    Housing
                </span>
            ),
            value: 'Housing',
            children: [
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree housing">
                                <FontAwesomeIcon icon={faHomeUser} className='white-icon' />
                            </span>{" "}
                            Mortgage & Rent
                        </span>
                    ), value: 'Mortgage & Rent'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree housing">
                                <FontAwesomeIcon icon={faBoxesPacking} className='white-icon' />
                            </span>{" "}
                            Home Supplies
                        </span>
                    ), value: 'Home Supplies'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree housing">
                                <FontAwesomeIcon icon={faToiletPaper} className='white-icon' />
                            </span>{" "}
                            Home Services
                        </span>
                    ), value: 'Home Services'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree housing">
                                <FontAwesomeIcon icon={faHome} className='white-icon' />
                            </span>{" "}
                            Rent the House
                        </span>
                    ), value: 'Rent the House'
                },
            ],
        },
        {
            title: (
                <span>
                    <span className="category-icon-data-tree transportation">
                        <FontAwesomeIcon icon={faBus} className='white-icon' />
                    </span>{" "}
                    Transportation
                </span>
            ),
            value: 'Transportation',
            children: [
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree transportation">
                                <FontAwesomeIcon icon={faTruckPlane} className='white-icon' />
                            </span>{" "}
                            Business Trips
                        </span>
                    ), value: 'Business Trips'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree transportation">
                                <FontAwesomeIcon icon={faTrainSubway} className='white-icon' />
                            </span>{" "}
                            Public Transportation
                        </span>
                    ), value: 'Public Transportation'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree transportation">
                                <FontAwesomeIcon icon={faCar} className='white-icon' />
                            </span>{" "}
                            Family Trips
                        </span>
                    ), value: 'Family Trips'
                },
            ],
        },
        {
            title: (
                <span>
                    <span className="category-icon-data-tree vehicle">
                        <FontAwesomeIcon icon={faCarSide} className='white-icon' />
                    </span>{" "}
                    Vehicle
                </span>
            ),
            value: 'Vehicle',
            children: [
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree vehicle">
                                <FontAwesomeIcon icon={faGasPump} className='white-icon' />
                            </span>{" "}
                            Fuel
                        </span>
                    ), value: 'Fuel'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree vehicle">
                                <FontAwesomeIcon icon={faCartShopping} className='white-icon' />
                            </span>{" "}
                            Service & Parts
                        </span>
                    ), value: 'Service & Parts'
                },
            ],
        },
        {
            title: (
                <span>
                    <span className="category-icon-data-tree Life-entertainment">
                        <FontAwesomeIcon icon={faSmile} className='white-icon' />
                    </span>{" "}
                    Life & Entertainment
                </span>
            ),
            value: 'Life & Entertainment',
            children: [
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree Life-entertainment">
                                <FontAwesomeIcon icon={faBaseballBatBall} className='white-icon' />
                            </span>{" "}
                            Sports
                        </span>
                    ), value: 'Sports'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree Life-entertainment">
                                <FontAwesomeIcon icon={faTv} className='white-icon' />
                            </span>{" "}
                            TV & Netflix
                        </span>
                    ), value: 'TV & Netflix'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree Life-entertainment">
                                <FontAwesomeIcon icon={faGamepad} className='white-icon' />
                            </span>{" "}
                            Games
                        </span>
                    ), value: 'Games'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree Life-entertainment">
                                <FontAwesomeIcon icon={faHospital} className='white-icon' />
                            </span>{" "}
                            Doctor & Healthcare
                        </span>
                    ), value: 'Doctor & Healthcare'
                },
            ],
        },
        {
            title: (
                <span>
                    <span className="category-icon-data-tree Finan">
                        <FontAwesomeIcon icon={faDollarSign} className='white-icon' />
                    </span>{" "}
                    Financial Expense
                </span>
            ),
            value: 'Financial Expense',
            children: [
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree Finan">
                                <FontAwesomeIcon icon={faBank} className='white-icon' />
                            </span>{" "}
                            Bank Fee
                        </span>
                    ), value: 'Bank Fee'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree Finan">
                                <FontAwesomeIcon icon={faCreditCard} className='white-icon' />
                            </span>{" "}
                            Interest Payment
                        </span>
                    ), value: 'Interest Payment'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree Finan">
                                <FontAwesomeIcon icon={faBaby} className='white-icon' />
                            </span>{" "}
                            Child Support
                        </span>
                    ), value: 'Child Support'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree Finan">
                                <FontAwesomeIcon icon={faMoneyBill} className='white-icon' />
                            </span>{" "}
                            Tax
                        </span>
                    ), value: 'Tax'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree Finan">
                                <FontAwesomeIcon icon={faIdCard} className='white-icon' />
                            </span>{" "}
                            Insurance
                        </span>
                    ), value: 'Insurance'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree Finan">
                                <FontAwesomeIcon icon={faLandmark} className='white-icon' />
                            </span>{" "}
                            Loan
                        </span>
                    ), value: 'Loan'
                },
            ],
        },
        {
            title: (
                <span>
                    <span className="category-icon-data-tree income">
                        <FontAwesomeIcon icon={faCoins} className='white-icon' />
                    </span>{" "}
                    Incomes
                </span>
            ),
            value: 'Incomes',
            children: [
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree income">
                                <FontAwesomeIcon icon={faMoneyBill} className='white-icon' />
                            </span>{" "}
                            Salary
                        </span>
                    ), value: 'Salary'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree income">
                                <FontAwesomeIcon icon={faHouseChimneyUser} className='white-icon' />
                            </span>{" "}
                            Rental Income
                        </span>
                    ), value: 'Rental Income'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree income">
                                <FontAwesomeIcon icon={faCreditCard} className='white-icon' />
                            </span>{" "}
                            Interest
                        </span>
                    ), value: 'Interest'
                },
                {
                    title: (
                        <span>
                            <span className="category-icon-data-tree income">
                                <FontAwesomeIcon icon={faDice} className='white-icon' />
                            </span>{" "}
                            Lottery
                        </span>
                    ), value: 'Lottery'
                },
            ],
        },
    ];

    const incomeCategoryIcons = {
        'Food & Drink': <FontAwesomeIcon icon={faUtensils} className='white-icon' />,
        'Restaurants': <FontAwesomeIcon icon={faBowlFood} className='white-icon' />,
        'Coffee & Bars': <FontAwesomeIcon icon={faGlassWater} className='white-icon' />,
        'Groceries': <FontAwesomeIcon icon={faShoppingBasket} className='white-icon' />,
        'Shopping': <FontAwesomeIcon icon={faCartShopping} className='white-icon' />,
        'Clothes & Shoes': <FontAwesomeIcon icon={faShirt} className='white-icon' />,
        'Electronics': <FontAwesomeIcon icon={faLightbulb} className='white-icon' />,
        'Sports': <FontAwesomeIcon icon={faBaseball} className='white-icon' />,
        'Kids': <FontAwesomeIcon icon={faBaby} className='white-icon' />,
        'Gifts': <FontAwesomeIcon icon={faGift} className='white-icon' />,
        'Housing': <FontAwesomeIcon icon={faHome} className='white-icon' />,
        'Mortgage & Rent': <FontAwesomeIcon icon={faHomeUser} className='white-icon' />,
        'Home Supplies': <FontAwesomeIcon icon={faBoxesPacking} className='white-icon' />,
        'Home Services': <FontAwesomeIcon icon={faToiletPaper} className='white-icon' />,
        'Rent the House': <FontAwesomeIcon icon={faHome} className='white-icon' />,
        'Transportation': <FontAwesomeIcon icon={faBus} className='white-icon' />,
        'Business Trips': <FontAwesomeIcon icon={faTruckPlane} className='white-icon' />,
        'Public Transportation': <FontAwesomeIcon icon={faTrainSubway} className='white-icon' />,
        'Family Trips': <FontAwesomeIcon icon={faCar} className='white-icon' />,
        'Vehicle': <FontAwesomeIcon icon={faCarSide} className='white-icon' />,
        'Fuel': <FontAwesomeIcon icon={faGasPump} className='white-icon' />,
        'Service & Parts': <FontAwesomeIcon icon={faCartShopping} className='white-icon' />,
        'Life & Entertainment': <FontAwesomeIcon icon={faSmile} className='white-icon' />,
        'Sports': <FontAwesomeIcon icon={faBaseballBatBall} className='white-icon' />,
        'TV & Netflix': <FontAwesomeIcon icon={faTv} className='white-icon' />,
        'Games': <FontAwesomeIcon icon={faGamepad} className='white-icon' />,
        'Doctor & Healthcare': <FontAwesomeIcon icon={faHospital} className='white-icon' />,
        'Financial Expense': <FontAwesomeIcon icon={faDollarSign} className='white-icon' />,
        'Bank Fee': <FontAwesomeIcon icon={faBank} className='white-icon' />,
        'Interest Payment': <FontAwesomeIcon icon={faCreditCard} className='white-icon' />,
        'Child Support': <FontAwesomeIcon icon={faBaby} className='white-icon' />,
        'Tax': <FontAwesomeIcon icon={faMoneyBill} className='white-icon' />,
        'Insurance': <FontAwesomeIcon icon={faIdCard} className='white-icon' />,
        'Loan': <FontAwesomeIcon icon={faLandmark} className='white-icon' />,
        'Incomes': <FontAwesomeIcon icon={faCoins} className='white-icon' />,
        'Salary': <FontAwesomeIcon icon={faMoneyBill} className='white-icon' />,
        'Rental Income': <FontAwesomeIcon icon={faHouseChimneyUser} className='white-icon' />,
        'Interest': <FontAwesomeIcon icon={faCreditCard} className='white-icon' />,
        'Lottery': <FontAwesomeIcon icon={faDice} className='white-icon' />,
        'Transfer': <FontAwesomeIcon icon={faMoneyBillTransfer} className='white-icon' />,
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/budgets/get-all-budgets');
            const data = await response.json();
            setData(data);
        }

        fetchData();
    }, []);


    useEffect(() => {
        budgets.forEach(budget => {
            const spentForCategory = totalSpent.find(item => item._id === budget.category)?.totalAmount || 0;
            const progressPercent = (spentForCategory / budget.amount) * 100;
            const isOverSpent = spentForCategory > budget.amount; // Compare with budget.amount instead of totalSpent
            const overSpentAmount = isOverSpent ? (spentForCategory - budget.amount).toFixed(2) : 0;
    
            if (progressPercent > 100 && !hundredPercentWarnings.includes(budget._id)) {
                setHundredPercentWarnings(prevWarnings => [...prevWarnings, budget._id]);
                message.warning(`Warning: You have spent over 100% of the budget for ${budget.category} , with the overspent amount ${overSpentAmount} $`);
            } else if (progressPercent === 100 && !hundredPercentWarnings.includes(budget._id)) {
                setHundredPercentWarnings(prevWarnings => [...prevWarnings, budget._id]);
                message.warning(`Warning: You have spent 100% of the budget for ${budget.category}`);
            }
        });
    }, [budgets, totalSpent, hundredPercentWarnings]);
    

    const renderCategoryIcon = (category) => {
        let iconClassName = 'category-icon'; // Default class
        let backgroundColor = '';

        if (incomeCategoryIcons[category]) {
            iconClassName = `category-icon ${category.toLowerCase().replace(/[\s&]/g, '-')}`;
            backgroundColor = getCategoryBackgroundColor(category);
        }

        return (
            <span className={iconClassName} style={{ backgroundColor }}>
                {incomeCategoryIcons[category]}
            </span>
        );
    };

    const getCategoryBackgroundColor = (category) => {
        switch (category) {
            case 'Food & Drink':
            case 'Groceries':
            case 'Restaurants':
                return '#d9534f';
            case 'Shopping':
            case 'Clothes & Shoes':
            case 'Electronics':
            case 'Kids':
            case 'Gifts':
                return '#5bc0de';
            case 'Housing':
            case 'Mortgage & Rent':
            case 'Home Supplies':
            case 'Home Services':
            case 'Rent the House':
                return '#ff8d23';
            case 'Transportation':
            case 'Business Trips':
            case 'Public Transportation':
            case 'Family Trips':
                return '#c1c1c1'
            case 'Vehicle':
            case 'Fuel':
            case 'Service & Parts':
                return '#8c00cd';
            case 'Life & Entertainment':
            case 'Sports':
            case 'TV & Netflix':
            case 'Games':
            case 'Doctor & Healthcare':
                return '#5eef68';
            case 'Financial Expense':
            case 'Bank Fee':
            case 'Interest Payment':
            case 'Child Support':
            case 'Tax':
            case 'Insurance':
            case 'Loan':
                return '#3cb38f';
            case 'Incomes':
            case 'Salary':
            case 'Rental Income':
            case 'Interest':
            case 'Lottery':
            case 'Transfer':
                return '#ffdf53';
        }
    };


    const twoColors = { '0%': '#108ee9', '100%': '#EA2727' };

    return (
        <DefaultLayout>
            <div className='filter d-flex justify-content-between align-items-center'>
                <button
                    className='primary'
                    style={{ color: 'aliceblue' }}
                    onClick={() => setShowAddEditBudgetModal(true)}>
                    ADD BUDGET
                </button>
            </div>

            {loading && <Spinner />}

            <Modal
                title={selectItemForEdit ? 'Edit Budget' : 'Add Budget'}
                visible={showAddEditBudgetModal}
                onCancel={() => {
                    setSelectItemForEdit(null); // Reset the state
                    setShowAddEditBudgetModal(false);
                }}
                footer={null}
            >
                <Form layout='vertical' className='budget-form' onFinish={onFinish} initialValues={selectItemForEdit}>
                    <Form.Item label='Amount' name='amount' rules={[{ required: true, message: 'Please input the amount!' }]}>
                        <Input type='number' placeholder='Enter amount' />
                    </Form.Item>

                    <Form.Item label='Date Range' name='dateRange' rules={[{ required: true, message: 'Please select the date range!' }]}>
                        <RangePicker disabledDate={disabledDate} />
                    </Form.Item>

                    <Form.Item label="Category" name="category">
                        <TreeSelect
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            treeData={treeData.map(node => ({
                                ...node,
                                icon: node.icon ? <i className={node.icon} /> : null,
                                children: node.children ? node.children.map(child => ({
                                    ...child,
                                    icon: child.icon ? <i className={child.icon} /> : null,
                                })) : null,
                            }))}
                        />
                    </Form.Item>

                    <Button type='primary' htmlType='submit'>
                        SAVE
                    </Button>
                </Form>
            </Modal>

            <div className='budget-table'>
                {budgets.map((budget) => {
                    const spentForCategory = totalSpent.find(item => item._id === budget.category)?.totalAmount || 0;
                    const isOverSpent = spentForCategory > totalSpent;
                    const overSpentAmount = isOverSpent ? (spentForCategory - totalSpent).toFixed(2) : 0;
                    let progressPercent = (spentForCategory / budget.amount) * 100;
                    return (
                        <div key={budget._id} className='budget-item'>
                            <div className='budget-item-details'>
                                <div className='budget-item-category'>
                                    {renderCategoryIcon(budget.category)}
                                    {budget.category}
                                </div>
                                <div className='budget-item-info'>
                                    <span>Spent: ${spentForCategory}</span>
                                    <span>Total: ${budget.amount}</span>
                                    <span>Remaining Days: {budget.remainingDays}</span>
                                    <Progress size={[1030, 25]} percent={progressPercent.toFixed(2)} showInfo={true} strokeColor={twoColors} />
                                </div>
                            </div>
                            <div className='budget-item-actions'>
                                <EditOutlined
                                    onClick={() => {
                                        setSelectItemForEdit(budget);
                                        setShowAddEditBudgetModal(true);
                                    }}
                                />
                                <Popconfirm
                                    title='Are you sure to delete this budget?'
                                    onConfirm={() => deleteBudget(budget)}
                                    okText='Yes'
                                    cancelText='No'
                                >
                                    <DeleteOutlined className='mx-3' />
                                </Popconfirm>
                            </div>
                        </div>
                    );
                })}
            </div>
        </DefaultLayout>
    );
};

export default Set_budget;