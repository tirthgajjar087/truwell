import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { IoMdLogOut } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsBuildingAdd, BsPrescription } from "react-icons/bs";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";
import withCollapseState from './withCollapseState'
import { Layout, Menu, Button, Input, Dropdown, Space } from 'antd';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { logoutAPi } from '../reducer/AuthDoctor';
const { Header, Sider } = Layout;


const Navigation = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();

    const id = localStorage.getItem('user_id');
    console.log("Getting id is ", id)


    return (
        <>

            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    trigger={null}
                    className='fixed '
                    collapsible
                    collapsed={collapsed}
                    style={{ overflowY: 'auto', overflowX: 'hidden', position: 'fixed', left: 0, height: '100vh', backgroundColor: "white", transition: '0.3s all ease-out' }}
                >


                    <div className="">
                        <Link to="/home">
                            {collapsed ? (<img src="img/collapsed.png" alt="FavIcon" className=' w-[5rem] m-[20px_auto_27px_auto]' />) : (<img src="img/logo.png" alt="logo" className=' w-32 m-[20px_auto_27px_auto]' />)}

                        </Link>
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        className='nav_menu'
                        style={{ overflowY: "auto", height: "70%", border: "none" }}
                        items={[

                            {
                                key: '1',
                                icon: <MdOutlineDashboard style={{ fontSize: 22 }} />,
                                label: (<Link to="/">Dashboard</Link>),
                            },
                            {
                                key: '2',
                                icon: <BsBuildingAdd style={{ fontSize: 20 }} />,
                                label: (<Link to="/rota">Rota</Link>),
                                onClick: () => { }
                            },

                            {
                                key: '3',
                                icon: <LiaBusinessTimeSolid style={{ fontSize: 22 }} />,
                                label: (<Link to="/">Appointment</Link>),
                                children: [
                                    {
                                        key: '3-1',
                                        label: (<Link to="/">Upcoming Appointment</Link>),
                                        onClick: () => { }
                                    },
                                    {
                                        key: '3-2',
                                        label: (<Link to="/">Completed Appointment</Link>),
                                        onClick: () => { }
                                    },
                                    // Add more submenu items as needed
                                ]
                            },
                            {
                                key: '4',
                                icon: <BsPrescription style={{ fontSize: 22 }} />,
                                label: (<Link to="/">Prescription</Link>),
                                children: [
                                    {
                                        key: '4-1',
                                        label: (<Link to="/prescription">Prescription</Link>),
                                        onClick: () => { }
                                    },

                                    {
                                        key: '4-3',
                                        label: (<Link to="/">Medical History</Link>),
                                        onClick: () => { }
                                    },

                                ]
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



                        <div className='mr-3'>
                            <Dropdown
                                menu={{
                                    items:

                                        [
                                            {
                                                icon: <UserOutlined style={{ fontSize: 22 }} />,
                                                label: (
                                                    <Link to="/doctorprofile">
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
                                }
                                }
                            >


                                <Link >
                                    <Space>
                                        <img src="img/user.webp" alt="" className='max-w-10 ' />
                                        <p className='min-w-12 capitalize overflow-hidden text-ellipsis'>tirth gajjar</p>
                                        <RiArrowDropDownLine className='text-2xl' />
                                    </Space>
                                </Link>
                            </Dropdown>

                        </div>
                    </Header>
                    <Outlet />
                </Layout>
            </Layout>
        </>
    );
};
export default withCollapseState(Navigation); 