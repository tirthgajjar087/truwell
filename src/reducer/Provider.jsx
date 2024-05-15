import React from 'react';
import ActionCable from 'actioncable';

export const CableContext = React.createContext();

export const CableProvider = ({ children }) => {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    return (
        <CableContext.Provider value={cable}>
            {children}
        </CableContext.Provider>
    );
};
export const useCable = () => React.useContext(CableContext);

// export { CableContext };