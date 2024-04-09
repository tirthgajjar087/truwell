import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUsers } from "react-icons/fa6";
import { TbCalendarUser } from "react-icons/tb";
import { FaBusinessTime } from "react-icons/fa6";
import { Layout } from 'antd';

const { Content } = Layout;

const Dashboard = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    console.log("IN Dashboard", isAuthenticated);
    return (

        <Content className='p-2 m-[82px_10px_0px_14px]'>
            <div className='grid grid-cols-3 gap-4'>
                <div className='bg-white p-4 grid grid-cols-2 gap-3  rounded-lg'>
                    <div className='my-auto'>
                        <FaUsers className='w-[30%] h-[30%] m-auto' />
                    </div>
                    <div>
                        <h5 className='text-[1rem] text-rblue font-bold'>Total Patient</h5>
                        <p className='text-[1rem] my-2'>200+</p>
                        <p className='text-[0.8rem] my-2'>Till Today</p>
                    </div>
                </div>
                <div className='bg-white p-4 grid grid-cols-2 gap-2  rounded-lg'>
                    <div className='my-auto'>
                        <TbCalendarUser className='w-[30%] h-[30%] m-auto' />
                    </div>
                    <div>
                        <h5 className='text-[1rem] text-rblue font-bold'>Today Patient</h5>
                        <p className='text-[1rem] my-2'>10</p>
                        <p className='text-[0.8rem] my-2'>08 Apr 2024</p>
                    </div>
                </div>
                <div className='bg-white p-4 grid grid-cols-2 gap-3  rounded-lg'>
                    <div className='my-auto'>
                        <FaBusinessTime className='w-[30%] h-[30%] m-auto' />
                    </div>
                    <div>
                        <h5 className='text-[1rem] text-rblue font-bold'>Today Appointment</h5>
                        <p className='text-[1rem] my-2'>200+</p>
                        <p className='text-[0.8rem] my-2'>Till Today</p>
                    </div>
                </div>

            </div>
        </Content>

    );
};

export default Dashboard;