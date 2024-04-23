import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
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
                    <div className='grid grid-cols-6 mb-4'>
                        <div className='px-2 py-2  bg-blue-600 rounded-lg'>
                            {
                                <p className='font-bold text-white'>Patient Name: {setMedicalHistory.name}</p>
                            }
                        </div>

                    </div>
                    <div className='grid grid-cols-4 gap-4 break-all '>
                        {

                            Array.isArray(setMedicalHistory.data) && setMedicalHistory.data?.length <= 0 ? (<p>No data found</p>) :
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
                                                    <p className='mt-2 text-[0.9rem] text-gray-600'>{item.end_date}</p>

                                                </div>
                                            </div>

                                            <div className='mt-5 w-[60px]'>
                                                <h5 className='text-[0.9rem] font-bold text-black'>Status</h5>
                                                <p className='mt-1 px-2 py-1 rounded-lg text-[0.9rem] text-gray-600' style={{ backgroundColor: item.status === 'past' ? "red" : "green", color: "white", fontWeight: 600 }}>{item.status}</p>

                                            </div>
                                        </div>
                                    )
                                })
                        }


                    </div>

                </Content >
            </div >
        </>
    )
}

export default MedicalHistory;