import * as React from "react"
import { useAuth0, Auth0Provider } from './provider'
import { useProfile, ProfileProvider } from "../profile"

export const withAuthentication = Component => {
    const LoadingInterstitial = withLoadingInterstial(Component)
    return props => (
        <Auth0Provider>
            <ProfileProvider>
                <LoadingInterstitial {...props} />
            </ProfileProvider>
        </Auth0Provider>
    )
}

const withLoadingInterstial = Component => props => (
    (useAuth0().loading && useProfile().loading) ? <Loading /> : <Component {...props} />
) 
    
const Loading = () => (
    <>
        <span>Loading...</span>
    </>
)
