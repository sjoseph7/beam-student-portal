import * as React from "react"
import { useAuth0, Auth0Provider } from './provider'

export const withAuthentication = Component => {
    const LoadingInterstial = withLoadingInterstial(Component)
    return props => (
        <Auth0Provider>
            <LoadingInterstial {...props} />
        </Auth0Provider>
    )
}

const withLoadingInterstial = Component => props => (
    useAuth0().loading ? <Loading /> : <Component {...props} />
) 

const Loading = () => (
    <>
        <span>Loading...</span>
    </>
)
