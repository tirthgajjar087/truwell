import React, { useEffect, useState } from 'react';
import moment from 'moment';
import defaultUserImg from "../img/user.webp";
import { Button, Form, Input, Select, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'antd';
import { MdEmail } from "react-icons/md";
import { useParams } from 'react-router';
import { MdOutlineSmartphone } from "react-icons/md";
import { getDocDetails, updateDocEditProfile } from '../reducer/EditProfile';
const { Content } = Layout;
const { Option } = Select;

function DoctorProfile() {

    const { docDetails, isLoading } = useSelector((state) => state.DocEditProfile)

    const dispatch = useDispatch();
    const [file, setFile] = useState();
    const [form] = Form.useForm();

    const { id } = useParams();
    console.log("ID-:", id)





    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const onFinish = (values) => {
        values.id = id
        console.log('Success:', values);
        dispatch(updateDocEditProfile(values))
        dispatch(getDocDetails(id));
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        dispatch(getDocDetails(id));
    }, [dispatch, id, getDocDetails]);







    useEffect(() => {
        if (docDetails) {
            form.setFieldsValue({
                id: id,
                first_name: docDetails?.user?.first_name,
                last_name: docDetails?.user?.last_name,
                email: docDetails?.user?.email,
                phone_no: docDetails?.user?.phone_no,
                gender: docDetails?.user?.gender,
                dob: moment(docDetails?.user?.dob),
                language: docDetails?.doctor_information?.language.split(","),
                charges: docDetails?.doctor_information?.charges,
                specialization: docDetails?.doctor_information?.specialization,
                about: docDetails?.doctor_information?.about,
                hospital_name: docDetails?.hospital_data?.name,
                hospital_address: docDetails?.hospital_data?.address,
                city: docDetails?.hospital_data?.city,
                state: docDetails?.hospital_data?.state,
                country: docDetails?.hospital_data?.country,
                pincode: docDetails?.hospital_data?.pincode,
            });
        }
    }, [form, docDetails]);




    return (
        <>

            {
                isLoading ? (<Content className='p-2 m-[82px_10px_0px_14px]'>
                    <p>Loading...</p>
                </Content>
                ) :
                    (
                        <>
                            <Content className='p-2 m-[82px_10px_0px_14px]'>
                                <p className='text-[0.9rem]  mb-3 font-bold'>Edit Profile</p>

                                <div className='bg-white rounded-md p-9'>
                                    <Form
                                        form={form}
                                        name="basic"
                                        layout='vertical'
                                        labelCol={{
                                            span: 14,
                                        }}
                                        wrapperCol={{
                                            span: 30,
                                        }}
                                        style={{
                                            // maxWidth: 600,
                                        }}
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <div className='flex justify-end'>

                                            <Button type="primary" htmlType="submit" className='bg-rblue px-10'>
                                                Save
                                            </Button>
                                        </div>
                                        <div className='m-auto'>

                                            <img src={file ? file : defaultUserImg} className='w-[100px] h-[100px] rounded-xl m-auto' alt='user image' />


                                            <input type="file" onChange={handleChange} className='m-auto' />
                                        </div>
                                        <div className='grid grid-cols-3 gap-10 mt-10'>

                                            <Form.Item
                                                label="First Name"
                                                name="first_name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Doctor First Name is required!',
                                                        validateTrigger: 'onBlur',
                                                        validateStatus: 'error',
                                                        help: 'Doctor  First Name is required.',
                                                    },
                                                ]}
                                            >
                                                <Input className='w-[100%] md:w-50 sm:w-30' placeholder='Enter Doctor Firstname' value={docDetails ? docDetails.first_name : "w"} disabled />

                                            </Form.Item>

                                            <Form.Item
                                                label="Last Name"
                                                name="last_name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Doctor  LastName is required!',
                                                        validateTrigger: 'onBlur',
                                                        validateStatus: 'error',
                                                        help: 'Doctor Last Name is required.',
                                                    },
                                                ]}
                                            >
                                                <Input className='w-[100%] md:w-50 sm:w-30' placeholder='Enter Doctor Last name' disabled />

                                            </Form.Item>

                                        </div>
                                        <h5 className='mt-5 mb-5 text-sm font-bold text-gray-500'>Personal Information</h5>
                                        <div className='grid grid-cols-3 gap-10 max-md:grid-cols-2 overflow-hidden flex-wrap'>

                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[
                                                    {
                                                        type: 'email',
                                                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                        message: ' enter a valid email address.',
                                                        validateTrigger: 'onBlur',
                                                        validateStatus: 'error',
                                                        help: ' enter a valid email address',
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
                                                <Input
                                                    className='w-[100%] md:w-50 sm:w-30' placeholder='Enter Email address' prefix={<MdEmail className='text-xl mr-2 text-gray-600' />} />


                                            </Form.Item>

                                            <Form.Item
                                                label="Phone No"
                                                name="phone_no"
                                                rules={[
                                                    {
                                                        pattern: /^[0-9]+$/,
                                                        message: ' enter a valid phone number containing only digits.',

                                                    },
                                                    {
                                                        min: 10,
                                                        message: 'Phone number must be at least 10 digits long.',
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
                                                <Input
                                                    className='w-[100%] md:w-50 sm:w-30' placeholder='Enter Doctor name' prefix={<MdOutlineSmartphone className='text-xl mr-2 ' />} />


                                            </Form.Item>
                                            <Form.Item
                                                name="gender"
                                                label="Gender"
                                                rules={[{ required: true, message: ' Select Gender!' }]}
                                            >
                                                <Select
                                                    className='w-[100%] md:w-50 sm:w-30'
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

                                        </div>
                                        {/* Div 1 */}

                                        <div className='grid grid-cols-3 gap-10 mt-4'>


                                            <Form.Item
                                                name="dob"
                                                label="Date of Birth"
                                                rules={[{ required: true, message: ' Select Date of Birth!' }]}
                                            >
                                                <DatePicker
                                                    format={"DD-MM-YYYY"}
                                                    className='w-[100%] md:w-50 sm:w-30' placeholder='Enter Date of Birth'
                                                // onChange={onChange}
                                                />

                                            </Form.Item>



                                            <Form.Item label="Language" name="language" rules={[{ required: true, message: ' select language !' }]}>
                                                <Select mode="multiple" className='w-[100%] md:w-50 sm:w-30' placeholder="Select language">
                                                    <Option value="english">English</Option>
                                                    <Option value="hindi">Hindi</Option>
                                                    <Option value="gujarati">Gujarati</Option>
                                                    <Option value="marathi">Marathi</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="Fee"
                                                name="charges"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Doctor Fee is required!',

                                                    },
                                                ]}
                                            >
                                                <Input className='w-[100%] md:w-50 sm:w-30' placeholder='Enter Doctor First name' />

                                            </Form.Item>
                                        </div>
                                        <h5 className='mt-5 mb-5 text-sm font-bold text-gray-500'>Doctor Information</h5>
                                        <div className='grid grid-cols-3 gap-10 max-md:grid-cols-2 overflow-hidden flex-wrap'>

                                            <Form.Item label="Specialization" name="specialization" rules={[{ required: true, message: ' select specialization!' }]}>
                                                <Select className='w-[100%] md:w-50 sm:w-30' placeholder="Select specialization">
                                                    <Option value="Cardiology">Cardiology</Option>
                                                    <Option value="Nephrology">Nephrology</Option>
                                                    <Option value="Dermatology">Dermatology</Option>
                                                    <Option value="Dentist">Dentist</Option>
                                                    <Option value="Orthopaedist">Orthopaedist</Option>
                                                </Select>
                                            </Form.Item>

                                            <Form.Item label="About" name="about"
                                                rules={[{ required: true, message: 'Doctor About is required!' }]}
                                            >
                                                <Input.TextArea className='w-[100%] md:w-50 sm:w-30' rows={4} placeholder='Enter information about the doctor' />
                                            </Form.Item>

                                        </div>

                                        <h5 className='mt-5 mb-5 text-sm font-bold text-gray-500'>Clinic Information</h5>

                                        <div className='grid grid-cols-3 gap-10 max-md:grid-cols-2 overflow-hidden flex-wrap'>

                                            <Form.Item label="Hospital Name" name="hospital_name" rules={[{ required: true, message: 'Hospital Name is required!' }]}>
                                                <Input className='w-[100%] md:w-50 sm:w-30' placeholder='Enter hospital name' />
                                            </Form.Item>

                                            <Form.Item label="Hospital Address" name="hospital_address" rules={[{ required: true, message: 'Hospital Address is required!' }]}>
                                                <Input className='w-[100%] md:w-50 sm:w-30' placeholder='Enter hospital address' />
                                            </Form.Item>
                                            <Form.Item label="City" name="city" rules={[{ required: true, message: 'City is required!' }]}>
                                                <Select className='w-[100%] md:w-50 sm:w-30' placeholder="Select city">
                                                    <Option value="Ahmedabad">Ahmedabad</Option>
                                                    <Option value="Surat">Surat</Option>
                                                    <Option value="Noida">Noida</Option>
                                                    <Option value="Delhi">Delhi</Option>
                                                    <Option value="Goa">Goa</Option>
                                                    <Option value="Mumbai">Mumbai</Option>
                                                    <Option value="Bihar">Bihar</Option>
                                                    <Option value="Bangalore">Bangalore</Option>
                                                    <Option value="UP">UP</Option>
                                                    <Option value="Pune">Pune</Option>
                                                    <Option value="Nashik">Nashik</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>

                                        <div className='grid grid-cols-3 gap-10 max-md:grid-cols-2 overflow-hidden flex-wrap'>
                                            <Form.Item label="State" name="state" rules={[{ required: true, message: 'State is required!' }]}>
                                                <Input className='w-[100%] md:w-50 sm:w-30' placeholder='Enter state' />
                                            </Form.Item>

                                            <Form.Item label="Pincode" name="pincode" rules={[
                                                {
                                                    required: true,
                                                    message: 'Pincode is required!'
                                                },
                                                {
                                                    pattern: /^[0-9]+$/,
                                                    message: ' enter a valid phone number containing only digits.',

                                                }
                                            ]}>
                                                <Input className='w-[100%] md:w-50 sm:w-30' placeholder='Enter pincode' />
                                            </Form.Item>
                                        </div>


                                    </Form >
                                </div >



                            </Content >

                        </>
                    )
            }

        </>
    )
}

export default DoctorProfile