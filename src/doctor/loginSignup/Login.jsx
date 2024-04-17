import React from 'react';
import mainLogo from "../../img/logo.png"

import { MdEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { Button, Form, Input, Spin } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginDoctor } from '../../reducer/AuthDoctor';

const Login = () => {

    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const onFinish = (values) => {
        dispatch(loginDoctor(values));
        // console.log('Success:', values); 
        // navigate('/');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <>
            <div className='flex justify-center mt-5 mb-3'>
                <img src={mainLogo} alt="logo" width={140} />
            </div>
            <div className='flex justify-center items-center'>

                <div className='login_container flex justify-center items-center shadow-myshadow p-12 bg-white rounded-lg'>
                    <div>

                        <h1 className='text-3xl font-bold text-center'>Login</h1>
                        <p className='mt-2 text-lg text-rgray text-center'>Please login to your doctor account </p>
                        <Form
                            name="basic"
                            layout="vertical"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                width: '100%',
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                className="mt-8"
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Please enter a valid email address.',
                                        validateTrigger: 'onBlur',
                                        validateStatus: 'error',
                                        help: 'Please enter a valid email address',
                                    },


                                    {
                                        required: true,
                                        message: 'Email address is required!',
                                        validateTrigger: 'onBlur',
                                        validateStatus: 'error',
                                        help: 'Email address is required.',
                                    },
                                ]}
                            >
                                <Input className='w-96 py-2 text-base focus-within:shadow-none' placeholder='Enter email address' prefix={<MdEmail className='text-xl mr-2' />}

                                />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password is required!',
                                        validateTrigger: 'onBlur',
                                        validateStatus: 'error',
                                        help: 'Password is required!',
                                    },
                                ]}

                            >
                                <Input.Password className='w-96 py-2 text-base focus-within:shadow-none' placeholder='Enter Password' autoComplete="on" prefix={<BiSolidLockAlt className='text-xl mr-2' />} />
                            </Form.Item>
                            <Link to='/forgotemail' className='text-rgray text-sm items-end flex justify-end -mt-5 hover:text-red-500'>Forgot Password ?</Link>


                            <Form.Item
                                wrapperCol={{
                                    // offset: 5,
                                    // span: 16,
                                }}
                            >
                                <Button className='bg-rblue mt-9 w-full h-full text-white text-base py-2 font-bold' htmlType="submit" disabled={loading}>
                                    {loading ? (<Spin
                                        indicator={
                                            <LoadingOutlined
                                                style={{
                                                    fontSize: 25,
                                                }}
                                                spin
                                            />
                                        }
                                    />) : (<p>Login</p>)}

                                </Button>


                            </Form.Item>
                            <p className='text-black text-sm items-end mt-5 text-[1rem]'>
                                Not registered yet? <Link to='/signup' className='text-rblue underline text-[1rem]'>Create an account</Link>

                            </p>
                        </Form>
                    </div >
                </div >

            </div >
        </>



    );
};

export default Login;
