import { createContext, useContext } from "react";

export const UserContext=createContext({
    isAuthenticated:false,
    user:{},
    Loader:false,
    setIsAuthenicated:()=>{},
    setUser:()=>{},
    setLoader:()=>{},
});
export const UserContextProvider=UserContext.Provider;
export default function useUserContext(){
    return useContext(UserContext);
}