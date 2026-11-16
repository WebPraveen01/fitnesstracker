import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Modal from 'react-modal'
import { SnackbarProvider } from 'notistack'

Modal.setAppElement('#root')
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <SnackbarProvider maxSnack={3} anchorOrigin={{vertical:'top',horizontal:'right'}}
  autoHideDuration={3000} preventDuplicate>
    <App />
  </SnackbarProvider>
  </StrictMode>,
)
