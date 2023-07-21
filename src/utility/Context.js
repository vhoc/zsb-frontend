import React, { useState } from 'react';

const Context = React.createContext({});

export const ContextProvider = ({ children }) => {

    const [controlAdmin, setControlAdmin] = useState(
        { severity: '', text: '', control:false}
    )
    return <Context.Provider value={{
        controlAdmin, setControlAdmin,
    }}>
        {children}
    </Context.Provider>
}

export default Context