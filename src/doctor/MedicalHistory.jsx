import React, { useState } from 'react'
import { Table, Layout } from 'antd';
import moment from 'moment';
const { Content } = Layout;


function MedicalHistory() {
    const [dataSource, setDataSource] = useState([
        {
            number: "1",
            name: "Rahul",
            disease: "Malaria",
            begin: "31/03/2024",
            gender: "Male",
            mobileNo: "7283648346",
        }
    ])

    const columns = [
        {
            title: " ",
            dataIndex: "number"
        },
        {
            title: "Patient Name",
            dataIndex: "name",
        },
        {
            title: "Previous Diseases",
            dataIndex: "disease",
        },
        {
            title: "Start Date",
            dataIndex: "begin",
        },
        {
            title: "Gender",
            dataIndex: "gender",
        },
        {
            title: "Mobile Number",
            dataIndex: "mobileNo",
        }
    ]
    return (
        <div>
            <Content className='p-2 m-[82px_10px_0px_5px]'>
                <p className='text-[0.9rem]  mb-3 font-bold'>Medical History</p>
                <Table className='p-2 ' columns={columns} dataSource={dataSource} pagination={{ pageSize: 6 }}></Table>
            </Content>
        </div>
    )
}

export default MedicalHistory

// columns={columns} dataSource={dataSource} pagination={{ pageSize: 6 }}