import React from "react"
import { useAuth0 } from "../../utils/auth0/provider"

export const MainPage = () => {
    const { user } = useAuth0()
    return (
    <h1>Welcome {user.given_name}!</h1>
    )
}