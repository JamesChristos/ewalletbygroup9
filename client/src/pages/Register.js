import { Form, Input, Button, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Orb from '../components/Orbs';

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(true);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/register', values);
      localStorage.setItem('users', JSON.stringify(response.data));
      setLoading(false);
      navigate('/login');
      message.success('Welcome! You have successfully registered.');
    } catch (err) {
      setLoading(false);
      if (err.response.status === 409) {
        message.error('Email is already in use. Please choose a different email.');
      } else {
        message.error('An error occurred during registration.');
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('users')) {
      navigate('/');
    }
  }, [navigate])

  // Custom validation for gmail format
  const validateEmailFormat = (rule, value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return Promise.reject('Please enter a valid email address');
    }
    return Promise.resolve();
  };

  // Custom validation for password format
  const validatePasswordFormat = (rule, value) => {
    if (value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
      return Promise.reject('Password must be alphanumerical at least 8 characters long');
    }
    return Promise.resolve();
  };

  return (
    <div className='container'>
      <div className='register'>
        {loading && <Spinner />}
        <div className='row align-items-center'>
          {/* Container for lottie-player */}
          <div className='col-lg-6'>
            <div className='d-none d-lg-block'>
              <div className='lottie-player'>
                <h1 className='header-lottie'>Your Finance in One Place</h1>
                <lottie-player
                  src="https://assets3.lottiefiles.com/packages/lf20_06a6pf9i.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              </div>
            </div>
          </div>
          {/* Container for Register section */}
          <div className='col-lg-6'>
            <div className='d-flex align-items-center justify-content-center'>
              <div>
                <Orb />
                <h3><b>Create Wallet Account</b></h3>
                <p className='a1'>Sign up below to create your Wallet account</p>
                {/* Registration form */}
                <Form layout='vertical' onFinish={onFinish}>
                  <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input placeholder='Name' />
                  </Form.Item>
                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { validator: validateEmailFormat }, // Additional email format validation
                    ]}>
                    <Input placeholder='Email' />
                  </Form.Item>
                  <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                      { required: true, message: 'Please input your password!' },
                      { validator: validatePasswordFormat }, // Custom password format validation
                    ]}>
                    <Input.Password placeholder='Password' />
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' shape='round' size='large' className='custom-button' block>
                      Register
                    </Button>
                  </Form.Item>
                  {/* Displayed below the form on all screen sizes */}
                  <div className='d-flex justify-content-center align-items-center'>
                    Already have an account?&nbsp;
                    <Link to='/login'>Log In</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
