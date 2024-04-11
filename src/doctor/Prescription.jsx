import React, { useState } from 'react';
import noDataFoundImg from "../img/no_data_found1.png"
import { Button, Modal, Form, Input, Select, Layout, message, Upload, Table } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
const { Dragger } = Upload;
const { Content } = Layout;
const { Option } = Select


function Prescription() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const initialValues = {
        file: {},
        title: '',
        type: '',
        duration: '',
        instruction: '',
        date: new Date().toLocaleDateString(),
        patientName: []
    }
    const [formData, setFormData] = useState(initialValues);

    const [dataTable, setDataTable] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5)


    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
            render: (pname) => {
                return (
                    <div className='max-w-48'>
                        <p>{pname.join(' , ')}</p>
                    </div>
                )
            }

        },
        {
            title: "Date",
            dataIndex: 'date',
            key: 'date'
        }
    ];

    const showModal = () => {
        setIsModalOpen(true);
        setFormData(initialValues);
        form.resetFields();
    };

    const handleOk = () => {

        form
            .validateFields()
            .then(values => {
                console.log('Received values:', values);
                setFormData(values)
                setDataTable([...dataTable, values]);

                setIsModalOpen(false);
                setFormData(initialValues);
                form.resetFields();

                // console.log('Form values after reset:', form.getFieldsValue());
            })
            .catch(errorInfo => {
                console.log('Validation failed:', errorInfo);
            })

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFormData(initialValues);
        form.resetFields();
        console.log('Form values after cancel:', form.getFieldsValue());
    };

    const handleFormChange = (changedValues, allValues) => {
        setFormData(allValues);
        // console.log(changedValues);
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
                setFormData((...prevState) => {
                    return {
                        ...prevState,
                        [formData.file.uid]: info.fileList
                    }
                })
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

    return (
        <>
            <Content className='p-2 m-[82px_10px_0px_14px]'>
                <div className='bg-white py-5 flex justify-end rounded-md'>
                    <Button type="" onClick={showModal} className='bg-rblue mr-5 text-white text-[0.8rem] focus-within:bg-rblue font-bold px-5 py-1 flex align-center'>
                        <span> Share Prescription</span>
                    </Button>
                    <Modal title="Share Prescription" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ top: 20 }} maskClosable={false} okText="Submit">
                        <Form
                            layout='vertical'
                            form={form}
                            className='prescription_form'
                            name="prescriptionForm"
                            initialValues={formData}
                            onValuesChange={handleFormChange}

                        // encType='multipart/form-data'
                        // form={form}
                        >

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
                                        {/* 
                                        Strictly prohibited from uploading company data or other
                                    banned files. */}
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

                            </div>

                            <div>
                                <Form.Item
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

                                </Form.Item>
                            </div>

                            <div className='flex justify-between'>
                                <Form.Item
                                    name="type"
                                    label="Type"
                                    rules={[{ required: true, message: 'Please Select Type!' }]}
                                >
                                    <Select onChange={(value) => {
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            Type: value,
                                        }))
                                    }} style={{ width: "14.5rem" }}>
                                        <Option value="Prescription">Prescription</Option>
                                        <Option value="Sick_note">Sick Note</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="duration"
                                    label="Duration "
                                    rules={[{ required: true, message: 'Please enter Duration !' }]}
                                >
                                    <Input className='w-56' />

                                </Form.Item>

                            </div>




                            {formData.type === 'Sick_note' ? (
                                <Form.Item
                                    name="instruction"
                                    label="Instruction"
                                    rules={[{ required: false, message: 'Please enter Instruction!' }]}
                                >
                                    {/* <Input /> */}
                                    <TextArea rows={4} />
                                </Form.Item>
                            ) : ""}

                            {/* <Form.Item name='date'></Form.Item> */}


                            {/* <Form.Item
                                name="frequency"
                                label="Frequency"
                                rules={[{ required: true, message: 'Please enter frequency!' }]}
                            >
                                <Input />
                            </Form.Item> */}
                        </Form>
                    </Modal>
                </div>

                {
                    dataTable.length <= 0 ? (
                        <>
                            <div className='bg-white shadow-myshaow mt-10 text-center p-16 rounded-md'>
                                <img src={noDataFoundImg} alt="" className='w-72 h-full m-auto' />
                            </div>
                        </>
                    ) : (
                        <Table

                            columns={columns}
                            dataSource={dataTable}
                            className='mt-10'
                            expandable={{
                                expandedRowRender: (record) => (
                                    <div className='p-2'>
                                        <h5 className='text-black text-sm text-start'>Instruction:</h5>
                                        <p className='text-black text-sm mt-2'>{record.instruction}</p>

                                    </div>
                                ),
                                rowExpandable: (record) => record.Instruction === '' ? (<p>No Instruction</p>) : record.instruction
                            }}

                            pagination={{
                                currentpage: page,
                                pageSize: pageSize,
                                hideOnSinglePage: true,
                                // total: 100,
                                onChange: (page, pageSize) => { setPage(page); setPageSize(pageSize) },
                                showSizeChanger: true,
                                showTotal: (total, range) => `Total ${range[0]}-${range[1]} of ${total} Records`,

                                // onChange: (page, pageSize) => {console.log(page); setPage(page) },
                                // showTotal: () => `Total ${total}`
                            }}
                        />)
                }

            </Content >

        </>
    )
}
export default Prescription;