import React from 'react';
import { Avatar } from 'antd';

function ChatSkeleton() {
    return (
        <>
            <div className='flex justify-between gap-4 items-center p-2  cursor-pointer '>
                <div className='flex !gap-1'>
                    <div>
                        <Avatar className='bg-gray-200 shadow-md animate-pulse' size={44}></Avatar>
                        <div className='relative left-[-11.5px] top-[17px] inline-block '>
                            <span className="bg-gray-300 w-3 h-3 rounded-full inline-block shadow-md animate-pulse"></span>
                            {/* <span className={`status-indicator ${status}`}></span> */}
                        </div>
                    </div>
                    <div className='mt-[0.4rem]'>
                        <p className='!text-black font-medium text-[0.96rem] bg-gray-200 w-[120px] h-[14px] animate-pulse rounded-lg'></p>
                        <p className="user_msg_style rounded-lg text-sm bg-gray-200 w-[200px] h-[12px] animate-pulse mt-2"></p>
                    </div>
                </div>
                <div>
                    <p className='text-[0.68rem] bg-gray-200 rounded-lg  animate-pulse !w-[34px] !h-[14px]'></p>
                    <p className=' bg-gray-200 text-white text-[0.68rem] px-[4px] pt-[2px] pb-[2px] mt-1 rounded-full w-[24px] h-[14px] animate-pulse ml-auto'></p>
                </div>
            </div>
        </>
    );
}


export function PeopleSkeleton() {
    return (
        <>
            <div className='flex justify-between gap-4 items-center p-2  cursor-pointer '>
                <div className='flex !gap-1'>
                    <div>
                        <Avatar className='bg-gray-200 shadow-md' size={44}></Avatar>
                        <div className='relative left-[-11.5px] top-[17px] inline-block animate-pulse'>
                            <span className="bg-gray-300 w-3 h-3 rounded-full inline-block shadow-md"></span>
                            {/* <span className={`status-indicator ${status}`}></span> */}
                        </div>
                    </div>
                    <div className='mt-[1rem]'>
                        <p className='!text-black font-medium text-[0.96rem] bg-gray-200 w-[180px] h-[16px] animate-pulse rounded-lg'></p>

                    </div>
                </div>

            </div>
        </>
    );
}

export default ChatSkeleton;
