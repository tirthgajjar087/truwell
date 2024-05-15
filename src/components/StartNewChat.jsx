import React from 'react';
import StartNewChatimg from '../img/no_chat_available.png';

function StartNewChat() {
    return (
        <>
            <div className='bg-gray-100'>
                <img src={StartNewChatimg} alt="" className='mt-[20%] m-auto w-[50%] ' />
                <p className='text-center font-bold text-[1.2rem] capitalize'>Start chat with patients</p>
            </div>
        </>
    )
}

export default StartNewChat