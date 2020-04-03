import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'
import { GetUserResponse } from './services/UserService/models/GetUserResponse'
import { UserService } from './services/UserService/UserService'
import { CreateUserRequest } from './services/UserService/models/CreateUserRequest'
import { useHistory } from 'react-router-dom'
import { RouteName, path } from './routing'

export interface Auth0RedirectState {
  targetUrl?: string
}

export interface Auth0User extends Omit<IdToken, '__raw'> {}

interface Auth0Context {
  user?: Auth0User
  dbUser?: GetUserResponse
  completedRegistration: boolean
  isAuthenticated: boolean
  isInitializing: boolean
  isPopupOpen: boolean
  registerUser(user: CreateUserRequest): void;
  updateProfile(user: CreateUserRequest): void;
  loginWithPopup(o?: PopupLoginOptions): Promise<void>
  handleRedirectCallback(): Promise<RedirectLoginResult>
  getIdTokenClaims(o?: getIdTokenClaimsOptions): Promise<IdToken>
  loginWithRedirect(o?: RedirectLoginOptions): Promise<void>
  getTokenSilently(o?: any): Promise<string | undefined>
  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>
  logout(o?: LogoutOptions): void
}
interface Auth0ProviderOptions {
  children: React.ReactElement
  onRedirectCallback(result: RedirectLoginResult): void
}

export const Auth0Context = React.createContext<Auth0Context | null>(null)
export const useAuth0 = () => useContext(Auth0Context)!
export const Auth0Provider = ({
  children,
  onRedirectCallback,
  history,
  ...initOptions
}: Auth0ProviderOptions & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [completedRegistration, setCompletedRegistration] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [user, setUser] = useState<Auth0User>()
  const [dbUser, setDbUser] = useState<GetUserResponse>()
  const [auth0Client, setAuth0Client] = useState<Auth0Client>()
  const userService = new UserService();

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions)
      setAuth0Client(auth0FromHook)

      if (window.location.search.includes('code=')) {
        let appState: RedirectLoginResult = {}
        try {
          ({ appState } = await auth0FromHook.handleRedirectCallback())
        }
        finally {
          onRedirectCallback(appState)
        }
      }

      const authed = await auth0FromHook.isAuthenticated()

      if (authed) {
        const userProfile = await auth0FromHook.getUser()

        setIsAuthenticated(true)
        setUser(userProfile)

        if (isAuthenticated) {
            getUser();
        }
      }

      setIsInitializing(false)
    }
    
    initAuth0()
  }, [isAuthenticated])

  const getUser = async () => {
    userService.get(await getTokenSilently()).then(dbUser => {
        setDbUser(dbUser);
        setCompletedRegistration(true);
    }).catch(() => {
        //Hasn't completed profile yet after registration
        history.push(path(RouteName.Profile))
    })
  }

  const loginWithPopup = async (options?: PopupLoginOptions) => {
    setIsPopupOpen(true)

    try {
      await auth0Client!.loginWithPopup(options)
    } catch (error) {
      console.error(error)
    } finally {
      setIsPopupOpen(false)
    }

    const userProfile = await auth0Client!.getUser()
    setUser(userProfile)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setIsInitializing(true)

    const result = await auth0Client!.handleRedirectCallback()
    const userProfile = await auth0Client!.getUser()

    setIsInitializing(false)
    setIsAuthenticated(true)
    setUser(userProfile)
    
    return result
  }

  const loginWithRedirect = (options?: RedirectLoginOptions) =>
    auth0Client!.loginWithRedirect(options)

  const getTokenSilently = (options?: GetTokenSilentlyOptions) =>
    auth0Client!.getTokenSilently(options)

  const logout = (options?: LogoutOptions) =>
    auth0Client!.logout(options)

  const getIdTokenClaims = (options?: getIdTokenClaimsOptions) =>
    auth0Client!.getIdTokenClaims(options)

  const getTokenWithPopup = (options?: GetTokenWithPopupOptions) =>
    auth0Client!.getTokenWithPopup(options)

  const registerUser = (user: CreateUserRequest) => {
      getTokenSilently().then(token => {
        userService.register(user, token);
        getUser()
      });
  }
  const updateProfile = (user: CreateUserRequest) => {
    return getTokenSilently().then(token => {
        userService.updateProfile(user, token);
        getUser()
      });
}

  return (
    <Auth0Context.Provider
      value={{
        user,
        dbUser,
        registerUser,
        updateProfile,
        isAuthenticated,
        completedRegistration,
        isInitializing,
        isPopupOpen,
        loginWithPopup,
        loginWithRedirect,
        logout,
        getTokenSilently,
        handleRedirectCallback,
        getIdTokenClaims,
        getTokenWithPopup
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};