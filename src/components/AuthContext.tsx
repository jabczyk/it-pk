import { createContext, useContext, useState, type ReactNode } from 'react'

type AuthContextValue = {
  isAuthenticated: boolean
  signIn: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider ({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const value: AuthContextValue = {
    isAuthenticated,
    signIn: () => setIsAuthenticated(true),
    signOut: () => setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
