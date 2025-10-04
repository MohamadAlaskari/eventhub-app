import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './contexts/authContext'
import { Toaster } from './components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      }
    }
  });


  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
