import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, Layout, message, Upload, Table } from 'antd';
import noDataFoundImg from "../img/no_app_2.avif"
import moment from 'moment';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { DeletePrescriptionApi, EditPrescription, EditPrescriptionApi, deletePrescription, getPrescriptionApi } from '../reducer/DocPrescription';
const { confirm } = Modal;
const { TextArea } = Input;
const { Dragger } = Upload;
const { Content } = Layout;
const { Option } = Select

function Prescription() {
    const { getPres, isLoading } = useSelector((state) => state.myprescription);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [filterValue, setFilterValue] = useState('all');
    const [formData, setFormData] = useState({
        Type: ''
    })

    const [app_id, setApp_id] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPrescriptionApi());
        console.log("My form data is--:", formData)
    }, [dispatch, getPrescriptionApi, formData]);

    console.log("getpres", getPres)


    const showModal = (id, patient_name, dosage, instructions, medicine, prescription_type, quantity, title, appointment_id) => {
        form.resetFields();
        setIsModalOpen(true);
        dispatch(EditPrescription({ id: id }))
        setApp_id(appointment_id);
        form.setFieldsValue({
            title: title,
            patient_name: patient_name,
            prescription_type: prescription_type,
            medicine: medicine,
            dosage: dosage,
            quantity: quantity,
            app_id: id,
            instructions: instructions
        });
        console.log("Your share appitnemtnet id--", appointment_id)
        setFormData((prevState) => ({
            ...prevState,
            Type: prescription_type,
        }))

        console.log("Your form data is--:", formData)
    };
    const handleFilterChange = (value) => {
        setFilterValue(value);
    };

    // Filtered data based on selected filter value
    const filteredData = getPres.filter(item => {
        if (filterValue === 'all') {
            return true;
        } else {
            return item.prescription_type === filterValue;
        }
    });


    const handleOk = () => {
        form
            .validateFields()
            .then(values => {
                console.log('Received values--:', values);
                dispatch(EditPrescriptionApi({ ...values })).then(() => {
                    dispatch(getPrescriptionApi());
                })
                setIsModalOpen(false);
            })
            .catch(errorInfo => {
                console.log('Validation failed:', errorInfo);
            })

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        console.log('Form values after cancel:', form.getFieldsValue());
    };

    const showDeleteConfirm = (id, app_id) => {
        console.log("Your id is: ", id);
        dispatch(deletePrescription({ id: id }));
        confirm({
            title: `Are you sure you want to delete prescription for Appointment id ${app_id} ?`,
            icon: <ExclamationCircleFilled />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk(value) {
                console.log('OK');
                dispatch(DeletePrescriptionApi(value)).then(() => {
                    dispatch(getPrescriptionApi());
                })
                Modal.destroyAll();
            },
            onCancel() {
                console.log('Cancel');
                Modal.destroyAll();

            },
        });
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



    const pagination = {
        pageSize: 10, // Number of items per page
        total: getPres?.length, // Total number of items
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
            dataIndex: "patient_name",
        },
        {
            title: "Title",
            dataIndex: "title",
            style: {
                width: "200px",
                backgroundColor: 'red'
            },
        },
        {
            title: "Prescription type",
            dataIndex: "prescription_type",
            render: (text) => {
                return (
                    <span className={`${text === "prescription" ? 'bg-blue-500' : 'bg-red-500'} text-white px-3 py-1 rounded-lg`}>
                        {text === 'prescription' ? "Prescription" : "Sick Note"}
                    </span>
                );
            },
        }, {
            title: "Dosage",
            dataIndex: "dosage",
        }, {
            title: "Quantity",
            dataIndex: "quantity",
        },
        {
            title: "Medicine",
            dataIndex: "medicine",
        },
        {
            title: "Issued date",
            dataIndex: "created_at",
            render: (text) => moment(text).format("DD/MM/YYYY"),
        },
        {
            title: "Action",
            dataIndex: "action",

            render: (text, record, index) => {
                console.log("My action", text, record, index);
                return (
                    <div className='grid grid-cols-2 gap-5'>
                        <Button type="" onClick={() => showModal(record.id, record.patient_name, record.dosage, record.instructions, record.medicine, record.prescription_type, record.quantity, record.title, record.appointment_id)}
                            className='!bg-rblue hover:!bg-rblue '>
                            <span><FiEdit className='text-[1.1rem] text-white' /></span>
                        </Button>

                        <Button type="" onClick={() => showDeleteConfirm(record.id, record.appointment_id)}

                            className='!bg-red-500 hover:!bg-red-500 hover:!border-none hover:!text-red-500'>

                            <span><AiOutlineDelete className='text-[1.2rem] text-white font-bold' /></span>
                        </Button>
                    </div>
                );
            }
        }
    ];

    return (
        <div>
            <Content className='p-2 m-[82px_10px_10px_5px]'>
                <p className='text-[0.9rem]  mb-3 font-bold'>Share Prescription</p>
                {
                    Array.isArray(getPres) && getPres?.length <= 0 ? (
                        <>
                            <div className='bg-white shadow-myshaow mt-5 text-center p-32 rounded-md'>
                                <img src={noDataFoundImg} alt="" className='w-[33%] h-full m-auto' />
                                <p className='text-[1rem] font-bold'>No Prescription Provided By You</p>
                            </div>
                        </>) : (
                        <>
                            <div className='flex justify-end mb-3'>
                                <Select name="" id="" className='bg-white rounded-md w-48' onChange={handleFilterChange} value={filterValue}>
                                    <Option className='p-4' value='all'>All Type</Option>
                                    <Option value="prescription">Only Prescription</Option>
                                    <Option value="sick_note">Only Sick note</Option>
                                </Select>
                            </div>

                            <Table
                                rowKey={(record) => record.id}
                                className='p-2 prescription_table' columns={columns}
                                // dataSource={getPres}
                                expandable={{
                                    expandedRowRender: (record) => {
                                        return (
                                            <div className='px-2  py-2'>
                                                <h5 className='font-bold'>Instruction </h5>
                                                <div className='flex gap-10'>
                                                    <p>Patient name : {record.patient_name}</p>
                                                    <p>Appoinment Id : {record.appointment_id}</p>
                                                </div>
                                                <div>
                                                    <p className='bg-slate-200 p-5  rounded-lg text-black mt-2'>{record.instructions}</p>
                                                </div>

                                            </div>
                                        )
                                    },

                                    rowExpandable: (record) => record.instructions !== null,

                                }}
                                dataSource={filteredData}
                                pagination={pagination}
                                loading={isLoading}


                            ></Table>
                            <Modal

                                title={`Edit Prescription `}

                                open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ top: 20 }} maskClosable={false} okText="Edit">
                                <Form
                                    layout='vertical'
                                    form={form}
                                    className='prescription_form'
                                    name="prescriptionForm"
                                // onValuesChange={handleFormChange}
                                >
                                    <p className='text-[0.9rem] text-center my-4 font-bold text-sky-500'>
                                        {`Appointment ID: ${app_id} - Appointment Date: ${moment(Array.isArray(getPres) && getPres?.find(patient => patient?.appointment_id === app_id)?.appointment_date).format("DD/MM/YYYY")}`}


                                    </p>

                                    {/* <Form.Item
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
                                    </Form.Item> */}
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
                                            <Input placeholder='Enter Title' className='focus-within:shadow-none' />
                                        </Form.Item>

                                        <Form.Item
                                            name="patient_name"
                                            label="Patient Name [readonly]"
                                            className='mt-5'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter title !'
                                                }
                                            ]}
                                        >
                                            <Input placeholder='Enter patient ' className='focus-within:shadow-none ' readOnly />
                                        </Form.Item>

                                    </div>

                                    <div className='grid grid-cols-2 gap-5'>
                                        <Form.Item
                                            name="prescription_type"
                                            label="Type"
                                            rules={[{ required: true, message: 'Please Select Type!' }]}
                                        >
                                            <Select readOnly disabled value={(value) => {
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
                                            label="quantity"

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
                                            <Input placeholder='Enter quantity' className='focus-within:shadow-none ' />
                                        </Form.Item>
                                    </div>




                                    {
                                        formData.Type === 'sick_note' ? (<Form.Item
                                            name="instructions"
                                            label="Instruction"
                                            rules={[{ required: false, message: 'Please enter Instruction!' }]}
                                            className={`${formData.Type === 'sick_note' ? 'none' : 'block'}`}
                                        >
                                            <TextArea rows={4} placeholder='Enter any instruction' />
                                        </Form.Item>) : ""

                                    }




                                </Form>
                            </Modal>

                        </>

                    )
                }

            </Content>
        </div >
    );
}

export default Prescription;
