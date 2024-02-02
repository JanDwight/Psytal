import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    userRole: {},
    setCurrentUser: () => {},
    setUserToken: () => {},
    setUserRole: () => {},
    userPermission: {},
    setUserPermission: null,
})

export const ContextProvider = ({children}) => {
    const [currentUser, _setCurrentUser] = useState(localStorage.getItem('USERNAME') || '');
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [userRole, _setUserRole] = useState(localStorage.getItem('USERROLE') || '');
    const [userPermission, setUserPermission] = useState();
    
    
    const setUserToken = (token) => {
        if (token) {
          localStorage.setItem('TOKEN', token)
        } else {
          localStorage.removeItem('TOKEN')
        }
        _setUserToken(token);
      }

      const setUserRole = (userrole) => {
        if (userrole) {
          localStorage.setItem('USERROLE', userrole)
        } else {
          localStorage.removeItem('USERROLE')
        }
        _setUserRole(userrole);
      }

      const setCurrentUser = (username) => {
        if (username) {
          localStorage.setItem('USERNAME', username)
        } else {
          localStorage.removeItem('USERNAME')
        }
        _setCurrentUser(username);
      }
    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            userPermission,
            setUserPermission,
            userRole,
            setUserRole
        }}>

        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)