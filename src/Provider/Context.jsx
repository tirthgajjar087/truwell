// import React from 'react';
// import actionCable from 'actioncable'
// import { createConsumer } from '@rails/actioncable';

// const CableContext = React.createContext();
// const URL = 'ws://192.168.0.115:3000/cable';
// export const consumer = createConsumer(URL);

// function CableProvider({ children }) {
//     const cable = actionCable.createConsumer('http://192.168.0.115:3000/cable');
//     return (
//         <CableContext.Provider value={cable}>
//             {children}
//         </CableContext.Provider>
//     );
// };
// export const useCable = () => React.useContext(CableContext);

// export { CableContext, CableProvider };


import React from 'react';
import { createConsumer } from '@rails/actioncable';

//npm install @rails/actioncable

const CableContext = React.createContext();
const URL = 'ws://192.168.0.115:3000/cable';
// const URL = 'ws://192.168.0.115:3000/cable';

const consumer = createConsumer(URL);

function CableProvider({ children }) {
    return (
        <CableContext.Provider value={consumer}>
            {children}
        </CableContext.Provider>
    );
}
 
export { CableContext, CableProvider, consumer };


