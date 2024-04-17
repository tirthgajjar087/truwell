import React, { useEffect, useState } from 'react';
import { Button, Input, Table, Layout } from 'antd';
import moment from 'moment';
import noDataFoundImg from "../img/no_data_found1.png"
import { useDispatch, useSelector } from 'react-redux';
import { getPrescriptionApi } from '../reducer/DocPrescription';
const { Content } = Layout;

function Prescription() {
    const { getPres, isLoading } = useSelector((state) => state.myprescription);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPrescriptionApi());
    }, []);

    console.log("getpres", getPres)


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
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "prescription_type",
            dataIndex: "prescription_type",
        }, {
            title: "dosage",
            dataIndex: "dosage",
        }, {
            title: "quantity",
            dataIndex: "quantity",
        },
        {
            title: "medicine",
            dataIndex: "medicine",
        },
    ];

    return (
        <div>
            <Content className='p-2 m-[82px_10px_0px_5px]'>
                <p className='text-[0.9rem]  mb-3 font-bold'>Share Prescription </p>
                {
                    getPres && getPres?.length <= 0 ? (
                        <>
                            <div className='bg-white shadow-myshaow mt-10 text-center p-16 rounded-md'>
                                <img src={noDataFoundImg} alt="" className='w-72 h-full m-auto' />
                            </div>
                        </>) : (<Table className='p-2 ' columns={columns} dataSource={getPres} pagination={pagination}
                            loading={isLoading}
                        ></Table>)
                }

            </Content>
        </div>
    );
}

export default Prescription;
