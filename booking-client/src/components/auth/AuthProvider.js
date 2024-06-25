import { jwtDecode } from "jwt-decode"
import { createContext, useState } from "react"

export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => { },
    handleLogout: () => { },

})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    function handleLogin(token) {
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        localStorage.setItem("userId", decodedToken.sub)
        localStorage.setItem("userRole", decodedToken.roles)
        localStorage.setItem("token",token)
        setUser(decodedToken)
    }

    function handleLogout() {
        localStorage.removeItem("userId")
        localStorage.removeItem("userRole")
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <>
            <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}
