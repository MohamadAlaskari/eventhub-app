import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './contexts/authContext'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
