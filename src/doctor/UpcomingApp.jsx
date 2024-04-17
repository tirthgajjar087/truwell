import React, { useEffect, useState } from 'react';
import { Button, Input, Table, Layout } from 'antd';
import moment from 'moment';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Upcompatientdet } from '../reducer/AppointmentUpCom';

const { Content } = Layout;

function UpcomingApp() {
    const { upcomingPatientDet, isLoading } = useSelector((state) => state.fetchAppointment);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Upcompatientdet());
    }, [dispatch]);

    console.log("uo", upcomingPatientDet)

    // Define pagination settings
    const pagination = {
        pageSize: 10, // Number of items per page
        total: upcomingPatientDet?.length, // Total number of items
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
            title: "Appointment Fee",
            dataIndex: "charges",
        },
        {
            title: "Status",
            dataIndex: "appointment_status",
            render: (text) => {
                let backgroundColor, textColor;
                if (text.toLowerCase() === "upcoming") {
                    backgroundColor = "blue";
                    textColor = "white";
                } else if (text.toLowerCase() === "progress") {
                    backgroundColor = "red";
                    textColor = "white";
                } else {
                    backgroundColor = "inherit";
                    textColor = "inherit";
                }
                return (
                    <span style={{ backgroundColor, color: textColor, padding: '3px 6px', borderRadius: '3px' }}>
                        {text}
                    </span>
                );
            },
        },
    ];

    return (
        <div>
            <Content className='p-2 m-[82px_10px_0px_5px]'>

                <p className='text-[0.9rem]  mb-3 font-bold'>Upcoming Appointment</p>


                <Table className='p-2 ' columns={columns} dataSource={upcomingPatientDet} pagination={pagination}
                    loading={isLoading}
                ></Table>

            </Content>
        </div>
    );
}

export default UpcomingApp;
