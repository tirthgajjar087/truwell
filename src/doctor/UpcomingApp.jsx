import React, { useState } from 'react'
import { Button, Input, Table, TimePicker } from 'antd';
import moment from 'moment';
import { ClockCircleOutlined } from '@ant-design/icons';

function UpcomingApp() {

    const [dataSource, setDataSource] = useState([
        {
            number: 1,
            name: "Rahul",
            appId: "123553123",
            date: "10/4/2024",
            slot: "4:30 PM",
            mobile: "9823647332",
            amount: "500/-",
            status: "Upcoming",
        },
        {
            number: 2,
            name: "Tirth",
            appId: "19826324827",
            date: "12/4/2024",
            slot: "5:30 PM",
            mobile: "9283738648",
            amount: "500/-",
            status: "Upcoming",
        },
        {
            number: 3,
            name: "Hardik",
            appId: "2937647873",
            date: "10/4/2024",
            slot: "5:30 PM",
            mobile: "9827389462",
            amount: "500/-",
            status: "Upcoming",
        },
        {
            number: 4,
            name: "Bhavesh",
            appId: "19826324827",
            date: "11/4/2024",
            slot: "5:30 PM",
            mobile: "9283738248",
            amount: "500/-",
            status: "Upcoming",
        }
    ])
    const columns = [
        {
            title: "  ",
            dataIndex: 'number',
        },
        {
            title: "Appointment ID",
            dataIndex: "appId",
        },
        {
            title: "Patient Name",
            dataIndex: "name",
        },
        {
            title: "Mobile No.",
            dataIndex: "mobile",
        },

        {
            title: "Appointment Date",
            dataIndex: "date",
            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
        },
        {
            title: "Appointment Time",
            dataIndex: "slot",
            filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
                return (
                    <><Input
                        autoFocus
                        placeholder="Enter time"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            confirm({ closeDropdown: false });
                        }}
                        onPressEnter={() => {
                            confirm();
                        }}
                        onBlur={() => {
                            confirm();
                        }}

                    ></Input>
                        <Button onClick={() => {
                            confirm();
                        }}
                            type='primary'
                            style={{ backgroundColor: '#1677ff' }}
                        >Search</Button>
                        <Button onClick={() => {
                            clearFilters();
                        }}
                            style={{ backgroundColor: 'red' }}
                        >Reset</Button>
                    </>
                )
            },
            filterIcon: () => {
                return <ClockCircleOutlined />
            },
            onFilter: (value, record) => {
                return record.slot === value
            }
            // sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
        },

        {
            title: "Appointment Fee",
            dataIndex: "amount",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
    ]
    return (
        <div>
            <Table className='p-2 m-[82px_10px_0px_14px]' columns={columns} dataSource={dataSource} pagination={{ pageSize: 6 }}></Table>
        </div>
    )
}

export default UpcomingApp