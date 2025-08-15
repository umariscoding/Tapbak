import React, { createContext, useContext, useState } from 'react'
import { initializeAuth } from '../app.js';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initializeAuth());
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}


export const useUser = () => {
    return useContext(UserContext);
}