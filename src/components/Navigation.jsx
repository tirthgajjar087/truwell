import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';

import mainLogo from "../img/logo.png"
import collapsedLogo from "../img/collapsed.png";
import defaultUserImg from "../img/user.webp";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { LuMessageSquare } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsBuildingAdd, BsPrescription } from "react-icons/bs";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";
import withCollapseState from '../doctor/withCollapseState'
import { Layout, Menu, Button, Input, Dropdown, Space, Badge, Avatar } from 'antd';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { logoutAPi } from '../reducer/AuthDoctor';
import { getDocDetails } from '../reducer/EditProfile';
const { Header, Sider } = Layout;


const Navigation = () => {
    const { docDetails } = useSelector((state) => state.DocEditProfile)
    const [collapsed, setCollapsed] = useState(false);
    const [activeKey, setActiveKey] = useState('1');

    const dispatch = useDispatch();
    const id = localStorage.getItem('user_id');

    useEffect(() => {
        dispatch(getDocDetails(id));
        const storedActiveKey = localStorage.getItem('activeKey');
        if (storedActiveKey) {
            setActiveKey(storedActiveKey);
        }
    }, [dispatch, id]);

    const handleMenuClick = ({ key }) => {
        setActiveKey(key);
        localStorage.setItem('activeKey', key);
    };

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    trigger={null}
                    className='fixed '
                    collapsible
                    collapsed={collapsed}
                    style={{ overflowY: 'auto', overflowX: 'hidden', position: 'fixed', left: 0, height: '100vh', backgroundColor: "white", transition: '0.1s all ease-out' }}
                >
                    <div className="">
                        <Link to="/">
                            {collapsed ? (<img src={collapsedLogo} alt="FavIcon" className=' w-[5rem] m-[20px_auto_27px_auto]' />) : (<img src={mainLogo} alt="logo" className=' w-32 m-[20px_auto_27px_auto]' />)}
                        </Link>
                    </div>
                    <Menu
                        mode="inline"
                        selectedKeys={[activeKey]}
                        className='nav_menu'
                        style={{ overflowY: "auto", height: "70%", border: "none" }}
                        onClick={handleMenuClick} // Handle menu click event
                        items={[
                            {
                                key: '1',
                                icon: <MdOutlineDashboard style={{ fontSize: 22 }} />,
                                label: (<Link to="/">Dashboard</Link>),
                            },
                            {
                                key: '2',
                                icon: <BsBuildingAdd style={{ fontSize: 20 }} />,
                                label: (<Link to={`/rota/${id}`}>Rota</Link>),
                                onClick: () => { }
                            },
                            {
                                key: '3',
                                icon: <LiaBusinessTimeSolid style={{ fontSize: 22 }} />,
                                label: (<Link>Appointment</Link>),
                                children: [
                                    {
                                        key: '3-1',
                                        label: (<Link to="/upcomingapp">Upcoming Appointment</Link>),
                                        onClick: () => { }
                                    },
                                    {
                                        key: '3-2',
                                        label: (<Link to="/completedapp">Completed Appointment</Link>),
                                        onClick: () => { }
                                    },
                                ]
                            },
                            {

                                key: '4',
                                icon: <BsPrescription style={{ fontSize: 22 }} />,
                                label: (<Link to="/prescription">Prescription</Link>),

                            },
                            {
                                key: '5',
                                icon: <UserOutlined style={{ fontSize: 22 }} />,
                                label: (<Link to={`/doctorprofile/${id}`}>Profile</Link>),
                            },
                        ]}
                    />
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
                    <Header
                        className='shadow-header bg-white fixed grid grid-cols-[1fr_auto]'
                        style={{
                            zIndex: "1",
                            width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)',
                        }}
                    >
                        <div>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                }}
                            />
                            <Input placeholder='Search Here' className='w-[30%] focus-within:shadow-none' prefix={<IoSearchSharp />} />
                        </div>
                        <div className='mr-3 flex gap-7 justify-center items-center'>

                            <div style={{ transform: "translate(0px, 10px)" }}>
                                <Link to='/chatweb'>
                                    <Badge count={17} color='blue' className='hover:text-blue-500' >
                                        <LuMessageSquare className='text-[1.5rem] ' />
                                        {/* <Avatar shape="square" size="large" /> */}
                                    </Badge>
                                </Link>
                            </div>

                            <div>

                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                icon: <UserOutlined style={{ fontSize: 22 }} />,
                                                label: (
                                                    <Link to={`/doctorprofile/${id}`}>
                                                        Profile
                                                    </Link>
                                                ),
                                                key: '0',
                                            },
                                            {
                                                type: 'divider',
                                            },
                                            {
                                                icon: <IoMdLogOut style={{ fontSize: 22 }} />,
                                                label: (
                                                    <Link to="/"
                                                        onClick={() => {
                                                            dispatch(logoutAPi())
                                                        }}
                                                    >
                                                        Logout
                                                    </Link>
                                                ),
                                                key: '1',
                                            },
                                        ]
                                    }}
                                >
                                    <Link>
                                        <Space>

                                            <Avatar className='bg-gray-500 shadow-md !text-[0.85rem] !uppercase' size={40}>{docDetails?.user?.first_name[0]}{docDetails?.user?.last_name[0]}</Avatar>
                                            {/* <img src={defaultUserImg} alt="" className='max-w-10 ' /> */}
                                            <p className='min-w-12 capitalize overflow-hidden text-ellipsis'>Dr.{docDetails?.user?.first_name} {docDetails?.user?.last_name}</p>
                                            <RiArrowDropDownLine className='text-2xl' />
                                        </Space>
                                    </Link>
                                </Dropdown>
                            </div>

                        </div>
                    </Header>
                    <Outlet />
                </Layout>
            </Layout>
        </>
    );
};
export default withCollapseState(Navigation);




