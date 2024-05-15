

import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import InputEmoji from 'react-input-emoji';
import { LuSendHorizonal } from "react-icons/lu";
import { Avatar, Button, Divider, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { createNewMessage, fetchOnemessageList, getOnePatientID } from '../reducer/chatweblist';
import moment from 'moment';
import io from 'socket.io-client'
import StartNewChat from './StartNewChat';
import { consumer } from '../Provider/Context';

// const socket = io.connect("http://192.168.0.115:3000/")
// const socket = new WebSocket("ws://192.168.0.115:3000/cable")


function RightOneUsermsg() {

    // const socket = new WebSocket("ws://192.168.0.115:3000/cable")




    const { messagelist, oneChatlist, onePatientID } = useSelector((state) => state.chatWebList)

    let userID = Number(localStorage.getItem('user_id'))
    console.log("Your user id is -:", typeof (userID))

    console.log("Your oneCHat list is -:", oneChatlist)

    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);
    const cable = React.useContext(consumer);
    const [text, setText] = useState('');
    const [chatChannel, setChatChannel] = useState(null);
    const [prevDate, setPrevDate] = useState(null);


    // useEffect(() => {
    //     scrollToBottom();
    //     dispatch(fetchOnemessageList());
    // }, [onePatientID]); 
    // Removed onePatientID and prevDate from dependencies

    // useEffect(() => {
    //     if (oneChatlist.length > 0) {
    //         scrollToBottom();
    //     }
    //     socket.onopen = () => {
    //         console.log('WebSocket Client Connected');
    //     };



    //     socket.onclose = () => {
    //         console.log('WebSocket Client Disconnected');
    //     };
    // }, []);

    useEffect(() => {
        dispatch(fetchOnemessageList());
    }, [onePatientID]);

    useEffect(() => {
        scrollToBottom();
        const subscription = consumer.subscriptions.create(
            { channel: 'ChatRoomChannel', chat_room_id: onePatientID.id },
            {
                received: (data) => {
                    console.log("Received data from server:", data);
                    // Handle received data from server
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [onePatientID]);


    console.log("Your PrevDate is--: ", prevDate);


    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };



    const handleSend = (a) => {
        console.log("Your send messgae app is", a)
        console.log("Your patient id is", onePatientID.patient_id)
        console.log("text dat is---:", text)
        if (text.trim() !== '') {
            const newMessage = {
                content: text,
                chat_room_id: onePatientID.id,
                sender_id: Number(localStorage.getItem('user_id')),
                receiver_id: onePatientID.patient_id,
            };
            const jsonString = JSON.stringify(newMessage);
            // socket.onopen = function () {
            //     console.log("-------- Your socket is open ------------")
            //     socket.send('speak', jsonString);
            // }

            // socket.send(
            //     {
            //         command: 'speak',
            //         data: jsonString,
            //         channel: 'ChatRoomChannel',
            //     }
            // );

            const subscription = consumer.subscriptions.subscriptions.find(sub => sub.identifier === JSON.stringify({ channel: 'ChatRoomChannel', chat_room_id: onePatientID.id }));
            if (subscription) {
                subscription.send({ data: jsonString });
                setText('');
            } else {
                console.error("Subscription not found.");
            }

            setText('');
            // socket.send(JSON.stringify(newMessage))

        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSend();
        }
    };


    return (
        <>
            {
                oneChatlist && oneChatlist.length === 0 ? (<div className='!bg-white'><StartNewChat /></div>) : (<div className='h-[99.5vh] flex flex-col'>
                    {/* Header */}
                    <div className='bg-white px-5 py-4 shadow-sm  flex items-center'>
                        {/* Avatar and Status */}
                        <div>
                            <Avatar className='bg-gray-500 shadow-md capitalize' size={44}>{onePatientID && onePatientID.patient_name[0]}</Avatar>
                            <div className='relative left-[-11.5px] top-[17px] inline-block '>
                                <span className="bg-green-400 w-3 h-3 rounded-full inline-block shadow-md"></span>
                            </div>
                        </div>
                        {/* User Info */}
                        <div >
                            <h5 className='text-black font-medium text-[0.96rem] capitalize'>{onePatientID && onePatientID.patient_name}</h5>
                            <p className="text-sm text-gray-500">Active now</p>
                        </div>
                    </div>
                    {/* WHen my date is same as previous message so dont print date all time i want print one date at a time */}

                    {/* Message List */}
                    <div className='flex-1 overflow-y-auto px-6 py-2 relative z-1'>
                        <ul>
                            {oneChatlist && oneChatlist.map((message, index) => (
                                <React.Fragment key={index}>
                                    {prevDate !== moment(message.created_at).format('LL') ? (
                                        <Divider className='text-center'>
                                            <span className='text-[0.71rem] text-gray-500'>{moment(message.created_at).format('LL')}</span>
                                        </Divider>
                                    ) : ""}
                                    <li className={`flex gap-1 my-4 ${message.sender_id && message.sender_id === userID ? 'justify-end' : 'justify-start'}`}>
                                        {message.sender_id !== userID && (
                                            <Avatar className='bg-gray-500 !text-[0.8rem] capitalize' size={37}>{onePatientID && onePatientID.patient_name}</Avatar>
                                        )}
                                        <div>
                                            <div>
                                                <div className='flex gap-2'>
                                                    <div>
                                                        <small className={`text-[0.7rem] flex ${message.sender_id && message.sender_id === userID ? 'justify-end' : 'justify-start'}`}>{moment(message.created_at).format('LT')}</small>

                                                        <div className={`bg-${message.sender_id === userID ? 'blue-500 text-white' : 'white text-black'} px-4 py-2 rounded-${message.sender_id === userID ? 'bl' : 'br'}-none shadow-md !max-w-[40rem] whitespace-pre-line break-all`}>
                                                            <p>{message.content}</p>

                                                            {/* <p>

                                                              <IoCheckmarkDoneOutline className='!text-[1rem]' />

                                                          </p> */}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        {
                                                            message.sender_id === userID && (
                                                                <Avatar className='bg-white text-blue-500 !text-[3rem] capitalize' size={22}>
                                                                    {/* <FaCircleDot className='!text-[3rem]' /> */}
                                                                    <IoCheckmarkDoneOutline className='!text-[3rem]' />

                                                                </Avatar>
                                                            )
                                                        }
                                                    </div>


                                                </div>



                                            </div>
                                        </div>
                                    </li>
                                </React.Fragment>
                            ))}
                        </ul>
                        <div ref={messagesEndRef} /> {/* Ref for scrolling to the bottom */}
                    </div>



                    {/* Input Box */}
                    <div className='bg-white p-4 flex items-center overflow-x-hidden '>

                        <InputEmoji
                            value={text}
                            onChange={setText}
                            cleanOnEnter

                            placeholder="Type a message"
                            className='flex-1 mr-2 absolute z-20 !fixed'
                            onKeyDown={handleKeyDown} // Add keydown event listener
                        />
                        {/* <Input></Input>
              <EmojiPicker /> */}
                        <Button onClick={() => { handleSend(text, oneChatlist.receiver_id) }} className='bg-blue-500 rounded-full text-white'>
                            <LuSendHorizonal className='text-[1.2rem]' />
                        </Button>
                    </div>
                </div>)
            }

        </>

    );
}

export default RightOneUsermsg;


