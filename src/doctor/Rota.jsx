import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import * as moment from 'moment'
import { Button, Modal, Form, Input, Select, Layout, Tabs, DatePicker, TimePicker, message } from 'antd';
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select

function Rota() {

    const { addRota } = useSelector((state) => state.newRota);
    console.log("Your add rota is--", addRota);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const slots = {
        rota_date: "",
        rota_time: "",
        duration: '',
        price: '',
    }

    const [createRota, setRota] = useState(slots);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);


    const showModal = () => {
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleOk = () => {

        form
            .validateFields()
            .then(values => {
                // console.log('Received values:', values);

                // addRota(values);
                let startDate = values.rota_date[0];
                let endDate = values.rota_date[1];
                let startTime = values.rota_time[0];
                let endTime = values.rota_time[1];

                const duration = parseInt(values.duration);

                const dateDiff1 = endDate.diff(startDate, 'days') + 1;
                console.log("date-diff1", dateDiff1);

                const dates = [];
                for (let i = 0; i < dateDiff1; i++) {
                    dates.push(startDate.clone().add(i, 'days'));
                    console.log("date obj", dates, i);
                }

                setSelectedDates(dates);


                const totalMinutes = dayjs(endTime).diff(startTime, 'minutes');
                console.log("Total minutes: " + totalMinutes);

                const numSlots = Math.ceil(totalMinutes / duration);
                console.log("numSlots", numSlots);

                const timeSlots = [];
                let currentSlotStart = startTime.clone();
                for (let i = 0; i < numSlots; i++) {

                    const currentSlotEnd = currentSlotStart.clone().add(duration, 'minutes');
                    console.log("CurrentSlotEnd", currentSlotEnd);

                    timeSlots.push([currentSlotStart.format('HH:mm'), currentSlotEnd.format('HH:mm')]);
                    currentSlotStart = currentSlotEnd;

                    console.log("CurrentSlot start--", currentSlotStart);
                    console.log("CurrentSlot End--", currentSlotEnd);

                }

                console.log('Time Slots:', timeSlots);

                // if (dateDiff > 365 || timeDiff > 87) {
                //     message.error("The selected time period is too large.");
                //     return false;
                // } else {
                //     setState({...state, rota_dates: diff_range, rota_times: time_range})
                //     setIsModalOpen(false);
                // }



                // if (dateDiff > 0 && timeDiff > 0) {

                // }
                // else {
                //     alert("Please select valid date and time")
                // }





                // dispatch(addRota(action.payload))

                // Generate time slots
                const timeSlots1 = generateTimeSlots(startDate, endDate, startTime, endTime, duration);
                setTimeSlots(timeSlots1);
                setRota({
                    // ...createRota,
                    start_date: values.rota_date[0],
                    end_date: values.rota_date[1],
                    start_time: values.rota_time[0],
                    end_time: values.rota_time[1],
                    duration: values.duration,
                    price: values.price,
                    diff_range: selectedDates,
                    timeSlots: timeSlots
                });

                console.log("SetRota", createRota);


                // setDataTable([...dataTable, values]);

                setIsModalOpen(false);
                form.resetFields();

                // console.log('Form values after reset:', form.getFieldsValue());
            })
            .catch(errorInfo => {
                console.log('Validation failed:', errorInfo);
            })

    };



    const generateTimeSlots = (startDate, endDate, startTime, endTime, duration) => {
        const slots = [];
        let currentDate = dayjs(startDate);
        const endDateTime = dayjs(endDate).endOf('day');


        while (currentDate.isBefore(endDateTime, 'day') || currentDate.isSame(endDateTime, 'day')) {
            let currentSlotStart = currentDate.set('hour', startTime.hour()).set('minute', startTime.minute());
            const endDateTime = currentDate.set('hour', endTime.hour()).set('minute', endTime.minute());

            // console.log("print--currentSlotStart", currentSlotStart);
            // console.log("print--endDateTime", endDateTime);

            while (currentSlotStart.isBefore(endDateTime)) {
                const currentSlotEnd = currentSlotStart.add(duration, 'minutes');
                slots.push({
                    date: currentSlotStart.format('YYYY-MM-DD'),
                    start: currentSlotStart.format('HH:mm'),
                    end: currentSlotEnd.format('HH:mm')
                });
                currentSlotStart = currentSlotEnd;
            }
            currentDate = currentDate.add(1, 'day').startOf('day');
        }

        return slots;
    };

    const handleCancel = () => {
        setIsModalOpen(false);

    };


    const disabledDate = (current) => {
        return current && current < dayjs().startOf('day');
    };

    const handleFormChange = (changedValues, allValues) => {
        // console.log(changedValues);
        setRota(allValues)
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
                <div className='bg-white py-5 flex justify-end rounded-md'>
                    <Button type="" onClick={showModal} className='bg-rblue mr-5 text-white text-[0.8rem] focus-within:bg-rblue font-bold px-5 py-1 flex align-center'>
                        <span>Add Rota</span>
                    </Button>
                    <Modal title="Add Rota" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ top: 20 }} maskClosable={false} okText="Submit">
                        <Form
                            form={form}
                            layout='vertical'
                            className='prescription_form'
                            name="prescriptionForm"
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
                                    <Select onChange={(value) => {
                                        setRota((prevState) => ({
                                            ...prevState,
                                            duration: value,
                                        }))

                                    }}
                                        style={{ width: "14.5rem" }}    >
                                        <Option value="30">30 Min</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="price"
                                    label='Price'

                                    rules={[{
                                        required: true,
                                        message: 'Please enter price !'
                                    }]}
                                    style={{ width: "14.5rem" }}
                                >
                                    <Input />

                                </Form.Item>

                            </div>


                        </Form>
                    </Modal>
                </div>


                {
                    slots?.length <= 0 ? (<p>No Slots</p>) : (
                        <div className='mt-10 bg-white p-10 rounded-lg overflow-uto'>
                            <Tabs defaultActiveKey="1" tabPosition="top">
                                {selectedDates.map((date, index) => (
                                    <Tabs.TabPane tab={date.format('ddd, MMM DD, YYYY')} key={index + 1}>
                                        <div className='grid grid-cols-8 gap-7 overflow-y-scroll max-h-72 py-3 px-2'>
                                            {timeSlots.map((slot, slotIndex) => {
                                                if (slot.date === date.format('YYYY-MM-DD')) {
                                                    return (
                                                        <Button key={slotIndex} className='flex align-center gap-1 justify-center'>
                                                            {slot.start} - {slot.end}
                                                        </Button>
                                                    );
                                                }
                                            })}
                                        </div>
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