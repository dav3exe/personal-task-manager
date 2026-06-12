import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ActivePageProvider } from './context/ActivePageContext.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
  <StrictMode>
    <BrowserRouter>
    {/* <ActivePageProvider> */}
      <App />
    {/* </ActivePageProvider> */}
    </BrowserRouter>
  </StrictMode>
  </QueryClientProvider>,
)
