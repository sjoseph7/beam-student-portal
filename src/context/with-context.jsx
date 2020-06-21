import React, { useState, useEffect } from 'react'
import { useAuth0, Auth0Provider } from './auth0'
import { useProfile, ProfileProvider } from './profile'
import { messages } from '../loadingMessages.json'

export const withContext = (Component) => {
  const LoadingInterstitial = withLoadingInterstial(Component)
  return (props) => (
    <Auth0Provider>
      <ProfileProvider>
        <LoadingInterstitial {...props} />
      </ProfileProvider>
    </Auth0Provider>
  )
}

const withLoadingInterstial = (Component) => (props) => {
  // maintain consistent ordering of hook calls
  const auth0 = useAuth0()
  const profile = useProfile()

  const [randomLoadingMessage, setRandomLoadingMessage] = useState('Loading...')
  useEffect(() => {
    setRandomLoadingMessage(
      messages[Math.floor(Math.random() * messages.length)],
    )
  }, [])

  const loading = auth0.loading || profile.loading

  return loading ? <div>{randomLoadingMessage}</div> : <Component {...props} />
}
