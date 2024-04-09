import React, { useState } from 'react';

const withCollapseState = (WrappedComponent) => {
    return () => {
        const [collapsed, setCollapsed] = useState(false);

        return <WrappedComponent collapsed={collapsed} setCollapsed={setCollapsed} style={{ width: "100%" }} />;
    };
};

export default withCollapseState;
