import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, Layout, message, Upload, Table } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';
import { GrValidate } from "react-icons/gr";

import { HiShare } from "react-icons/hi2";
import noDataFoundImg from "../img/no_app_available11.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { completedpatientdet } from '../reducer/AppointmentUpCom';
import { addPrescription, addPrescriptionApi } from '../reducer/DocPrescription';
const { Dragger } = Upload;
const { Content } = Layout;
const { Option } = Select
const { TextArea } = Input;

function CompletedApp() {

    const { compPatientDet } = useSelector((state) => state.fetchAppointment);
    // const { prescriptions } = useSelector((formDatastate, action) => state.myprescription)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [patientName, setPatientName] = useState('');
    const [app_id, setApp_id] = useState('')
    const [formData, setFormData] = useState({
        Type: ''
    })

    console.log("Setting", formData)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(completedpatientdet());
    }, [dispatch]);



    const showModal = (appointment_id, patient_name) => {
        form.resetFields();
        setIsModalOpen(true);
        console.log("Your share appitnemtnet id--", appointment_id)
        setPatientName(patient_name);
        setApp_id(appointment_id);
        dispatch(addPrescription({ appointment_id: appointment_id }))
    };

    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                console.log('Received values--:', values);
                dispatch(addPrescriptionApi({ ...values }))
                setIsModalOpen(false);
                form.resetFields();
            })
            .catch(errorInfo => {
                console.log('Validation failed--:', errorInfo);
            })

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        console.log('Form values after cancel:', form.getFieldsValue());
    };


    // drag and drop 
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',

        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file);
                console.log(info.fileList);
                // setFormData((...prevState) => {
                //     return {
                //         ...prevState,
                //         [formData.file.uid]: info.fileList
                //     }
                // })
                // console.log(info.fileList[0].originFileObj);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    //Patient option list
    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }




    // Define pagination settings
    const pagination = {
        pageSize: 10, // Number of items per page
        total: compPatientDet?.length, // Total number of items
        showSizeChanger: true, // Allow changing page size
        showQuickJumper: true, // Allow jumping to a specific page
    };

    const columns = [
        {
            title: "No",
            dataIndex: 'number',
            render: (text, record, index) => index + 1,
        },
        {
            title: "Appointment ID",
            dataIndex: "appointment_id",
        },
        {
            title: "Patient Name",
            dataIndex: "first_name",
        },
        {
            title: "Mobile No.",
            dataIndex: "phone_no",
        },
        {
            title: "Appointment Date",
            dataIndex: "appointment_date",
            render: (text) => moment(text).format("DD/MM/YYYY"),
            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
        },
        {
            title: "Appointment Time",
            dataIndex: "appointment_date",
            render: (text) => moment(text).format("HH:mm"),
            // Remove unnecessary filterDropdown and onFilter properties
        },
        {
            title: "Total Fee",
            dataIndex: "charges",
            render: (text) => "₹ " + text

        },
        {
            title: "Status",
            dataIndex: "appointment_status",
            render: (text) => {

                return (
                    <span className={`${text === 'completed' ? 'bg-green-600' : 'bg-red-500'} text-white p-2 rounded-lg text-[0.8rem] flex font-bold`}>
                        {text === 'completed' ? 'Completed' : 'Progress'}
                        <GrValidate className='text-[1.1rem] ml-2 mt-[1.3px]' />
                    </span>
                )
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record, index) => {
                // console.log("My action", text, record, index);
                return (
                    <div>
                        <Button type="" onClick={() => showModal(record.appointment_id, record.first_name)}
                            className='bg-rblue  mr-5 text-white text-[0.8rem] focus-within:bg-rblue font-bold px-5 py-1 flex align-center'>
                            <HiShare className='text-[1.1rem] mr-2 mt-[1.3px]' />  <span>Prescription</span>
                        </Button>
                    </div>
                );
            }
        }

    ];

    return (
        <div>
            <Content className='p-2 m-[82px_10px_0px_5px]'>

                <p className='text-[0.9rem]  mb-3 font-bold'>Completed Appointment</p>
                {
                    compPatientDet && compPatientDet?.length === 0 ? (
                        <div className='bg-white shadow-myshaow mt-10 text-center p-28 rounded-md'>
                            <img src={noDataFoundImg} alt="" className='w-72 h-full m-auto' />
                            <p className='text-[1rem] font-bold'>No Completed Appointments Available</p>
                        </div>) : (
                        <>

                            <Table

                                className='p-2 ' columns={columns} dataSource={compPatientDet} pagination={pagination}></Table>
                            <Modal

                                title={`Share Prescription `}

                                open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ top: 20 }} maskClosable={false} okText="Submit">
                                <Form
                                    layout='vertical'
                                    form={form}
                                    className='prescription_form'
                                    name="prescriptionForm"

                                >
                                    <p className='text-[0.9rem] text-center my-4 font-bold text-sky-500'>
                                        {`Appointment ID: ${app_id} - Appointment Date: ${moment(Array.isArray(compPatientDet) && compPatientDet?.find(patient => patient?.appointment_id === app_id)?.appointment_date).format("DD/MM/YYYY")}`}


                                    </p>

                                    <Form.Item
                                        name="file"
                                        label="Upload File"
                                    >

                                        <Dragger {...props} className="file_upload" name='file'>
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                            <p className="ant-upload-hint">
                                                Support for a single or bulk upload.

                                            </p>
                                        </Dragger>
                                    </Form.Item>
                                    <div>

                                        <Form.Item
                                            name="title"
                                            label="Title"
                                            className='mt-5'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter title !'
                                                }
                                            ]}

                                        >
                                            <Input placeholder='Enter Title' className='focus-within:shadow-none    ' />
                                        </Form.Item>
                                        <Form.Item
                                            // name="title"
                                            label="Patient Name"
                                            className='mt-5'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter title !'
                                                }
                                            ]}
                                        >
                                            <Input placeholder='Enter patinet ' className='focus-within:shadow-none ' value={patientName} readOnly />
                                        </Form.Item>

                                    </div>

                                    <div>
                                        {/* <Form.Item
             name="patientName"
             label='Patient Name'

             rules={[{
                 required: true,
                 message: 'Please enter patient name !'
             }]}
         >
             <Select
                 name=''
                 mode="multiple"
                 allowClear
                 style={{
                     width: '100%',
                 }}
                 placeholder="Please select patient name"
                 // defaultValue={['a10', 'c12']}
                 onChange={(val) => {
                     setFormData(prevState => ({
                         ...prevState,
                         patientName: val || [],
                     }))
                 }}
                 options={options}
             />

         </Form.Item> */}
                                    </div>

                                    <div className='grid grid-cols-2 gap-5'>
                                        <Form.Item
                                            name="prescription_type"
                                            label="Type"
                                            rules={[{ required: true, message: 'Please Select Type!' }]}
                                        >
                                            <Select onChange={(value) => {
                                                console.log("My value: ", value)
                                                setFormData((prevState) => ({
                                                    ...prevState,
                                                    Type: value,
                                                }))
                                            }} >
                                                <Option value="prescription">Prescription</Option>
                                                <Option value="sick_note">Sick Note</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="medicine"
                                            label="Medicine"

                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter medicine !'
                                                }
                                            ]}

                                        >
                                            <Input placeholder='Enter medicine' className='focus-within:shadow-none    ' />
                                        </Form.Item>
                                    </div>


                                    <div className='grid grid-cols-2 gap-5'>

                                        <Form.Item
                                            name="dosage"
                                            label="Dosage"

                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter dosage !'
                                                }
                                            ]}

                                        >
                                            <Input placeholder='Enter dosage' className='focus-within:shadow-none    ' />
                                        </Form.Item>
                                        <Form.Item
                                            name="quantity"
                                            label="Quantity"

                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter quantity !'
                                                },
                                                // required number 
                                                {
                                                    pattern: /^[0-9]+$/,
                                                    message: 'Please enter number'
                                                }



                                            ]}

                                        >
                                            <Input placeholder='Enter quantity' className='focus-within:shadow-none    ' />
                                        </Form.Item>


                                    </div>

                                    {formData.Type === 'sick_note' ? (
                                        <Form.Item
                                            name="instructions"
                                            label="Instruction"
                                            rules={[{ required: false, message: 'Please enter Instruction!' }]}
                                        >

                                            <TextArea rows={4} placeholder='Enter any instruction' />
                                        </Form.Item>
                                    ) : ""}

                                </Form>
                            </Modal>

                        </>
                    )
                }




            </Content>
        </div >
    );
}



export default CompletedApp;
