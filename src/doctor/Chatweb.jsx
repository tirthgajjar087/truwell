import React from 'react'
import { Col, Row, Layout } from 'antd';
import LeftMsgUserList from '../components/LeftMsgUserList';
import RightOneUsermsg from '../components/RightOneUsermsg';
import io from 'socket.io-client';


function Chatweb() {
    // const socket = io.connect("XXXXXXXXXXXXXXXXXXXXX");

    return (
        <>
            {/* box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px; */}
            <Layout>
                <Row>
                    <Col span={7} className='border-[1px]'>
                        <LeftMsgUserList />
                    </Col>
                    <Col span={17} className='border-[1px]'>
                        <RightOneUsermsg />

                    </Col>
                </Row>
            </Layout>
        </>
    )
}

export default Chatweb