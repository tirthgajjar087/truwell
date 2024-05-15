import React, { useEffect } from 'react';
import { Avatar, Dropdown } from 'antd';
import { AiOutlinePushpin } from 'react-icons/ai';
import { PiUserFocus } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getNewPatientList } from '../reducer/chatweblist';
import moment from 'moment';


function ChatwithPatient(user) {

    const { chat_room, message, patient_name } = user;
    console.log("Yout user is ---: ", user);
    // console.log("Chatroom", chat_room);


    // const { chatWithPatientList } = useSelector((state) => state.chatWebList)

    const items = [
        {
            label: 'Add to favorites',
            icon: <FaStar className="!text-[1.2rem]" />,
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

        // <Dropdown
        //     menu={{
        //         items,
        //     }}
        //     trigger={['contextMenu']}
        // >
        <div className='flex justify-between gap-4 items-center p-2 hover:bg-slate-100 hover:rounded-lg cursor-pointer hover:shadow  '>
            <div className='flex !gap-1'>
                <div>
                    <Avatar className='bg-gray-500 shadow-md capitalize' size={44}>{patient_name[0]}</Avatar>
                    <div className='relative left-[-11.5px] top-[17px] inline-block '>
                        <span className="bg-green-400 w-3 h-3 rounded-full inline-block shadow-md"></span>
                        {/* <span className={`status-indicator ${status}`}></span> */}
                    </div>
                </div>
                <div className='mt-[1px]'>
                    <h5 className=' !text-black font-medium text-[0.96rem] capitalize'>{patient_name}</h5>
                    <p className="user_msg_style text-sm">{message && message.content}</p>
                </div>
            </div>
            <div>

                <p className='text-[0.68rem] text-gray-500'>{chat_room && moment(chat_room.created_at).format("DD-MM-YY")}</p>
                <h5 className='bg-blue-500 text-white text-[0.68rem] px-[4px] pt-[2px] pb-[2px] mt-1 rounded-full  w-[fit-content] ml-auto'>17</h5>
            </div>
        </div>
        // {/* </Dropdown> */ }

    );
}

export default ChatwithPatient