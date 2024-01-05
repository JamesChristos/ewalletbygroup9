import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/transactions.css';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { EditOutlined, DeleteOutlined, UnorderedListOutlined, AreaChartOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer, faShoppingBag, faHome, faUtensils, faCartShopping, faCar, faSmile, faDollarSign, faLightbulb, faBowlFood, faGlassWater, faShirt, faBaseball, faBaby, faGift, faHomeUser, faBoxesPacking, faToiletPaper, faTruckPlane, faTrainSubway, faCarSide, faGasPump, faBaseballBatBall, faTv, faGamepad, faHospital, faBank, faCreditCard, faMoneyBill, faIdCard, faLandmark, faCoins, faHouseChimneyMedical, faHouseChimneyUser, faBus, faDice, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../resources/PlannedPayments.css';
import { Button, Form, Input, Select, DatePicker, message, Spin, List, Popconfirm, Progress, TreeSelect, Modal, notification } from 'antd';
import PlanItem from '../components/PlanItem';

const { Option } = Select;
const { TextArea } = Input;

const PlannedPayments = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddPlanModal, setShowAddPlanModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);  // New state for selected plan
    const [form] = Form.useForm();
    const userId = JSON.parse(localStorage.getItem('users'))._id;

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/plans/${userId}`);
            setPlans(response.data);
        } catch (error) {
            message.error('Failed to fetch plans');
        }
        setLoading(false);
    };

    const onAddPlan = () => {
        setSelectedPlan(null);  // Reset selectedPlan when adding a new plan
        setShowAddPlanModal(true);
    };

    const handleEdit = (planDetails) => {
        setSelectedPlan(planDetails);  // Set the selected plan when edit button is clicked
        setShowAddPlanModal(true);
    };



    const onDelete = async (planId) => {
        setLoading(true);
        try {
            await axios.delete(`/api/plans/${planId}`);
            message.success('Plan deleted successfully');
            fetchPlans();
        } catch (error) {
            message.error('Failed to delete plan');
        } finally {
            setLoading(false);
        }
    };


    const calculateProgress = (lastPaymentDate, nextPaymentDate, frequency) => {
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
        const today = new Date();
        const nextPayment = new Date(nextPaymentDate);

        let period = 0; // default for monthly
        if (frequency === 'Weekly') {
            period = 7 * oneDay;
        } else if (frequency === 'Monthly') {
            period = 30 * oneDay; // approximate value for a month
        }

        const timeSinceLastPayment = today - (nextPayment - period);
        const progress = Math.min(100, (timeSinceLastPayment / period) * 100);

        return progress > 0 ? progress : 0; // to avoid negative values
    };


    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Adding a new plan
            await axios.post('/api/plans/add_plan', { ...values, userId });
            message.success('Plan added successfully');

            setShowAddPlanModal(false);
            form.resetFields();
            fetchPlans();
        } catch (error) {
            message.error('Failed to add');
        } finally {
            setLoading(false);
        }
    };

    const deletePlan = async (values) => {
        try {
            setLoading(true);
            await axios.post('/api/plans/delete_plan', { ...values, userId });
            message.success('Plan deleted successfully');
            fetchPlans();
        } catch (error) {
            console.error('Error deleting plan', error);
            notification.error({
                message: 'Error',
                description: 'Failed to delete plan'
            })
        } finally {
            setLoading(false);
        }
    };

    const totalPlanned = plans.reduce((acc, plan) => acc + plan.amount, 0);


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

    return (
        <DefaultLayout>
            <div className='filter d-flex justify-content-between align-items-center'>
                <button
                    className='primary'
                    style={{ color: 'aliceblue' }}
                    onClick={onAddPlan}>
                    ADD PAYMENT PLAN
                </button>
            </div>
            {loading && <Spinner />}

            <Modal
                title={selectedPlan ? 'Edit Plan' : 'Add Plan'}
                visible={showAddPlanModal}
                onCancel={() => setShowAddPlanModal(false)}
                footer={null}
            >
                <Form form={form} layout='vertical' onFinish={onFinish}>

                    <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
                        <Input type="number" placeholder="Enter amount" />
                    </Form.Item>

                    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
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

                    <Form.Item name="frequency" label="Frequency" rules={[{ required: true }]}>
                        <Select placeholder="Select frequency">
                            <Option value="Monthly">Monthly</Option>
                            <Option value="Weekly">Weekly</Option>

                        </Select>
                    </Form.Item>

                    <Form.Item name="nextPaymentDate" label="Next Payment Date" rules={[{ required: true }]}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <TextArea rows={2} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save Plan
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <div className="planned-payments-summary">
                        <h1>TOTAL PAYMENT PLAN</h1>
                        <h2>{totalPlanned.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
                        <div className="plan-items-container">
                            {plans.map(plan => (
                                <div className="plan-item" key={plan._id}> {/* Ensure each plan has a unique key */}
                                    <PlanItem
                                        userId={plan.userId}
                                        amount={plan.amount}
                                        category={plan.category}
                                        frequency={plan.frequency}
                                        nextPaymentDate={plan.nextPaymentDate}
                                        description={plan.description}
                                        onDelete={() => onDelete(plan._id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}



export default PlannedPayments;
