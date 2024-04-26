import { Button } from 'antd'
import React from 'react'

function Skeleton() {
    return (
        <>
            <Button className='bg-gray-100 rounded-lg px-2 py-2 animate-pulse'> </Button>
        </>
    )
}

export default Skeleton