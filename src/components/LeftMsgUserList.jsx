import React from 'react';
import { LiaUserEditSolid } from 'react-icons/lia';
import { IoSearchSharp } from 'react-icons/io5';
import { GoPeople } from 'react-icons/go';
import { Input, Badge, Avatar } from 'antd';
import { TiStarFullOutline } from "react-icons/ti";
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import UserList from './UserList';

function LeftMsgUserList() {
    return (
        <div className="bg-white pt-3 h-[99.5vh]">
            <div className='contents fixed  !bg-slate-500'>
                <div className="flex items-center px-5 py-[0.20rem]">
                    <div className='border-solid border-2 border-gray-300 rounded-[63px] p-1'>
                        <Avatar className="bg-gray-500 shadow-md border-1" size={57}>TG</Avatar>
                    </div>
                    <div className="ml-4">
                        <h5 className="text-[1rem] font-bold text-rblue capitalize flex items-center">
                            tirth gajjar <LiaUserEditSolid className="ml-1 text-xl" />
                        </h5>
                        <p className="text-green-700 text-[0.9rem]">
                            <span className="bg-green-700 w-3 h-3 rounded-full inline-block mr-1"></span>
                            Active Now
                        </p>
                    </div>
                </div>
                <hr className="mt-3 mb-2" />
                <div className="px-4 py-2">
                    <div className="flex justify-between items-center">
                        <h5 className="text-base font-bold mb-2 flex items-center">Messages</h5>
                        <div className="flex items-center">
                            <TiStarFullOutline className="text-lg ml-2 text-yellow-400" />
                            <GoPeople className="ml-2 text-lg" />
                        </div>
                    </div>
                    <Input
                        placeholder="Search People, Group, Message..."
                        className="w-full shadow-sm focus:shadow-none rounded-lg mt-1"
                        prefix={<IoSearchSharp />}
                    />
                </div>
                <hr className="mt-3 mb-2" />
            </div>

            <div className="flex-1 px-4  h-[66.7vh] overflow-y-scroll userList_style">
                <UserList />
            </div>
        </div>
    );
}

export default LeftMsgUserList;
