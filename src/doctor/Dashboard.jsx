import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import defaultUserImg from "../img/user.webp";
import { useSelector } from 'react-redux';
import { FiUsers } from "react-icons/fi";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { TbCalendarUser } from "react-icons/tb";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { Layout } from 'antd';
const { Content } = Layout;

const Dashboard = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    console.log("IN Dashboard", isAuthenticated);
    const chartRef = useRef(null);
    const pieChartRef = useRef(null);

    useEffect(() => {
        const monthlyAppointmentsData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Monthly Appointments',
                data: [20, 30, 25, 40, 35, 50, 45, 60, 55, 70, 65, 80],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };

        const chartOptions = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        // Get the context of the canvas
        const ctx = chartRef.current.getContext('2d');


        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        // Create the new chart
        chartRef.current.chart = new Chart(ctx, {
            type: 'bar',
            data: monthlyAppointmentsData,
            options: chartOptions
        });
    }, []);




    //she is also in 
    useEffect(() => {
        const genderData = {
            labels: ['Male', 'Female', 'Other'],
            datasets: [{
                label: 'Gender Distribution',
                data: [45, 35, 20],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                hoverOffset: 4
            }]
        };

        // Get the context of the canvas
        const ctx = pieChartRef.current.getContext('2d');

        // Check if there's already a chart instance
        if (pieChartRef.current.chart) {
            pieChartRef.current.chart.destroy();
        }

        // Create the new chart
        pieChartRef.current.chart = new Chart(ctx, {
            type: 'pie',
            data: genderData,
        });

    }, []);



    return (
        <>
            <Content className='p-2 m-[82px_10px_0px_14px]'>
                <p className='text-[0.9rem] mb-3 font-bold'>Dashboard</p>
                <div className='grid grid-cols-4 gap-4'>
                    <div className='bg-white p-4 grid grid-cols-2 gap-3  rounded-lg'>
                        <div className='my-auto'>
                            <FiUsers className='w-[30%] h-[30%] m-auto' />
                        </div>
                        <div>
                            <h5 className='text-[1rem] text-rblue font-bold'>Total Patient</h5>
                            <p className='text-[1rem] my-2'>23</p>
                            <p className='text-[0.8rem] my-2'>Till Today</p>
                        </div>
                    </div>
                    <div className='bg-white p-4 grid grid-cols-2 gap-2  rounded-lg'>
                        <div className='my-auto'>
                            <TbCalendarUser className='w-[30%] h-[30%] m-auto' />
                        </div>
                        <div>
                            <h5 className='text-[1rem] text-rblue font-bold'>Today Patient</h5>
                            <p className='text-[1rem] my-2'>12</p>
                            <p className='text-[0.8rem] my-2'>08 Apr 2024</p>
                        </div>
                    </div>
                    <div className='bg-white p-4 grid grid-cols-2 gap-3  rounded-lg'>
                        <div className='my-auto'>
                            <LiaBusinessTimeSolid className='w-[30%] h-[30%] m-auto' />
                        </div>
                        <div>
                            <h5 className='text-[1rem] text-rblue font-bold'>Today Rota</h5>
                            <p className='text-[1rem] my-2'>37</p>
                            <p className='text-[0.8rem] my-2'>Till Today</p>
                        </div>
                    </div>

                    <div className='bg-white p-4 grid grid-cols-2 gap-3  rounded-lg'>
                        <div className='my-auto'>
                            <LiaNotesMedicalSolid className='w-[30%] h-[30%] m-auto' />
                        </div>
                        <div>
                            <h5 className='text-[1rem] text-rblue font-bold'>Med History</h5>
                            <p className='text-[1rem] my-2'>4</p>
                            <p className='text-[0.8rem] my-2'>Till Today</p>
                        </div>
                    </div>

                </div>

                <div className='grid grid-cols-3 gap-4 mt-3'>
                    <div className='bg-white p-4 rounded-lg '>
                        <h5 className='text-[1rem] text-rblue font-bold'>Monthly Appointments</h5>
                        <canvas ref={chartRef} width={400} height={400}></canvas>
                    </div>
                    <div className='bg-white p-4 rounded-lg h-[100%] '>
                        <h5 className='text-[1rem] text-rblue font-bold mb-5'>Gender Distribution</h5>
                        <canvas ref={pieChartRef} width={10} height={100} style={{ marginLeft: "20px", height: "200px" }}></canvas>
                    </div>
                    <div className='bg-white p-4 rounded-lg'>
                        <h5 className='text-[1rem] text-rblue font-bold'>Upcoming Appointment</h5>
                        <div className='overflow-y-auto mt-4 h-[350px] pr-3'>
                            <Link to="/upcomingapp">
                                <p className='text-right'>View More</p>
                            </Link>
                            <div className='flex justify-cente align-center gap-4 bg-gray-100 rounded-lg py-3 px-3 mt-3'>
                                <img src={defaultUserImg} alt="" className='w-10' />
                                <p className='w-[100px] font-bold mt-2'>Tirth gajjar</p>
                                <p className='font-bold mt-2'>20/04/2024</p>
                                <p className='font-bold mt-2'>17:00</p>
                            </div>
                            <div className='flex justify-cente align-center gap-4 bg-gray-100 rounded-lg py-3 px-3 mt-3'>
                                <img src={defaultUserImg} alt="" className='w-10' />
                                <p className='w-[100px] font-bold mt-2'>Nivedita Hule</p>
                                <p className='font-bold mt-2'>22/04/2024</p>
                                <p className='font-bold mt-2'>03:00</p>
                            </div>
                            <div className='flex justify-cente align-center gap-4 bg-gray-100 rounded-lg py-3 px-3 mt-3'>
                                <img src={defaultUserImg} alt="" className='w-10' />
                                <p className='w-[100px] font-bold mt-2'>Hardik Desai</p>
                                <p className='font-bold mt-2'>24/04/2024</p>
                                <p className='font-bold mt-2'>11:30</p>
                            </div> <div className='flex justify-cente align-center gap-4 bg-gray-100 rounded-lg py-3 px-3 mt-3'>
                                <img src={defaultUserImg} alt="" className='w-10' />
                                <p className='w-[100px] font-bold mt-2'>Bhavesh</p>
                                <p className='font-bold mt-2'>01/05/2024</p>
                                <p className='font-bold mt-2'>01:00</p>
                            </div> <div className='flex justify-cente align-center gap-4 bg-gray-100 rounded-lg py-3 px-3 mt-3'>
                                <img src={defaultUserImg} alt="" className='w-10' />
                                <p className='w-[100px] font-bold mt-2'>Tirth gajjar</p>
                                <p className='font-bold mt-2'>03/05/2024</p>
                                <p className='font-bold mt-2'>22:00</p>
                            </div> <div className='flex justify-cente align-center gap-4 bg-gray-100 rounded-lg py-3 px-3 mt-3'>
                                <img src={defaultUserImg} alt="" className='w-10' />
                                <p className='w-[100px] font-bold mt-2'>Tirth gajjar</p>
                                <p className='font-bold mt-2'>03/05/2024</p>
                                <p className='font-bold mt-2'>01:00</p>
                            </div> <div className='flex justify-cente align-center gap-4 bg-gray-100 rounded-lg py-3 px-3 mt-3'>
                                <img src={defaultUserImg} alt="" className='w-10' />
                                <p className='w-[100px] font-bold mt-2'>Tirth gajjar</p>
                                <p className='font-bold mt-2'>04/05/2024</p>
                                <p className='font-bold mt-2'>09:00</p>
                            </div> <div className='flex justify-cente align-center gap-4 bg-gray-100 rounded-lg py-3 px-3 mt-3'>
                                <img src={defaultUserImg} alt="" className='w-10' />
                                <p className='w-[100px] font-bold mt-2'>Tirth gajjar</p>
                                <p className='font-bold mt-2'>20/04/2024</p>
                                <p className='font-bold mt-2'>14:00</p>
                            </div>
                        </div>

                    </div>
                </div>

            </Content>

        </>
    );
};

export default Dashboard;