import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App'
import './index.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer autoClose={1500} />
    <RouterProvider router={router} />
  </React.StrictMode>
)
