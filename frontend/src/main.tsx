import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/App/App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MeineListe from './Pages/MeineListe/MeineListe.tsx'
import Favoriten from './Pages/Favoriten/Favoriten.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { 
    path: "/Meine-Liste",
    element: <MeineListe/>
  },
  {
    path: "/Favoriten",
    element: <Favoriten />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
