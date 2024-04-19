import React from 'react';
import mainLogo from "../../img/logo.png"

import { MdEmail } from "react-icons/md";
import { BiSolidLock, BiSolidLockAlt } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineSmartphone } from "react-icons/md";
import { Button, Form, Input, Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateSignUpObj } from '../../reducer/AuthDoctor'
import { addDoctor } from '../../reducer/AuthDoctor';
const { Option } = Select;


const Signup = () => {

    const { loading, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onFinish = (values) => {
        dispatch(addDoctor(values)).then(() => {
            navigate('/');
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className='flex justify-center mt-5 mb-3'>
                <img src={mainLogo} alt="logo" width={140} />
            </div>
            <div className='flex justify-center items-center mb-10'>
                <div className='signup_container flex justify-center items-center shadow-myshadow p-[3rem] bg-white rounded-lg'>
                    <div>
                        {/* <img src="img/login_signup/login-animate.gif" alt="image" /> */}
                    </div>
                    <div>
                        <h1 className='text-3xl font-bold text-center'>Create an account</h1>
                        <p className='mt-2 text-lg text-rgray text-center'>Connect with the patient today!</p>
                        <div className='px-10 py-1 h-[28rem] overflow-y-auto '>
                            <Form
                                name="basic"
                                layout="vertical"
                                labelCol={{ span: 30 }}
                                wrapperCol={{ span: 13 }}
                                style={{ maxWidth: '400px', textWrap: "wrap" }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >

                                <Form.Item
                                    className="mt-8 text-2xl"
                                    label="First Name"
                                    name="first_name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Doctor First Name is required!',
                                            validateTrigger: 'onBlur',
                                            validateStatus: 'error',
                                            help: 'Doctor First Name is required.',
                                        },
                                        {
                                            pattern: /^[a-zA-Z]+$/,
                                            message: 'First names cannot contain any white space, digits or special characters..',
                                        },
                                    ]}
                                >
                                    <Input className='w-96 py-2 text-base focus-within:shadow-none' placeholder='Enter Doctor First name' prefix={<FaUserDoctor className='text-xl mr-2' />} />
                                </Form.Item>

                                <Form.Item
                                    className="mt-8 text-2xl"
                                    label="Last Name"
                                    name="last_name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Doctor Last Name is required!',
                                            validateTrigger: 'onBlur',
                                            validateStatus: 'error',
                                            help: 'Doctor Last Name is required.',
                                        },
                                        {
                                            pattern: /^[a-zA-Z]+$/,
                                            message: 'Last name cannot contain any white space, digits or special characters.',
                                        },
                                    ]}
                                >
                                    <Input className='w-96 py-2 text-base focus-within:shadow-none' placeholder='Enter Doctor Last name' prefix={<FaUserDoctor className='text-xl mr-2' />} />
                                </Form.Item>

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
                                    <Input className='w-96 py-2 text-base focus-within:shadow-none focus-within:bg-none' placeholder='Enter email address' prefix={<MdEmail className='text-xl mr-2' />} />
                                </Form.Item>
                                <Form.Item
                                    className="mt-8"
                                    label="Phone No"
                                    name="phone_no"
                                    rules={[
                                        {
                                            pattern: /^[0-9]+$/,
                                            message: 'Please enter a valid phone number containing only digits.',

                                        },
                                        {
                                            pattern: /^[0-9]{10}$/,
                                            message: 'Please enter a valid 10-digit phone number.',
                                            validateTrigger: 'onBlur',
                                            validateStatus: 'error',
                                            help: 'Phone number must be at least 10 digits long.',
                                        },
                                        {
                                            required: true,
                                            message: 'Phone number is required!',
                                            validateTrigger: 'onBlur',
                                            validateStatus: 'error',
                                            help: 'Phone number is required.',
                                        },

                                    ]}
                                >
                                    <Input className='w-96 py-2 text-base focus-within:shadow-none' placeholder='Enter Phone no' prefix={<MdOutlineSmartphone className='text-xl mr-2' />} />


                                </Form.Item>
                                <Form.Item
                                    name="gender"
                                    label="Gender"
                                    rules={[{ required: true, message: ' Select Gender!' }]}
                                >
                                    <Select
                                        className='text-base focus-within:shadow-none'
                                        style={{ width: "184%", height: "43px" }}
                                        placeholder="Select your gender"
                                    //  onChange={(value) => {
                                    //     setFormData((prevState) => ({
                                    //         ...prevState,
                                    //         Type: value,
                                    //     }))
                                    // }}
                                    >
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Password is required!',
                                            validateTrigger: 'onBlur',
                                            validateStatus: 'error',
                                            help: 'Password is required.',
                                        },
                                        {
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                            message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character.',
                                        },
                                    ]}
                                    min={5}
                                // hasFeedback
                                >
                                    <Input.Password autoComplete="on" className='w-96 py-2 text-base focus-within:shadow-none' prefix={<BiSolidLock className='text-xl mr-2' />}
                                        suffix={<div className="bg-black text-white px-4 py-2 rounded">Suggestion</div>}
                                    />
                                </Form.Item>

                                <Form.Item
                                    className='text-8xl'
                                    name="confirm_password"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Confirm password is required!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password autoComplete="on" className='w-96 py-2 text-base focus-within:shadow-none' prefix={<BiSolidLockAlt className='text-xl mr-2' />} />
                                </Form.Item>



                                <Form.Item
                                    wrapperCol={{
                                        // offset: 5,
                                        // span: 16,
                                    }}
                                >
                                    <Button className='bg-rblue mt-9 w-full h-full text-white text-base py-2 font-bold ' htmlType="submit" disabled={loading}>
                                        {loading ? (<Spin
                                            indicator={
                                                <LoadingOutlined
                                                    style={{
                                                        fontSize: 25,
                                                    }}
                                                    spin
                                                />
                                            }
                                        />) : 'Create account'}
                                    </Button>


                                </Form.Item>
                                <p className='text-black text-sm items-end mt-5 text-[1rem]'>
                                    Already have an account ?
                                    <Link to='/' className='text-rblue underline '>Login </Link>

                                </p>
                            </Form>
                        </div>

                    </div>
                </div>

            </div >
        </>


    );

}

export default Signup;