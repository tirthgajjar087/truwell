import React from 'react';
import { MdEmail } from "react-icons/md";
import mainLogo from "../../img/logo.png"

import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";

function ForgotEmail() {

    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);

        navigate('/otpforgotverification');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (

        <>
            <div className='flex justify-center mt-5 mb-3'>
                <img src={mainLogo} alt="logo" width={140} />
            </div>
            <div className='flex justify-center items-center '>
                <div className='login_container flex justify-center items-center shadow-myshadow p-12 bg-white rounded-lg'>
                    <div>
                        {/* <img src="img/login_signup/login-animate.gif" alt="image" /> */}
                    </div>
                    <div>
                        <h1 className='text-3xl font-bold text-center'>Forgot Password</h1>
                        <p className='mt-2 text-base text-rgray text-center'>Enter your register email for the verification process.<br />we will send 5 digit code to your email.</p>
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
                                name="Email"
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
                                <Input className='w-[26rem] py-2 text-base focus-within:shadow-none' placeholder='Enter register email address' prefix={<MdEmail className='text-xl mr-2' />} />
                            </Form.Item>


                            <Form.Item
                                wrapperCol={{
                                    // offset: 5,
                                    // span: 16,
                                }}
                            >
                                <Button className='bg-rblue mt-9 w-full h-full text-white text-base py-2 font-bold hover:bg-black' htmlType="submit">
                                    Reset your password
                                </Button>


                            </Form.Item>
                            <p className='text-black text-sm text-center mt-5 text-[1rem]'>
                                Back to <Link to='/' className='text-rblue underline '>Login ? </Link>

                            </p>
                        </Form>
                    </div>
                </div>

            </div>
        </>

    )
}

export default ForgotEmail