import React from 'react';
import { Card, Col, Row, Statistic, Button, message, Dropdown, Menu } from 'antd';
import { EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../resources/transactions.css';

const PlanItem = ({ userId, amount, category, frequency, nextPaymentDate, description, onEdit, onDelete }) => {
  const handleDelete = () => {
    // You should pass the plan ID to the parent component for deletion
    onDelete(userId);
  };

  const { Countdown } = Statistic;

  const deadline = new Date(nextPaymentDate).getTime();

  const onFinish = async () => {
    console.log('Countdown finished! Creating transaction...');
    console.log('userId:', userId); // Log userId here

    try {
        const newTransaction = {
            userId: userId._id,
            amount: amount,
            type: "Expense",
            category: category,
            date: new Date().toISOString().split('T')[0],
        };

        const response = await axios.post('/api/transactions/add-transaction', newTransaction);

        console.log('Transaction created successfully:', response.data);
    } catch (error) {
        console.error('Error adding transaction:', error);
        message.error('An error occurred while adding the transaction');
    }
};

  const menu = (
    <Menu>
      <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={handleDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Card className="plan-item-card">
      <Row gutter={16}>
        <Col span={24}>
          <h3>{category}</h3>
          <p>Description: {description}</p>
          <p>Amount: ${amount}</p>
          <p>Frequency: {frequency}</p>
        </Col>
        <Col span={24}>
          <Countdown title="Next Payment Countdown" value={deadline} onFinish={onFinish} format="D day H:m:s" />
        </Col>
      </Row>
      <div className="plan-item-header">
        <Dropdown overlay={menu} trigger={['click']}>
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      </div>
    </Card>
  );
};

export default PlanItem;
