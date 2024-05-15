import React, { useEffect, useState } from 'react';
import { Avatar, Dropdown, Tabs } from 'antd';
import { AiOutlinePushpin } from 'react-icons/ai';
import { PiUserFocus } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";


function AllPatient({ patient_name, message, timestamp, avatar, status }) {
    const items = [
        {
            label: 'Add to favorites',
            icon: <AiOutlinePushpin className="!text-[1.2rem]" />,
            key: '1',
        },
        {
            label: 'View Profile',
            icon: <PiUserFocus className="!text-[1.3rem]" />,
            key: '2',
        },
        {
            label: 'Delete conversation',
            icon: <AiOutlineDelete className="!text-[1.3rem]" />,
            key: '3',
        },
    ];

    return (
        <Dropdown
            menu={{
                items,
            }}
            trigger={['contextMenu']}
        >
            <div className='flex justify-between gap-4 items-center p-2 hover:bg-slate-100 hover:rounded-lg cursor-pointer hover:shadow'>
                <div className='flex !gap-1'>
                    <div>
                        <Avatar className='bg-gray-500 shadow-md capitalize' size={44}>{patient_name[0]}</Avatar>
                        <div className='relative left-[-11.5px] top-[17px] inline-block '>
                            <span className="bg-green-400 w-3 h-3 rounded-full inline-block shadow-md"></span>
                            {/* <span className={`status-indicator ${status}`}></span> */}
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <h5 className=' !text-black font-medium text-[0.96rem] capitalize'>{patient_name}</h5>
                        {/* <p className="user_msg_style text-sm">{message}</p> */}
                    </div>
                </div>

            </div>
        </Dropdown>
    );
}

export default AllPatient;