import { createContext, useState } from "react";
let UserType = createContext();
const UserContext = ({ children }) => {
    const [UserId, setUserId] = useState("");
    return (
        <>
            <UserType.Provider value={{
                UserId,
                setUserId
            }}>
                {children}
            </UserType.Provider>
        </>
    )
}
export {
    UserType,
    UserContext
}
