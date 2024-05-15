import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatWithPatientList, fetchNewPatientList, getOneChatlist, getOnePatientID, getOnenewPatientID } from '../reducer/chatweblist';
import AllPatient from './AllPatient';
import { IoChatbubbles } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import ChatwithPatient from './ChatwithPatient';
import ChatLoading, { PeopleSkeleton } from './ChatLoading';
import noMessageYetImg from '../img/no_message_yet.jpg'

function UserList() {

    const [activeTab, setActiveTab] = useState('1');
    const { allPatientList, chatWithPatientList, isLoading } = useSelector((state) => state.chatWebList);

    const dispatch = useDispatch();
    console.log("Your all patient list is--: ", allPatientList)


    useEffect(() => {
        console.log("check useEffet")
        // dispatch(fetchNewPatientList());
        dispatch(fetchChatWithPatientList());
    }, []);

    const handleChangeTab = (key) => {
        setActiveTab(key);
        console.log("YOur key is ", key);
        if (key === '1') {
            dispatch(fetchChatWithPatientList());
        }
        else if (key === '2') {
            dispatch(fetchNewPatientList());
        }
        else if (key === '3') {
            dispatch(fetchNewPatientList());
        }
        else if (key === '4') {
            dispatch(fetchNewPatientList());
        }
    };

    const handleChatchange = (id, patient_name, patient_id) => {
        console.log(id);
        dispatch(getOnePatientID({ id, patient_name, patient_id }))
    }

    const handkeNewchatuser = (patient_id, patient_name) => {
        console.log("Handling new chat----", patient_id, patient_name)
        dispatch(getOnePatientID({ patient_id, patient_name }))
    }

    return (
        <>
            <Tabs activeKey={activeTab} tabPosition="top" onChange={handleChangeTab} >

                <Tabs.TabPane
                    tab={
                        activeTab === '1' ? (
                            <div>
                                <IoChatbubbles className='text-[1.5rem] mx-auto  bg-blue-500 p-1 rounded-lg text-white' />
                                <p className='mt-1 !text-[0.78rem] font-semibold'>Chats</p>
                            </div>
                        ) : (
                            <div>
                                <IoChatbubblesOutline className='text-[1.3rem] mx-auto' />
                                <p className='mt-1 !text-[0.8rem] font-bold'>Chats</p>
                            </div>
                        )
                    }
                    key="1"
                >
                    {isLoading ? (
                        Array.from({ length: 10 }).map((_, index) => (
                            <ChatLoading key={index} />
                        ))
                    ) : (
                        chatWithPatientList && chatWithPatientList.length === 0 || chatWithPatientList === 'undefined' ? (
                            <div>
                                <img src={noMessageYetImg} alt="" className='w-[50%] m-auto' />
                                <h5 className='text-center text-[1.1rem] font-bold'>No Message Yet</h5>
                                <p className="text-center">Looks like you haven't initiated a conversation with any of our professionals</p>
                            </div>
                        ) :
                            (chatWithPatientList.map((user, index) => (
                                // <Button >
                                <div key={index} onClick={() => handleChatchange(user.chat_room.id, user.patient_name, user.chat_room.patient_id)} >
                                    <ChatwithPatient {...user} />
                                    {index < chatWithPatientList.length - 1 && <hr className='my-1 border-t border-gray-200 shadow-lg' />}
                                </div>
                                // </Button>
                            )))
                    )}

                </Tabs.TabPane>
                <Tabs.TabPane tab={
                    activeTab === '2' ? (
                        <div>
                            <MdMarkUnreadChatAlt className='text-[1.5rem] mx-auto  bg-blue-500 p-1 rounded-lg text-white' />
                            <p className='mt-1 !text-[0.78rem] font-semibold'>Unread</p>
                        </div>
                    ) : (
                        <div>
                            <MdOutlineMarkUnreadChatAlt className='text-[1.3rem] mx-auto' />
                            <p className='mt-1 !text-[0.8rem] font-bold'>Unread</p>
                        </div>
                    )
                } key="2">
                    {/* Render unread users */}
                </Tabs.TabPane>
                <Tabs.TabPane tab={
                    activeTab === '3' ? (
                        <div>
                            <FaStar className='text-[1.5rem] mx-auto  bg-blue-500 p-1 rounded-lg text-white' />
                            <p className='mt-1 !text-[0.78rem] font-semibold'>Favourite</p>
                        </div>
                    ) : (
                        <div>
                            <FaRegStar className='text-[1.3rem] mx-auto' />
                            <p className='mt-1 !text-[0.8rem] font-bold'>Favourite</p>
                        </div>
                    )
                } key="3">
                    {/* Render favorite users */}
                </Tabs.TabPane>

                <Tabs.TabPane tab={
                    activeTab === '4' ? (
                        <div>
                            <BsPeopleFill className='text-[1.5rem] mx-auto  bg-blue-500 p-1 rounded-lg text-white' />
                            <p className='mt-1 !text-[0.78rem] font-semibold'>Peoples</p>
                        </div>
                    ) : (
                        <div>
                            <BsPeople className='text-[1.3rem] mx-auto' />
                            <p className='mt-1 !text-[0.8rem] font-bold'>Peoples</p>
                        </div>
                    )
                } key="4">
                    {
                        isLoading ? (
                            Array.from({ length: 10 }).map((_, index) => (
                                <PeopleSkeleton key={index} />
                            ))
                        ) : (allPatientList.map((user, index) => (
                            <div key={index} onClick={() => handkeNewchatuser(user.patient_id, user.patient_name)}>
                                <AllPatient {...user} />

                                {index < allPatientList.length - 1 && <hr className='my-1 border-t border-gray-200 shadow-lg' />}

                            </div>
                        )))
                    }
                </Tabs.TabPane>
            </Tabs >
        </>
    );
}

export default UserList;
