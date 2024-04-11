import React from 'react';
import mainLogo from "../../img/logo.png"

import { BiSolidLock, BiSolidLockAlt } from "react-icons/bi";
import { Button, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom";



export default function ForgotPassword() {

    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        navigate('/login');

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <> <div className='flex justify-center mt-5 mb-3'>
            <img src={mainLogo} alt="logo" width={140} />
        </div>
            <div className='flex justify-center items-center'>
                <div className='signup_container flex justify-center items-center shadow-myshadow p-12 bg-white rounded-lg'>
                    <div>
                        {/* <img src="img/login_signup/login-animate.gif" alt="image" /> */}
                    </div>
                    <div>
                        <h1 className='text-center text-3xl font-bold '>Create New Password
                        </h1>
                        <p className='text-center mt-2 text-lg text-rgray'>Your new password must be different <br />from previous used password. </p>
                        <div className='mt-8'>
                            <Form
                                name="basic"
                                layout="vertical"
                                labelCol={{
                                    span: 40,
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
                                    name="new password"
                                    label="New Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Password is required!',
                                            validateTrigger: 'onBlur',
                                            validateStatus: 'error',
                                            help: 'Password is required.',
                                        },
                                    ]}
                                    min={5}
                                // hasFeedback
                                >
                                    <Input.Password className='w-96 py-2 text-base focus-within:shadow-none' autoComplete="on" prefix={<BiSolidLock className='text-xl mr-2' />} />
                                </Form.Item>

                                <Form.Item
                                    className='text-8xl'
                                    name="confirm"
                                    label="Confirm New Password"
                                    dependencies={['new password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Confirm password is required!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('new password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password className='w-96 py-2 text-base focus-within:shadow-none' autoComplete="on" prefix={<BiSolidLockAlt className='text-xl mr-2' />} />
                                </Form.Item>



                                <Form.Item
                                    wrapperCol={{
                                        // offset: 5,
                                        // span: 16,
                                    }}
                                >
                                    <Button className='bg-rblue mt-5 w-full h-full text-white text-base py-2 font-bold hover:bg-black' htmlType="submit">
                                        Reset Password
                                    </Button>


                                </Form.Item>

                            </Form>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}
