import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import * as moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { LuCalendarDays } from "react-icons/lu";
import noDataFoundImg from "../img/no_appointment_found.jpg";
import { Button, Modal, Form, Input, Select, Layout, Tabs, DatePicker, TimePicker, message } from 'antd';
import { getRotaSlotsApi, getRotadateApi } from '../reducer/RotaReducer';
import { rotaApi } from '../reducer/RotaReducer';
import noAppImg from "../img/no-slots.svg";
import { useParams } from 'react-router';
import { getDocDetails } from '../reducer/EditProfile';
import Skeleton from './Skeleton';
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

function Rota() {
    const { addRota, isLoading, check_status } = useSelector((state) => state.newRota);
    const { docDetails } = useSelector((state) => state.DocEditProfile);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const slots = {
        rota_date: "",
        rota_time: "",
        duration: '',
        price: '',
    };
    const [createRota, setRota] = useState(slots);

    useEffect(() => {
        dispatch(getRotadateApi(id));
        dispatch(getDocDetails(id));
    }, [id, dispatch]);

    const showModal = () => {
        form.resetFields();
        setRota(slots);

        console.log("Yeah opme moal", docDetails)

        form.setFieldsValue({
            price: docDetails?.doctor_information?.charges,
        })

        if (!isDocProfileFilled()) {
            message.error('Please fill all values in the edit profile.');
            setIsModalOpen(false);
            return;
        }
        else {
            setIsModalOpen(true);
        }
    };

    const isDocProfileFilled = () => {
        console.log("Cheking doc profile in rota --:", docDetails)

        if (!docDetails) return false;
        return (docDetails.user.first_name && docDetails.user.last_name && docDetails.user.email && docDetails.user.phone_no && docDetails?.user?.gender && docDetails?.doctor_information?.charges && docDetails?.doctor_information?.specialization && docDetails?.doctor_information?.about && docDetails?.hospital_data?.name && docDetails?.hospital_data?.address && docDetails?.hospital_data?.city);
    };

    const handleTabChange = (key, date) => {
        console.log("Tab changed:", key);
        console.log("Date associated with the tab:", date);
        dispatch(getRotaSlotsApi(date))
    };


    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                let startDate = values.rota_date[0];
                let endDate = values.rota_date[1];
                let startTime = values.rota_time[0].format();
                let endTime = values.rota_time[1].format();
                let for_date = startDate.format("DD-MM-YYYY") + "," + endDate.format("DD-MM-YYYY");
                let duration = parseInt(values.duration);

                console.log("For date is--", for_date);
                console.log("start Time is---", startTime)
                console.log("End Time is---", endTime)

                const sendRotaData = {
                    startTime: startTime,
                    endTime: endTime,
                    for_date: for_date,
                    duration: duration,
                    price: parseInt(values.price),
                }
                console.log("Send Rota data-:", sendRotaData);


                if (check_status) {
                    alert("noo");
                    form.resetFields();
                    setIsModalOpen(true);
                } else {
                    setIsModalOpen(false);
                }

                dispatch(rotaApi(sendRotaData)).then((result) => {
                    const { payload, error } = result
                    console.log("My result i---", result);

                    if (!error) {
                        // API call succeeded
                        const { status } = payload;
                        if (status === 200) {
                            // Status is 200, close the modal
                            setIsModalOpen(false);
                            message.success(payload.message);
                        } else {
                            // Status is not 200, show error message
                            setIsModalOpen(true);
                            message.error(payload.message);
                        }
                        dispatch(getRotadateApi(id));
                    }
                    dispatch(getRotadateApi(id))
                }).catch(() => {
                    dispatch(getRotadateApi(id))
                    // setIsModalOpen(true);
                });


            })
            .catch(errorInfo => {
                console.log('Validation failed:', errorInfo);
            })

    };



    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const disabledDate = (current) => {
        return current && current < dayjs().startOf('day');
    };

    const handleFormChange = (changedValues, allValues) => {
        console.log(changedValues);
        // addRota(allValues)
    };



    //Patient option list
    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }

    return (
        <>
            <Content className='p-2 m-[82px_10px_0px_14px]'>
                <p className='text-[0.9rem] mb-3 font-bold'>Rota</p>
                <div className='bg-white py-5 flex justify-end rounded-md'>


                    <Button type="" onClick={showModal} className='bg-rblue mr-5 text-white text-[0.8rem] focus-within:bg-rblue font-bold px-5 py-1 flex align-center'>
                        <span>Add Rota</span>
                    </Button>

                    <Modal title="Add Rota" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ top: 20 }} maskClosable={false} okText="Submit">
                        <Form
                            form={form}
                            layout='vertical'
                            className='prescription_form'
                            name="rotaForm"
                            initialValues={createRota}
                            onValuesChange={handleFormChange}
                        >
                            <Form.Item
                                name="rota_date"
                                label='Select Rota Date'

                                rules={[{
                                    required: true,
                                    message: 'Please enter rota date !'
                                }]}
                            >

                                <RangePicker disabledDate={disabledDate}
                                    format={"DD-MM-YYYY"}
                                    // onChange={(value) => {
                                    //     setRota((prevState) => ({
                                    //         ...prevState,
                                    //         rota_start_time: value[0],
                                    //         rota_end_time: value[1]
                                    //     }))

                                    // }} 
                                    className="w-full"
                                />

                            </Form.Item>
                            <Form.Item
                                name="rota_time"
                                label="Select Rota Time"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter rota time !'
                                    }
                                ]}
                            >
                                <TimePicker.RangePicker
                                    minuteStep={30}
                                    format="HH:mm"
                                    className="w-full ok_btn"
                                />

                            </Form.Item>

                            <div className='flex gap-5'>

                                <Form.Item
                                    name="duration"
                                    label='Select Duration'

                                    rules={[{
                                        required: true,
                                        message: 'Please enter duration !'
                                    }]}
                                >
                                    <Select
                                        // onChange={(value) => {
                                        //     setRota((prevState) => ({
                                        //         ...prevState,
                                        //         duration: value,
                                        //     }))

                                        // }}
                                        style={{ width: "14.5rem" }}    >
                                        <Option value="30">30 Min</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="price"
                                    label='Fee'

                                    rules={[{
                                        required: true,
                                        message: 'Please enter price !'
                                    }]}
                                    style={{ width: "14.5rem" }}
                                >
                                    <Input disabled />

                                </Form.Item>

                            </div>


                        </Form>
                    </Modal>
                </div>


                {
                    addRota?.available_date?.length <= 0 ? (
                        <>
                            <div className='bg-white shadow-myshaow mt-10 text-center p-16 rounded-md'>
                                <img src={noDataFoundImg} alt="" className='w-[22rem] h-full m-auto' />
                                <p className='text[1rem] font-bold'>No Rota date & time Found</p>
                            </div>
                        </>
                    ) : (
                        <div className='mt-10 bg-white p-10 rounded-lg overflow-auto h-[380px]'>

                            <Tabs defaultActiveKey="1" tabPosition="top" onChange={(key) => handleTabChange(key, addRota?.available_date[key - 1])}>

                                {addRota?.available_date?.map((date, index) => (
                                    <Tabs.TabPane key={index + 1} tab={moment(date).format('DD-MM-YYYY')}>
                                        {
                                            isLoading ? (
                                                <div className='grid grid-cols-8 gap-7 py-3 px-2'>
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                </div>
                                            ) : (
                                                addRota?.available_slots.length <= 0 ? (
                                                    <div className='text-center mt-14'>
                                                        <img src={noAppImg} alt="" className='w-[90px] m-auto' />
                                                        <p className='mt-4 font-bold text-[1rem]'>No Rota available </p>
                                                    </div>) : (
                                                    <div className='grid grid-cols-8 gap-7 overflow-y-scroll h-[200] py-3 px-2'>
                                                        {
                                                            addRota?.available_slots.map((slot, slotIndex) => {
                                                                // console.log(slot);
                                                                return (
                                                                    <Button key={slotIndex} className={`${slot.status === 'booked' ? '!bg-green-700 font-semibold !text-white hover:bg-green-500' : 'bg-red-500'}flex align-center gap-1 justify-center px-2`} >

                                                                        {moment(slot.start_time, 'YYYY-MM-DD,HH:mm').format('HH:mm')} - {moment(slot.end_time, 'YYYY-MM-DD,HH:mm').format('HH:mm')}
                                                                    </Button>


                                                                )
                                                            })

                                                        }

                                                    </div>)


                                            )
                                        }

                                    </Tabs.TabPane>
                                ))}
                            </Tabs>
                        </div>

                    )
                }


            </Content >
        </>
    )
}
export default Rota;


