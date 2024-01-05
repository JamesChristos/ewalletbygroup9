import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Orb from '../components/Orbs';

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log('Form values:', values); // Log the form values

      const response = await axios.post('/api/users/login', values);
      console.log('Login response:', response.data); // Log the response data

      localStorage.setItem('users', JSON.stringify(response.data));
      setLoading(false);
      navigate('/');
      message.success('Welcome Back! ' + response.data.name);
    } catch (err) {
      setLoading(false);
      console.error('Login error:', err); // Log the error for debugging
      message.error(err.response?.data?.error || 'Login failed');
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
      return Promise.reject('Password must be alphanumerical at least 8 characters.');
    }
    return Promise.resolve();
  };

  return (
    <div className='container'>
      <div className='register'>
        {loading && <Spinner />}
        <div className='row align-items-center'>
          {/* Left side content */}
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
          {/* Right side content */}
          <div className='col-lg-6'>
            <div className='d-flex align-items-center justify-content-center'>
              <div>
                <Orb />
                <h3><b>Log In</b></h3>
                <p className='a1'>Log in below to use your Wallet account</p>
                <Form layout='vertical' onFinish={onFinish}>
                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { validator: validateEmailFormat },
                    ]}
                  >
                    <Input placeholder='Email' />
                  </Form.Item>
                  <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                      { required: true, message: 'Please input your password!' },
                      { validator: validatePasswordFormat },
                    ]}
                  >
                    <div>
                      <Input.Password placeholder='Password' />
                      <Link to='/forget-password' className='float-right'>Forgot Password?</Link>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <Button type='primary' shape='round' size='large' className='custom-button' block htmlType='submit'>
                      Login
                    </Button>
                  </Form.Item>
                  <div className='d-flex justify-content-center align-items-center'>
                    Don't have an account?&nbsp;
                    <Link to='/Register'>Register</Link>
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

export default Login;
