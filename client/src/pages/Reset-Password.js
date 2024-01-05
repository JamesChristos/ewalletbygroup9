// ResetPassword.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import Spinner from '../components/Spinner';
import Orb from '../components/Orbs';

function Reset_Password() {
  const [loading, setLoading] = useState(false);
  const { id, token } = useParams();
  const navigate = useNavigate(true);

  const onFinish = async (values) => {
    const { password, confirmPassword } = values; // Ensure both values are extracted

    if (password !== confirmPassword) {
      message.error('Password and Confirm Password do not match');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`/api/users/reset-password/${id}/${token}`, { password, confirmPassword }); // Include confirmPassword in the payload
      setLoading(false);
      message.success('Password updated successfully');
      // Redirect to login page or any other page after successful password update
      navigate('/login');
    } catch (error) {
      setLoading(false);
      console.error('Reset Password Error:', error);
      message.error('Failed to update password. Please try again.');
    }
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
                <p className='a1'>Enter Password and Confirm Password to Reset</p>
                <Form layout='vertical' onFinish={onFinish}>
                  <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                      { required: true, message: 'Please input your password!' },
                      { validator: validatePasswordFormat },
                    ]}
                  >
                    <Input.Password placeholder='Password' />
                  </Form.Item>
                  <Form.Item
                    label='Confirm Password'
                    name='confirmPassword'
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Please confirm your password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject('The two passwords do not match!');
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder='Confirm Password' />
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' shape='round' size='large' className='custom-button' block htmlType='submit'>
                      Enter
                    </Button>
                  </Form.Item>
                  <div className='d-flex justify-content-center align-items-center'>
                    Don't have an account?&nbsp;
                    <Link to='/Register'>Register</Link>
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                    Or go back to&nbsp;
                    <Link to='/Login'>Home</Link>
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

export default Reset_Password;
