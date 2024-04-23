import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select, Layout, message, Upload, Table } from 'antd';
import { Link } from 'react-router-dom';
import { TbEyeShare } from "react-icons/tb";
import moment from 'moment';
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import noDataFoundImg from "../img/no_app_available11.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { Upcompatientdet, getMedicalHistoryApi } from '../reducer/AppointmentUpCom';
const { Content } = Layout;

function UpcomingApp() {
    const { upcomingPatientDet, isLoading } = useSelector((state) => state.fetchAppointment);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [patientName, setPatientName] = useState('');
    const [app_id, setApp_id] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Upcompatientdet());
    }, [Upcompatientdet]);

    console.log("uo", upcomingPatientDet)

    const showModal = (appointment_id, patient_name) => {
        form.resetFields();
        setIsModalOpen(true);
        console.log("Your share appitnemtnet id--", appointment_id)
        setPatientName(patient_name);
        setApp_id(appointment_id);
        dispatch(getMedicalHistoryApi(appointment_id));
        // dispatch(addPrescription({ appointment_id: appointment_id }))
    };


    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        console.log('Form values after cancel:', form.getFieldsValue());
    };





    // Define pagination settings
    const pagination = {
        pageSize: 10,
        total: upcomingPatientDet?.length,
        showSizeChanger: true,
        showQuickJumper: true,
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
            render: (text) => moment(text, 'YYYY-MM-DD,HH:mm').format("HH:mm"),
            // Remove unnecessary filterDropdown and onFilter properties
        },
        {
            title: "Appointment Fee",
            dataIndex: "charges",
        },
        {
            title: "Status",
            dataIndex: "appointment_status",
            render: (text) => {
                // let backgroundColor, textColor;
                // if (text.toLowerCase() === "upcoming") {
                //     backgroundColor = "blue";
                //     textColor = "white";
                // } else if (text.toLowerCase() === "progress") {
                //     backgroundColor = "red";
                //     textColor = "white";
                // } else {
                //     backgroundColor = "inherit";
                //     textColor = "inherit";
                // }
                // return (
                //     <span style={{ backgroundColor, color: textColor, padding: '3px 6px', borderRadius: '3px' }}>
                //         {text}
                //     </span>
                // );
                return (
                    <span className={`${text === 'upcoming' ? 'bg-yellow-400' : "bg-red-500"} text-[0.8rem] text-black p-2 flex font-bold rounded-lg`}>
                        {text === 'upcoming' ? 'Upcoming' : 'Progress'}
                        <HiOutlineInboxArrowDown className='text-[1.1rem] ml-2 mt-[1.3px] text-gold-500' />
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

                        <Link to={`/medicalhistory/${record.appointment_id}`}>
                            <Button type=""
                                // onClick={() => showModal(record.appointment_id, record.first_name)}
                                className='bg-rblue mr-5 text-white text-[0.8rem] focus-within:bg-rblue font-bold px-5 py-1 flex align-center'>
                                <TbEyeShare className='text-[1.1rem] mr-2 mt-[1.3px]' />
                                <span>Medical History </span>
                            </Button>
                        </Link>
                    </div>
                );
            }
        }
    ];

    return (
        <div>
            <Content className='p-2 m-[82px_10px_0px_5px]'>
                <p className='text-[0.9rem]  mb-3 font-bold'>Upcoming Appointment</p>
                {
                    upcomingPatientDet?.length === 0 ? (<div className='bg-white shadow-myshaow mt-10 text-center p-28 rounded-md'>
                        <img src={noDataFoundImg} alt="" className='w-72 h-full m-auto' />
                        <p className='text-[1rem] font-bold'>No Upcoming Appointment Available</p>
                    </div>) : (<Table
                        rowKey={record => record.appointment_id}
                        className='p-2 ' columns={columns} dataSource={upcomingPatientDet} pagination={pagination}
                        loading={isLoading}
                    ></Table>




                    )
                }


            </Content>
        </div>
    );
}

export default UpcomingApp;
