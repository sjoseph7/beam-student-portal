import React, { useState, useEffect, useContext } from "react"
import createAuth0Client from "@auth0/auth0-spa-js"

const AUTH0_CONFIG = {
    domain: 'beammath.us.auth0.com',
    client_id: 'q6HSnNAXqcve54js2436u95SV2lmxY7p',
    redirect_uri: window.location.protocol + '//' + window.location.host,
}

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)

export const Auth0Provider = ({
    children,
}) => {
    const [auth0Client, setAuth0] = useState()
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        initAuth0().then(console.log).catch(console.error)

        async function initAuth0() {
            const auth0FromHook = await createAuth0Client(AUTH0_CONFIG)
            setAuth0(auth0FromHook)
            
            let isAuthenticated = await auth0FromHook.isAuthenticated()
            
            if (!isAuthenticated &&
                window.location.search.includes("code=") &&
                window.location.search.includes("state=")
            ) {
                await auth0FromHook.handleRedirectCallback()
                isAuthenticated = await auth0FromHook.isAuthenticated()
            }
            
            window.history.replaceState({}, document.title, window.location.pathname)
            setIsAuthenticated(isAuthenticated)

            if (isAuthenticated) {
                const user = await auth0FromHook.getUser()
                setUser(user)
            } else {
                auth0FromHook.loginWithRedirect()
            }

            setLoading(false)
        }
    }, [])

    return (
        <Auth0Context.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                logout: (...p) => auth0Client.logout(...p)
            }}
        >
            {children}
        </Auth0Context.Provider>
    )
}
