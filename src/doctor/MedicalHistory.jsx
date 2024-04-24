import React, { useEffect, useState } from 'react';
import noDataFoundImg from "../img/no_medical_history.jpg"
import { Layout } from 'antd';
import { RiFileUserLine } from "react-icons/ri";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Upcompatientdet, getMedicalHistoryApi } from '../reducer/AppointmentUpCom';
const { Content } = Layout;


function MedicalHistory() {
    const { setMedicalHistory } = useSelector(state => state.fetchAppointment);
    const { app_id } = useParams();
    console.log("app_id", app_id)

    const dispatch = useDispatch();

    console.log("medical history page", setMedicalHistory);
    useEffect(() => {
        dispatch(getMedicalHistoryApi(app_id))
    }, []);

    return (

        <>
            <div>
                <Content className='p-2 m-[82px_10px_0px_5px]'>
                    <p className='text-[0.9rem]  mb-3 font-bold'>Medical History</p>

                    <p className='flex font-bold mb-5 text-white px-2 py-2  bg-blue-600 rounded-lg w-[fit-content]'><RiFileUserLine className='text-[1.2rem] mr-2 ' />Patient Name: {setMedicalHistory.name}</p>

                    {
                        Array.isArray(setMedicalHistory.data) && setMedicalHistory.data?.length <= 0 ? (
                            <div className='bg-white shadow-myshaow mt-5 text-center p-20 rounded-md '>
                                <img src={noDataFoundImg} alt="" className='w-[33%] h-full m-auto' />
                                <p className='text-[1rem] font-bold'>
                                    Nothing in  <span className='font-bold text-blue-500'>
                                        {setMedicalHistory.name}
                                    </span> Medical History
                                </p>
                            </div>
                        ) :
                            (
                                <div className='grid grid-cols-4 gap-4 break-all '>
                                    {


                                        setMedicalHistory.data.map((item, index) => {
                                            return (
                                                <div className='bg-white px-6 py-4 rounded-lg' key={index}>

                                                    <div>
                                                        <h5 className='text-[0.9rem] font-bold text-black'>Disease Name</h5>
                                                        <p className='mt-1 text-[0.9rem] text-gray-600'>{item.disease_name}</p>

                                                    </div>
                                                    <div className='grid grid-cols-2 gap-7 mt-5'>
                                                        <div>
                                                            <h5 className='text-[0.9rem] font-bold text-black'>Start Date</h5>
                                                            <p className='mt-2 text-[0.9rem] text-gray-600'>{item.start_date}</p>

                                                        </div>
                                                        <div>
                                                            <h5 className='text-[0.9rem] font-bold text-black'>End Date</h5>
                                                            <p className='mt-2 text-[0.9rem] text-gray-600'>{item.end_date === null ? "Till Date" : item.end_date}</p>

                                                        </div>
                                                    </div>

                                                    <div className='mt-5 '>
                                                        <h5 className='text-[0.9rem] font-bold text-black'>Status</h5>
                                                        <p className={`${item.status === 'past' ? 'bg-red-500 text-white font-bold' : 'bg-green-700 text-white font-bold'} font-bold    mt-1 w-[fit-content] px-4 py-1 rounded-lg text-[0.9rem] text-gray-600`} >
                                                            {item.status === 'past' ? 'Past' : item.status === 'active' ? "Active" : ""}</p>

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }


                                </div>
                            )
                    }


                </Content >
            </div >
        </>
    )
}

export default MedicalHistory;