// Login.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Orb from '../components/Orbs';

function Forget_Password() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/forget-password', values);
      setLoading(false);
      message.success(response.data.message);
      // Optionally, you can redirect to a different route after successful submission
    } catch (err) {
      setLoading(false);
      message.error(err.response?.data?.error || 'Something went wrong');
    }
  };

  // Custom validation for gmail format
  const validateEmailFormat = (rule, value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return Promise.reject('Please enter a valid email address');
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
                <h3><b>Reset Password</b></h3>
                <p className='a1'>Enter your Connected Email Account to Reset Password</p>
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
                  <Form.Item>
                    <Button type='primary' shape='round' size='large' className='custom-button' block htmlType='submit'>
                      Send
                    </Button>
                  </Form.Item>
                  <div className='d-flex justify-content-center align-items-center'>
                    Don't have an account?&nbsp;
                    <Link to='/Register'>Register</Link>
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                    Or go back to&nbsp;
                    <Link to='/Login'>Login</Link>
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

export default Forget_Password;
